# Authorization

## Introduction
Dozer offers the possibility to add an authorization layer to your data APIs in an efficient way. 
One of the ways Dozer provides authorization is through the use of [JSON Web Tokens (JWT)](https://jwt.io/introduction). JWT is a widely used industry-standard method for representing claims securely between two parties. Also, it uses the [Bearer Token](https://swagger.io/docs/specification/authentication/bearer-authentication/), which has the format in the header:

```bash
Authorization: Bearer <token>
```

Let's follow the step-by-step guide, and add safeguards to your application from unauthorized access, ensuring data integrity and user trust.

## Master-Level Authorization

To Generate and export a master token for authentication, first, make sure you add following part in the dozer configuration file.
```yaml
api:
  api_security:
    !Jwt
```

And run following command to get the token.
```bash
dozer security generate-token
```
In the console you will get an info with the generated token. Copy the token and paste it in a system variable, named `MASTER_TOKEN`, by writing in terminal this command:

```bash
export MASTER_TOKEN=<your_token_here>
```

Once you have saved the token, you can pass in the Authorization header the generated token. 
The example cURL command to test out is followed.

```bash
curl --location --request GET --header 'Authorization: Bearer MASTER_TOKEN' 'localhost:8080/trips'
```

In the terminal, where the dozer API is running, you will get an information similar to this one:
```
INFO 127.0.0.1 "GET /trips HTTP/1.1" 200 24000 "-" "curl/7.81.0" 0.000458    
```

> __Note__: always ensure that your MASTER_TOKEN is kept secure. Do not commit this information to your version control system.

## User-Level Authorization
Level 2 auth will allow you to generate token with smaller scope to narrow down the data accessibility.

To Generate and export a level 2 master token for authentication, make sure you add following part in the dozer configuration file with random secret value.
```yaml
api:
  api_security:
    !Jwt COv9gMj9L12CDFT2zI5o
```

And run following command to generate master key.
```bash
dozer security generate-token
```

To test out level 2 master token, run following command which is a POST request with attached filter.
```bash
curl --location 'http://localhost:8080/auth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <MASTER_TOKEN>' \
--data '{"Custom":{"myfilms":{"$filter":{ "film_id": 646},"fields":[]}}}'
```

output should be like following. When using that new level 2 token to access data api, the result will be covering smaller in scope depending on the filter scope we define for token level 2.

```json
{"token":"<NEW_TOKEN>"}
```
