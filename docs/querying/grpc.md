---
id: grpc
slug: /querying/grpc
sidebar_custom_props: {icon: '/docs/img/favicon.ico'}
---
# Using gRPC APIs

Dozer automatically produces gRPC APIs in two formats.

**Common Query Format** - Serve using common `Record` and `FieldDefinition` format with full type support.
**Typed Query Format** - Generates code per endpoint and provides statically typed APIs per `Endpoint`.

## Reflection
Dozer has full support for reflection using the standard documented [here](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md).


## Sample Queries
This example uses sample configuration provided [here](/docs/configuration).

**List gRPC services**
```bash
grpcurl -plaintext localhost:50051 list

# Response
dozer.common.CommonGrpcService
dozer.generated.trips_cache.TripsCaches
dozer.health.HealthGrpcService
grpc.reflection.v1alpha.ServerReflection
```

## Query using Common Format

**Count**
```bash
grpcurl -d '{"endpoint": "trips_cache"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/count

# Response
{
  "count": "3782"
}
```

**Limit by `1`**
```bash
grpcurl -d '{"endpoint": "trips_cache", "query": "{\"$limit\":1}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query

# Response
{
  "fields": [
    {
      "typ": "Int",
      "name": "pickup_location",
      "nullable": true
    },
    {
      "typ": "Int",
      "name": "dropoff_location",
      "nullable": true
    },
    {
      "typ": "Int",
      "name": "total_trips"
    },
    {
      "typ": "Int",
      "name": "min_trip_time",
      "nullable": true
    },
    {
      "typ": "Int",
      "name": "max_trip_time",
      "nullable": true
    }
  ],
  "records": [
    {
      "id": "3095",
      "record": {
        "values": [
          {
            "intValue": "211"
          },
          {
            "intValue": "256"
          },
          {
            "intValue": "1218"
          },
          {
            "intValue": "422"
          },
          {
            "intValue": "6789"
          }
        ],
        "version": 218
      }
    }
  ]
}
```

**Filter by `pickup_location`**
```bash
grpcurl -d '{"endpoint": "trips_cache", "query": "{\"$limit\":1, \"$filter\": {\"pickup_location\": 211}}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query

# Response
{
  "fields": [
    {
      "typ": "Int",
      "name": "pickup_location",
      "nullable": true
    },
    {
      "typ": "Int",
      "name": "dropoff_location",
      "nullable": true
    },
    {
      "typ": "Int",
      "name": "total_trips"
    },
    {
      "typ": "Int",
      "name": "min_trip_time",
      "nullable": true
    },
    {
      "typ": "Int",
      "name": "max_trip_time",
      "nullable": true
    }
  ],
  "records": [
    {
      "id": "3095",
      "record": {
        "values": [
          {
            "intValue": "211"
          },
          {
            "intValue": "256"
          },
          {
            "intValue": "1218"
          },
          {
            "intValue": "422"
          },
          {
            "intValue": "6789"
          }
        ],
        "version": 218
      }
    }
  ]
}
```


Alternatively, you can use Postman to view gRPC APIs with full reflection support.
![Dozer Open API Documention](@site/static/docs/trips.png)
