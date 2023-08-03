# API Endpoints
Dozer automatically generates Rest and gRPC Apis based on `endpoints` configuration. Dozer APIs are built on a very fast caching layer that leverages LMDB. The caching layer allows for faster access to data, improving overall API performance by a magnitude. 

```yaml
# APIs to automatically publish
endpoints:
    # Endpoint entity name. Used in generating a gRPC service
  - name: trips_cache
    # Rest Endpoint
    path: /trips
    table_name: trips_cache
    # configure primary and secondary indexes
    index:
      primary_key: 
        - pickup_location
        - dropoff_location
```        


## Server Configuration
By default Dozer runs with thse defaults.
```
# Ports
REST         : 8080
gRPC         : 50051
gRPC Internal: 50053

# Auth
api_security : None 
```

You could configure ports and security using `api` configuration. 
```yaml
api:
  rest:
    port: 7002
  grpc:
    port: 7003
  app_grpc:
    port: 7004
  api_security: !Jwt
        {{ YOUR_JWT_SECRET }}
```
Refer to the [Full API Configuration](https://github.com/getdozer/dozer/blob/main/dozer-types/src/models/api_config.rs) here.