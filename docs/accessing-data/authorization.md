# Authorization
Dozer ensures secure access to your data APIs with an efficient authorization layer. It leverages [JSON Web Tokens (JWT)](https://jwt.io/introduction) for this purpose — a widely-accepted method for secure communication of claims. The standard format for sending the JWT token in requests is the [Bearer Token](https://swagger.io/docs/specification/authentication/bearer-authentication/):

```bash
Authorization: Bearer <token>
```

Follow this guide to protect your application against unauthorized access.

## Master-Level Authorization

### Configuration
To enable JWT-based master-level authorization, include this in your Dozer configuration:

```yaml
api:
  api_security:
    !Jwt
```

### Generating Master Token
Use this command to generate the master token:

```bash
dozer security generate-token
```

After generating the token, store it as an environment variable named `MASTER_TOKEN`:

```bash
export MASTER_TOKEN=<your_token_here>
```

### Using a Token
Send requests with the Authorization header containing the token:

```bash
curl --request GET --header 'Authorization: Bearer $MASTER_TOKEN' 'localhost:8080/trips'
```

On successful authorization, the Dozer API terminal displays:

```
INFO 127.0.0.1 "GET /trips HTTP/1.1" 200 24000 "-" "curl/7.81.0" 0.000458    
```

> __Reminder__: Protect your `MASTER_TOKEN`. Avoid exposing it in public repositories or version control systems.


### Generating User Token

To generate a user token, you have two choices based on your desired access scope:

#### All Access
If you desire a user token with unrestricted access to all data in every store, use the value `"All"`.

#### Custom Access
Use the "Custom" structure to define specific access permissions. The structure follows this format:

```json
{
  "Custom": {
    "store_name1": {"$filter": { filter_expression1 }},
    "store_name2": {"$filter": { filter_expression2 }},
    ...
  }
}
```
- Replace `store_name` with the name of the store you want to apply the filter to.
- Use `filter_expression` to specify the filter. This should be in the [Dozer query format](query-format).

You can define multiple stores and their respective filters within the same token. When a client uses this user token for making a request, their access will be restricted based on the provided `filter_expression`. The system enforces this constraint, ensuring that data retrieval is limited to the scope defined by the filter.

Here's how you can send a request to generate a user token with custom access:

```bash
curl --location 'http://localhost:8080/auth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <MASTER_TOKEN>' \
--data '{"Custom":{"trip":{"$filter":{ "DOLocationID": 240}}}}'
```

On successful generation, the API will return:

```json
{"token":"<NEW_TOKEN>"}
```

Use this token in subsequent requests to access data. The system will apply the associated constraints automatically.