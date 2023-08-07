# Overview


Dozer is a Data API backend that embeds a streaming SQL engine, a low-latency data cache and generates gRPC and REST APIs that can be easily integrated in frontend applications.

**Core Features**

-  **Simple to Use**:
Dozer automatically generates a gRPC and REST APIs from your data sources. All you need is to write a YAML file with your data source configuration and the APIs you want to deploy. 

- **Combine data from multiple sources in real-time**:
As new data flows in, Dozer incrementally computes aggregations and joins, offering a far superior query experience than a traditional database. Dozer can in real-time join data coming from multiple data sources powering advanced use cases. 


## Making a query

In each case, we will use the example provided in the [sample configuration](https://getdozer.io/docs/configuration). 
Dozer provides two different ways to make a query:
* Using gRPC APIs
* Using REST APIs

Let's explore in details each of them.

## 🔎 Querying Data using gRPC APIs

Dozer automatically produces gRPC APIs in two formats.

* **Common Query Format**: This format serves using common `Record` and `FieldDefinition` format with full type support. 
* **Typed Query Format**: It generates code for endpoint and provides statically typed APIs for `Endpoint`.

> *__NOTE__: this format of query requires the module grpcurl. You can install it  from its version in [grpcurl repository](https://github.com/fullstorydev/grpcurl).*


### Example: query in Common Query Format

In this example, let's get the fields and a record in the endpoint `trips_cache`. We will format the query according the Common Query Format. The parameters in this query are:

* the endpoint, in this example `trips_cache`, 
* the `query` , in this example `{\"$limit\":1}` because we want to show only one record,
* the gRPC service is `dozer.common.CommonGrpcService/count`


To run this query, write in the terminal this command: 

``` bash
grpcurl -d '{"endpoint": "trips_cache", "query": "{\"$limit\":1}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query
```

It will be displayed a single entry, which is similar to this example. 

    
```json
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
      "id": "3597",
      "record": {
        "values": [
          {
            "intValue": "43"
          },
          {
            "intValue": "230"
          },
          {
            "intValue": "1045"
          },
          {
            "intValue": "122"
          },
          {
            "intValue": "2713"
          }
        ],
        "version": 45
      }
    }
  ]
}
```

## 🔎 Querying Data using REST APIs

Dozer automatically produces REST APIs including the documentation support. 
Let's use the same data source, but this time making query by using `curl`. 


### Example: display only 3 entries, using REST APIs

In this example, let's show only 3 entries, by making a curl command. It has the parameters:

* the POST request,
* the URL of the REST API
* the header format
* and the data-row, in this example we limit it in 3 rows.


In the terminal, you can try to give this command:

```bash
curl -X POST  http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data-raw '{"$limit":3}'
```

The result is some data similar to this one:

```json
[{"pickup_location":43,"dropoff_location":230,"total_trips":1045,"min_trip_time":122,"max_trip_time":2713,"__dozer_record_id":3597,"__dozer_record_version":45},
{"pickup_location":161,"dropoff_location":1,"total_trips":1091,"min_trip_time":1437,"max_trip_time":11061,"__dozer_record_id":3369,"__dozer_record_version":91},
{"pickup_location":143,"dropoff_location":132,"total_trips":1022,"min_trip_time":1641,"max_trip_time":7694,"__dozer_record_id":3711,"__dozer_record_version":22}]
```

## 📚 Get Open API Documentation

In case you need the API documentation, Dozer provides it by using this command:

`curl -X POST  http://localhost:8080/trips/oapi`

The response will be the full documentation that Dozer generates and which might help in showing all the endpoints and parameters of the REST API.



# 🚀 Quick Start

Now, it's time to start using Dozer. You can get started in one of two ways: Dozer Core and Dozer Cloud.

### Dozer Core

- [Installation](./getting_started/core/installation)
- [Connecting to data sources](./getting_started/core/source)
- [Adding transformations](./getting_started/core/transform)
- [Querying data](./getting_started/core/query)
- [Monitoring your application](./getting_started/core/motitoring)
- [Learn more](./getting_started/core/learn)

### Dozer Cloud

- [Dozer Cloud Installation](./getting_started/cloud/installation.md)


