# Querying Data

Dozer supports querying data in both gRPC and REST formats. Let's explore in details each of them.

## Querying Data using gRPC APIs

Dozer automatically produces gRPC APIs in two formats.

* **Common Format**: This format serves data representing it as a generic record.
* **Typed Format**: This format generatea a full Protobuf type definition of the types exposed. Protobuf definitions are automatically generated from the SQL specified in `dozer-config.yaml`.

> *__NOTE__: querying gRPC APIs requires `grpcurl`. You can install it  from this [repository](https://github.com/fullstorydev/grpcurl).*


### Listing the gRPC services

Dozer uses gRPC server reflection to expose services. Run the following command to list all gRPC services available:

```bash
 grpcurl -plaintext localhost:50051 list
```

In terminal, will be displayed the full list, which is similar to this one:

```bash
dozer.auth.AuthGrpcService
dozer.common.CommonGrpcService
dozer.generated.avg_fares.AvgFares
dozer.generated.trips.Trips
dozer.generated.zones.Zones
dozer.health.HealthGrpcService
grpc.reflection.v1alpha.ServerReflection
```

We will now be querying the `avg_fares` dataset.

### Using the Common Format

We will be using the `dozer.common.CommonGrpcService` to query our data:

Use the `count` command to count the total number of records stored:

```bash
grpcurl -d \
  '{"endpoint": "avg_fares"}' -plaintext localhost:50051 \
  dozer.common.CommonGrpcService/count
```

Use the `query` command to retrieve some records:

```bash
grpcurl -d \
  '{"endpoint": "avg_fares", "query": "{\"$limit\":1, \"$filter\": {\"PULocationID\": 211}}"}' \
  -plaintext localhost:50051 dozer.common.CommonGrpcService/query
```

### Using the Typed Format

To query data using the gRPC typed format use the following command:

```bash
grpcurl -d \
  '{"query": "{\"$limit\":1, \"$filter\": {\"PULocationID\": 211}}"}' \
  -plaintext localhost:50051 dozer.generated.avg_fares.AvgFares/query
```

## Querying data using REST APIs

To query the same data using REST APIs, use the command:

```bash
curl -X POST  http://localhost:8080/avg_fares/query \
  --header 'Content-Type: application/json' \
  --data-raw '{"$filter": {"PULocationID": 211}}}'
```


