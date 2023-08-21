# Authorization
Dozer ensures secure access to data APIs through an efficient authorization layer, primarily leveraging [JSON Web Tokens (JWT)](https://jwt.io/introduction) — a standard method for the secure transfer of claims. The standard mode of transmitting the JWT token in requests is via the [Bearer Token](https://swagger.io/docs/specification/authentication/bearer-authentication/):

```bash
Authorization: Bearer <token>
```

Two main token types are utilized:

- **Master Token**: A high-privilege token typically used for administrative tasks, system setup, and user token generation.
  
- **User Token**: Issued for end-users or services, its access can range from full to limited based on defined scopes and filters.

## Master-Level Authorization

### Configuration
To enable JWT-based master-level authorization, the following segment should be included in the Dozer configuration:

```yaml
api:
  api_security:
    !Jwt
      <token_secret>
```
where `<token_secret>` is a user-defined secret to implement security.

### Generating Master Token
This command generates the master token:

```bash
dozer security generate-token
```

### Using the Token
Requests should be sent with the Authorization header containing the token:

```bash
curl --request GET --header 'Authorization: Bearer <master_token>' 'localhost:8080/trips'
```
where `<master_token>` is the previously generated master token.

::::tip
It's essential to ensure the security of the master token, refraining from exposing it in public repositories or version control systems.
::::

### Generating User Token

For user token generation, there are two options based on the desired access scope:

#### All Access
For a user token that provides unrestricted access to all data across stores, the value `"All"` is used.

#### Custom Access
The "Custom" structure is used to delineate specific access permissions. The format is:

```json
{
  "Custom": {
    "store_name1": {"$filter": { filter_expression1 }},
    "store_name2": {"$filter": { filter_expression2 }},
    ...
  }
}
```

- `store_name` represents the specific store for which the filter is intended.
- `filter_expression` denotes the filter in the [Dozer query format](query-format).

Multiple stores and their respective filters can be defined within a single token. When clients utilize this user token for requests, access is constrained based on the `filter_expression`, ensuring the system enforces this constraint.

To generate a user token with custom access, this request can be made:

```bash
curl --location 'http://localhost:8080/auth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <master_token>' \
--data '{"Custom":{"trip":{"$filter":{ "DOLocationID": 240}}}}'
```

On successful generation, the API will respond with:

```json
{"token":"<user_token>"}
```

This token can then be used in subsequent requests to retrieve data, with the system automatically applying associated constraints.