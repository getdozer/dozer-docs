---
id: configuration
slug: "/configuration"
---
# Overview
You can configure `Connections`, `Sources` and `Endpoints` primarily, to setup dozer through YAML configuration.

```yaml
app_name: dozer-taxi-apis

# Define list of connections to use
connections:
  - config : !LocalStorage
      details:
        path: data
      tables:
        - !Table
          name: trips
          prefix: /trips
          file_type: parquet
          extension: .parquet
    name: ny_taxi

# You can define multiple transformations to perform on several connections
sql: |
  SELECT
    PULocationID as pickup_location,
    DOLocationID as dropoff_location,
    COUNT(PULocationID, DOLocationID) as total_trips,
    MIN(trip_time) as min_trip_time,
    MAX(trip_time) as max_trip_time
  INTO trips_cache
  FROM trips
  GROUP BY PULocationID, DOLocationID
  HAVING COUNT(PULocationID, DOLocationID) > 1000;


# Sources to be used. Here columns can be filtered
sources:
  - name: trips
    table_name: trips
    connection: ny_taxi

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

## Full Configuration

Below is a full configuration example that includes all possible parameters and its options.
> Note the `connections` config supports multiple connectors, and each connector have its own configuration options. Check out the [connectors](https://getdozer.io/docs/configuration/connectors) page for available connectors configuration.

```yaml
app_name: dozer-taxi-apis  # The name of your Dozer application.

home_dir: "./.dozer"  # The directory where Dozer will store its process-related files. Default is "./.dozer".

cache_dir: "./.dozer/cache"  # The directory where Dozer will store its cache. Default is "./.dozer/cache".

# Define the connections to your data sources.
connections:
  - config : !LocalStorage  # The type of connection. In this case, it's a local storage.
      details:
        path: data  # The path to the directory containing the files
      tables:
        - !Table
          name: trips  # The name of the table in the local storage file.
          prefix: /trips  # The prefix for the file.
          file_type: parquet
          extension: .parquet
    name: ny_taxi  # The name of this connection. This will be used in the 'sources' section.

# Define the sources from where Dozer will ingest data.
sources:
  - name: trips  # The name of the source. This is used to distinguish between multiple sources.
    table_name: trips  # The name of the table in the source database.
    connection: ny_taxi  # The connection to use for this source. This should match a name defined in the 'connections' section.
    refresh_config: !RealTime  # The refresh configuration for this source.

# Define the SQL transformations to apply to the source data.
sql: |
  SELECT
    PULocationID as pickup_location,
    DOLocationID as dropoff_location,
    COUNT(PULocationID, DOLocationID) as total_trips,
    MIN(trip_time) as min_trip_time,
    MAX(trip_time) as max_trip_time
  INTO trips_cache
  FROM trips
  GROUP BY PULocationID, DOLocationID
  HAVING COUNT(PULocationID, DOLocationID) > 1000;

# Define the API endpoints to expose.
endpoints:
  - name: trips_cache  # The name of the endpoint. This will be used in generating a gRPC/REST service & APIs.
    path: /trips  # The endpoint route/path for the REST endpoint.
    table_name: trips_cache  # The name of the table in the source database that this endpoint will expose.
    conflict_resolution: # Optional. The conflict resolution strategy for this endpoint.
        - on_insert: !Update # The action to take on insert conflict. Options are !Update, !Panic, !Nothing.
        - on_update: !Upsert # The action to take on update conflict. Options are !Upsert, !Panic, !Nothing.
        - on_delete: !Nothing # The action to take on delete conflict. Options are !Panic, !Nothing.
    index:  # The index configuration for this endpoint.
      primary_key:
        - pickup_location
        - dropoff_location
      secondary:  # The secondary index configuration for this endpoint.
        create:
          - index: !SortedInverted # Or !FullText
              fields:
              - hvfhs_license_num
              - trip_miles

# Define the API server configuration.
api:
  rest:
   - port: 8080 # Default is 8080.
   - host: localhost # Default is "localhost".
   - cors: true # Whether to enable CORS for the REST API server. Default is true.
   - enabled: true # Whether to enable the REST API server. Default is true.
  grpc:
   - port: 50051 # Default is 50051.
   - host: localhost # Default is "localhost".
   - cors: true # Whether to enable CORS for the gRPC API server. Default is true.
   - web: true # Whether to enable HTTP/1 + web support for the gRPC API server. This is required for browser clients. Default is true.
   - enabled: true # Whether to enable the gRPC API server. Default is true.
  app_grpc:
   - port: 50053 # Default is 50053.
   - host: localhost #  Default is "localhost".
   - cors: true # Whether to enable CORS for the gRPC app API server. Default is true.
   - web: true # Whether to enable HTTP/1 + web support for the gRPC app API server. Default is true.
   - enabled: true # Whether to enable the gRPC app API server. Default is true.
  api_security: !Jwt # The security type for the API. In this case, it's JWT.
      my_secret_token # The secret token for JWT.

# Define the flags to enable/disable features.
flags:
  dynamic: true  # Whether to enable dynamic gRPC. Default is true.
  grpc_web: true  # Whether to enable HTTP/1 + web support for gRPC. This is required for browser clients. Default is true.
  push_events: false  # Whether to enable push events. Currently unstable. Default is false.
  authenticate_server_reflection: false  # Whether to require authentication to access gRPC server reflection service. Default is false.

# Define the telemetry configuration.
telemetry:
  trace: !Dozer # Options - !Dozer , !Jaeger. Remember that !Jaeger doesn't have options - `endpoint`, `adapter` and `sample_percent`. You should use it like - `trace: !Jaeger`
   - endpoint: 0.0.0.0:7006 # The endpoint for Dozer trace. Default is "0.0.0.0:7006".
   - adapter: arrow # The adapter for Dozer trace.
   - sample_percent: 10 # The sample percent for Dozer trace. Default is 10.
  metrics: !Prometheus  # The metrics option for telemetry. In this case, it's Prometheus.

# Define the cache lmdb max map size.
cache_max_map_size: 10485760  # Optional. The maximum size of the cache lmdb map. Default is 1073741824 bytes.

# Define the pipeline buffer size.
app_buffer_size: 1024  # Optional. The size of the app buffer. Default is 20000.

# Define the commit size.
commit_size: 1000  # Optional. The size of the commit. Default is 10000.

# Define the commit timeout.
commit_timeout: 50  # Optional. The timeout for the commit in milliseconds. Default is 50.

# Define the buffer capacity for Log Writer.
file_buffer_capacity: 10485760  # Optional. The buffer capacity for the Log Writer. Default is 1073741824 bytes.

# Define the error threshold.
err_threshold: 10 # Optional. The threshold for errors. Default is 0.
```

## Passing Environment Variables in Configuration

You can enclose the environment variables with double curly brackets,
like `{{ ENVIRONMENT_VARIABLE_NAME }}` to use it in the configuration file.

For example:
```yaml
app_name: {{APP_NAME}}
```
