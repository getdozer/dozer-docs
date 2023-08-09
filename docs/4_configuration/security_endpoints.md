---
id: security
slug: "/configuration/security"
---
# Authentication & Authorization

By default dozer runs without any security. You can enable auth by specifying `api.api_security` in the app configuration. Auth module is common across gRPC and REST APIs.

Currently following authentication methods are supported:

- [JWT](https://jwt.io/)

## JWT Authentication

### Configure JWT

In the `api` section of the app configuration, set `api_security` to `JWT` and provide the JWT secret:

```yaml
app_name: authenticated_app
api:
    ...
    api_security: !Jwt
        YOUR_JWT_SECRET
...
```

### Authentication in Action

Once authentication is enabled, one can't access the APIs without including a JWT token.

#### REST

```bash
curl --location --request GET -I 'localhost:8080/stocks-meta'
```

```
HTTP/1.1 401 Unauthorized
content-length: 0
www-authenticate: Bearer
access-control-allow-credentials: true
access-control-expose-headers: www-authenticate
...
```

#### gRPC

```bash
grpc_cli call localhost:50051 StocksMetas.query ''
```

```
connecting to localhost:50051
Received trailing metadata from server:
content-length : 0
...
Rpc failed with status code 7, error message:
```

### Master Token

To generate a master JWT token, run the following command

```bash
dozer security generate-token
```

It generates the master token, and writes it to stdout.

Say the generated token is MASTER_TOKEN, now we can access the APIs by including the token in the request header

#### REST

```bash
curl --location --request GET --header 'Authorization: Bearer MASTER_TOKEN' 'localhost:8080/stocks-meta'
```

```json
[
  {"symbol":"A","security_name":"Agilent Technologies, Inc. Common Stock"},
  {"symbol":"ALLO","security_name":"Allogene Therapeutics, Inc. - Common Stock"},
  {"symbol":"ATOM","security_name":"Atomera Incorporated - Common Stock"},
  {"symbol":"BIMI","security_name":"BOQI International Medical Inc. - Common Stock"},
  {"symbol":"BYFC","security_name":"Broadway Financial Corporation - Common Stock"},
  {"symbol":"CIBR","security_name":"First Trust NASDAQ Cybersecurity ETF"},
  ...
]
```

#### gRPC

```bash
grpc_cli --metadata="authorization:Bearer MASTER_TOKEN" call localhost:50051 StocksMetas.query ''
```

```bash
connecting to localhost:50051
Sending client initial metadata:
authorization : Bearer MASTER_TOKEN
Received initial metadata from server:
date : ...
data {
 symbol: "A",
 security_name: "Agilent Technologies, Inc. Common Stock"
}
data {
 symbol: "ALLO",
 security_name: "Allogene Therapeutics, Inc. - Common Stock"
}
data {
 symbol: "ATOM",
 security_name: "Atomera Incorporated - Common Stock"
}
...
Rpc succeeded with OK status
```


***Note: Generated master token has access to all API endpoints configured in the config file.***

## Authenticate gRPC Server Reflection

By default gRPC server reflection is not protected by authentication. The behavior can be changed by setting `authenticate_server_reflection` to `true` in `flags`.
<!-- add correct URL for [flags](../configuration/introduction#flags) once its fixed -->

For example, with the following config file

```yaml
app_name: more_authenticated_app
api:
    ...
    api_security: !Jwt
        YOUR_JWT_SECRET
flags:
    dynamic: true
    grpc_web: true
    authenticate_server_reflection: true
    push_events: false
...
```

`grpc_cli ls` command will fail.

```bash
grpc_cli ls localhost
```

output:
```bash
Received an error when querying services endpoint.
ServerReflectionInfo rpc failed. Error code: 7, message: , ...
```

## Generate Token for Custom Access

You can generate a token with custom access for API calls by making a request to the `/auth/token` endpoint. This allows you to set specific access controls for different users or applications.

To generate a custom access token, make a POST request to `http://localhost:8080/auth/token` with a JSON payload specifying the `access filter`. For example:

**REST:** To generate a custom token using REST, you can use the following command as an example (following example is taken from [getting started guide](https://getdozer.io/docs/getting_started)):


```bash
curl --location 'http://localhost:8080/auth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer MASTER_TOKEN' \
--data '{
    "Custom": {
        "trips_cache": {}
    }
}'
```

**gRPC:** To generate a custom token using REST, you can use the following command as an example:

```bash
grpc_cli call \                                                      (base) 0 (35.702s) < 15:57:56
        --metadata='authorization:Bearer MASTER_TOKEN'\
    localhost:50051\
    AuthGrpcService.getAuthToken\
    'access_filter: "{ \"Custom\": { \"trips_cache\": {} } }"'

```
In this example, the access filter is set to allow access only to the the `trip_cache` endpoint. The generated token will have these access restrictions embedded in it, and can be used to make API calls with the specified custom access.

Make sure to replace the example filter with the appropriate rules for your specific use case.

## Use JWT Token in Client Libraries

Here's how you can use the JWT token in client libraries (Python and JavaScript) using Dozer.

### Python

First, install the [`pydozer`](https://github.com/getdozer/dozer-python) package:

```bash
pip install pydozer
```

Then, create a Python script using the JWT token:

```python
from pydozer.auth import AuthClient
from pydozer.api import ApiClient

master_token = 'eyJ0eXAiOiJxxxxxxxxxnVvzHA'

client = AuthClient(token=master_token, url='0.0.0.0:50051')

restricted_token = client.get_auth_token()

print(f"Token: {restricted_token}")

api = ApiClient("pickup", url='0.0.0.0:50051', token=restricted_token)

count = api.count()

print(f"Count: {count}")
```

This example demonstrates how to use the `pydozer` package to authenticate with the Dozer API using the JWT token. The `AuthClient` class is initialized with the `master_token` and `url`. Then, a restricted token is fetched and used to initialize the `ApiClient`. Finally, the `count()` method is called to fetch the count of items from the "pickup" API.

### JavaScript

For JavaScript, you can use the [`dozer-js`](https://github.com/getdozer/dozer-js) package.

### Explore a Use Case Sample
For a practical example of how to use the authentication and authorization features of Dozer, you can explore the [API Auth use case sample](https://github.com/getdozer/dozer-samples/tree/main/usecases/api-auth) in the [`dozer-samples`](https://github.com/getdozer/dozer-samples) repository. This sample demonstrates how to use Dozer's API authentication and authorization in a real-world scenario involving movie ticket data.
