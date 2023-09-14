# Other Settings

## API Configuration
The `api` section of the Dozer configuration specifies how different types of APIs are set up and interact with other services. This section is organized into three main blocks, each corresponding to a specific type of API: `rest`, `grpc`, and `app_grpc`. Additionally, there's a `api_security` block which designates the security type to be applied across these API interfaces. You can also configure the maximum number of records returned from queries using the `default_max_records_num` parameter.

Here's a summarized view of the configuration structure:

```yaml
api:
  rest:
    ...
  grpc:
    ...
  app_grpc:
    ...
  api_security: !Jwt
      jwt_token 
  default_max_records_num: 
```

### API Security
The `api_security` subsection determines the kind of security protocol the API should utilize. The only option availble is JWT, as shown in the sample configuration above.

#### Parameters
| Name         | Type   | Description                                             |
|--------------|--------|---------------------------------------------------------|
| ↳ (JWT Token) | String | If `!Jwt` is chosen, this specifies the secret token for JWT authentication. |

### REST API
The `rest` subsection configures the Data APIs REST server.

```yaml
  rest:
   port: 8080
   host: localhost
   cors: true
   enabled: true
```
#### Parameters
| Name            | Type    | Description                                                                                                    |
|-----------------|---------|----------------------------------------------------------------------------------------------------------------|
| `port`          | Integer | The port on which the REST API server listens. Default: `8080`.                                                |
| `host`          | String  | Host address for the REST API server. Default: `localhost`.                                                    |
| `cors`          | Boolean | Enables or disables CORS (Cross-Origin Resource Sharing) for the REST API server. Default: `true`.              |
| `enabled`       | Boolean | Indicator if the REST API server is active. Default: `true`.                                                   |

### gRPC API
The `grpc` subsection configures the Data APIs gRPC server.

```yaml
  grpc:
   port: 50051
   host: localhost
   cors: true
   web: true
   enabled: true
```

#### Parameters
| Name           | Type    | Description                                                                                                                              |
|----------------|---------|------------------------------------------------------------------------------------------------------------------------------------------|
| `port`         | Integer | Port on which the gRPC API server will listen. Default: `50051`.                                                                         |
| `host`         | String  | Host address for the gRPC API server. Default: `localhost`.                                                                              |
| `cors`         | Boolean | Enables or disables CORS for the gRPC API server. Default: `true`.                                                                      |
| `web`          | Boolean | Enables HTTP/1 + web support for the gRPC API server, which is essential for browser clients. Default: `true`.                           |
| `enabled`      | Boolean | Specifies if the gRPC API server is active. Default: `true`.                                                                             |

### App gRPC
The `app_grpc` section configures the App gRPC API server. This server is used for internal Dozer communication.

```yaml
  app_grpc:
   port: 50053
   host: localhost
   cors: true
   web: true
   enabled: true
```

#### Parameters
| Name           | Type    | Description                                                                                                                             |
|----------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `port`         | Integer | Port where the app-specific gRPC API server listens. Default: `50053`.                                                                  |
| `host`         | String  | Host address for the app-specific gRPC API server. Default: `localhost`.                                                                |
| `cors`         | Boolean | Dictates if CORS is active for the app-specific gRPC API server. Default: `true`.                                                       |
| `web`          | Boolean | Activates HTTP/1 + web support for the app-specific gRPC API server. Default: `true`.                                                   |
| `enabled`      | Boolean | Indicator to enable or disable the app-specific gRPC API server. Default: `true`.                                                       |

### Default Query Limit

The `default_max_records_num` is an   `Integer` parameter that specifies the maximum number of records returned from queries. The default value is 50.