# Querying Data

---

## Parameters

| Parameter | REST | gRPC  | Description                                                                           |
|-----------|------|-------|---------------------------------------------------------------------------------------|
| **count** | ✅    | ✅     | Counts the number of entries in the endpoint.                                         |
| **query** | ✅    | ✅     | Defines a specific content or action, based on parameters passed in the Post Request. |
| **oapi**  | ✅    |       | Generates Open API3 documentation.                                                    |



---

### `count` Parameter

#### Description

The *count* parameter of counts the number of entries that match the specified endpoint. The count parameter can be useful when specifying data collections or for getting statistical information. 

#### Behavior

* In REST, It appends at the end of the URL, in the format `URL/count`
* In gRPC, it appends at the end of the `dozer.common.CommonGrpcService`
* Returns the response in the JSON format:
```json
[
  {"count": " "}
]  
```

---

### `query` Parameter

#### Description
The *query* parameter is defined by a set of body parameters attached to the URL in the cURL call. Each of the components of the query, is a body parameter, that helps define specific content or actions based on the data being passed.

#### Behavior

* In REST, it appends at the end of the URL, in the format
 `curl -X POST  http://localhost:8080/endpoint/query`
* In gRPC, it appends at the end of the `dozer.common.CommonGrpcService`
* Returns the result with the fields and the values that fulfill the query. The result is a JSON, similar to:
```json
[
  {"field":"value"}
]
```

#### Parameters

`$limit` *integer*  *Optional*
The number limit specifies the number of resources that a single response contains.
  
`$filter` *string*  *Optional*
Field and value to filter items in a resource collection to return a subset of resources in a response.

`$order_by` *string*  *Optional*
Field by which will be ordered the result in the response.

### `oapi` Parameter

#### Description
The *oapi* parameter shows the API Documentation, and Dozer provides it by making a Post request in cURL.

#### Behavior

* It appends at the end of the URL, in the format:

`curl -X POST  http://localhost:8080/trips/oapi`.
* Returns the API Documentation.


The response will be the full documentation that Dozer generates and which might help in showing all the endpoints and parameters of the REST API.


## Using REST APIs

Dozer automatically produces REST APIs including the documentation support. To make the query, let's use `curl`. The format of the request is:

```bash
curl -X POST  URL \
  --header 'Content-Type: application/json' \
  --data-raw QueryParameters
```

**Example: display only 3 entries, using REST APIs**

In this example, let's show only 3 entries, by making a curl command. It has the parameters:

* the POST request,
* the URL of the REST API
* the header format
* and the data-row, in this example we limit it to 3 rows.


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


**Example: query with filter, using REST APIs**

Now let's add a filter, choosing a min_trip_time equals 150. The parameters in this example are:

* the POST request,
* the URL of the REST API
* the header format
* and the data-row, in this example we limit it to 3 rows and add filter `"min_trip_time": 150`.

In the terminal, write the command:

```bash
curl -X POST  http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data-raw '{"$filter": {"min_trip_time": 150}, "$limit":3}'
```
  
 The result displayed are three records, similar to these:
 
 ```json
[{"pickup_location":211,"dropoff_location":113,"total_trips":2247,"min_trip_time":150,"max_trip_time":5187,"__dozer_record_id":1715,"__dozer_record_version":1247},
{"pickup_location":179,"dropoff_location":146,"total_trips":1306,"min_trip_time":150,"max_trip_time":3160,"__dozer_record_id":2934,"__dozer_record_version":306},
{"pickup_location":135,"dropoff_location":95,"total_trips":3442,"min_trip_time":150,"max_trip_time":5706,"__dozer_record_id":676,"__dozer_record_version":2442}]
 ```


---


### Use Postman to test the REST API

Postman is a scalable API testing tool, which you can use to view gRPC APIs with full reflection support. 
In Postman, create a new POST request, and choose the host and the port of your API. In the right pane, you can see the cURL command for the query you are making. See the figure of the example of making a query using REST API.

![](./img/Postman_CURLQuery.png)

## Using gRPC APIs

**Example: count in Common Query Format**

In our dataset, one of the endpoints we have is called `trips_cache`. Let's count all the number of entries in this endpoint. The query has the parameters:
* the endpoint, for example `trips_cache`,
* the gRPC service, which is `dozer.common.CommonGrpcService/count`

In the terminal, write the command:

```bash
grpcurl -d '{"endpoint": "trips_cache"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/count
```

you will get the number of entries, which in this case is 3782.


```json
{
  "count": "3782"
}
```

**Example: query in Common Query Format**

In this example, let's get the fields and a record in the endpoint `trips_cache`. We will format the query according the Common Query Format. The parameters in this query are:

* the endpoint, in this example `trips_cache`,
* the `query` , in this example `{\"$limit\":1}` because we want to show only one record,
* the gRPC service is `dozer.common.CommonGrpcService/count`


To run this query, write in the terminal this command:

```bash
grpcurl -d '{"endpoint": "trips_cache", "query": "{\"$limit\":1}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query
```

It will be displayed a single entry, which is similar to this example. Note, there are displayed the fields and one record.


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

**Example: query with filter in Common Query Format**

In this example, let's add a filter, by choosing a location of the trip. Again, we choose to show only one record.

* the endpoint, in this example `trips_cache`,
* the `query` , in this example `{\"$limit\":1}` because we want to show only one record,
* the `filter` , which is `{\"pickup_location\": 211}` because we want to display one of the trips that has pickup location equals to 211,
* the gRPC service is `dozer.common.CommonGrpcService/count`


To run this query, write in the terminal the command:

```bash
grpcurl -d '{"endpoint": "trips_cache", "query": "{\"$limit\":1, \"$filter\": {\"pickup_location\": 211}}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query
```


It will be displayed a single entry, which is similar to this one:


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
      "id": "3365",
      "record": {
        "values": [
          {
            "intValue": "211"
          },
          {
            "intValue": "132"
          },
          {
            "intValue": "1112"
          },
          {
            "intValue": "1453"
          },
          {
            "intValue": "13830"
          }
        ],
        "version": 112
      }
    }
  ]
}
```
---


### Use Postman to test gRPC queries.

Postman is a scalable API testing tool, which you can use to view gRPC APIs with full reflection support.
In Postman, create a new gRPC request. Enter the host and the port of your API, similar to this example.

![](./img/Postman_gRPC_Query.png)

