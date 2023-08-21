---
slug: /querying/rest
---
# Using REST APIs

Dozer automatically produces REST APIs including documentation support.


## Sample Queries
For this example, lets use the [sample configuration](/docs/configuration) provided here.


### REST APIs
Generated Rest APIs.

| Method              | Notes                                       |
| ------------------- | ------------------------------------------- |
| `POST /trips/query` | Query with support for filter and order by  |
| `POST /trips/count` | Count no of records with support for filter |
| `POST /trips/oapi`  | Open API3 documentation generated           |


### Query
**Limit by `3`**
```bash
curl -X POST  http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data-raw '{"$limit":3}'

# Response
[
  {"pickup_location":211,"dropoff_location":256,"total_trips":1218,"min_trip_time":422,"max_trip_time":6789,"__dozer_record_id":3095,"__dozer_record_version":218},
  {"pickup_location":127,"dropoff_location":18,"total_trips":1412,"min_trip_time":268,"max_trip_time":3091,"__dozer_record_id":2654,"__dozer_record_version":412},
  {"pickup_location":181,"dropoff_location":190,"total_trips":1458,"min_trip_time":82,"max_trip_time":3193,"__dozer_record_id":2565,"__dozer_record_version":458}
]
```

**Filter by `pickup_location`**
```bash
curl -X POST  http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data-raw '{"$filter": {"pickup_location": 211}, "$limit":3}'

# Response
[
  {"pickup_location":211,"dropoff_location":256,"total_trips":1218,"min_trip_time":422,"max_trip_time":6789,"__dozer_record_id":3095,"__dozer_record_version":218},
  {"pickup_location":211,"dropoff_location":132,"total_trips":1112,"min_trip_time":1453,"max_trip_time":13830,"__dozer_record_id":3365,"__dozer_record_version":112},
  {"pickup_location":211,"dropoff_location":113,"total_trips":2247,"min_trip_time":150,"max_trip_time":5187,"__dozer_record_id":1715,"__dozer_record_version":1247}
]
```

**Order by `min_trip_time`**
```bash
curl -X POST  http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data-raw '{"$order_by": {"min_trip_time": "asc"}}'

# Response
[
  {"pickup_location":211,"dropoff_location":256,"total_trips":1218,"min_trip_time":422,"max_trip_time":6789,"__dozer_record_id":3095,"__dozer_record_version":218},
  // ...
]  
```
**Get Open API Documentation**
```
curl -X POST  http://localhost:8080/trips/oapi

# Response
{"openapi":"3.0.0","info":{"title":"TRIPS_CACHE","description":"API documentation for trips_cache. Powered by Dozer Data.","contact":{"name":"Dozer Team","url":"https://getdozer.io","email":"api@getdozer.io"},"version":"1.0.0"},"servers":[{"url":"http://localhost:8080"}],"paths":{"/trips":{"get":{"tags":["trips_cache"],"summary":"Fetch multiple documents in the default sort order","description":"This is used when no filter expression or sort is needed.","operationId":"list-trips_cache","responses":{"200":{"description":"A page array of trips_cache","content":{"application/json":{"schema":{"$ref":"#/components/schemas/trips_cache_array"}}}}}}},"/trips/{id}":{"get":{"tags":["trips_cache"],"summary":"Fetch a single document record by primary key","description":"Generated API to fetch a single record. Primary key specified will be used for lookup","operationId":"trips_cache-by-id","parameters":[{"in":"path","name":"id","description":"Primary key of the document - pickup_location, dropoff_location ","required":true,"schema":{"type":"integer"},"style":"simple"}],"responses":{"200":{"description":"Get by id trips_cache","content":{"application/json":{"schema":{"$ref":"#/components/schemas/trips_cache"}}}}}}},"/trips/count":{"post":{"tags":["trips_cache"],"summary":"Count documents based on an expression","description":"Count documents based on an expression","operationId":"count-trips_cache","requestBody":{"content":{"application/json":{"example":{"pickup_location":-1}}},"required":true},"responses":{"200":{"description":"Count of records satisfying the query","content":{"application/json":{"schema":{"type":"integer","format":"int64","minimum":0}}}}}}},"/trips/query":{"post":{"tags":["trips_cache"],"summary":"Query documents based on an expression","description":"Documents can be queried based on a simple or a composite expression","operationId":"query-trips_cache","requestBody":{"content":{"application/json":{"example":{"pickup_location":-1}}},"required":true},"responses":{"200":{"description":"A page array of trips_cache","content":{"application/json":{"schema":{"$ref":"#/components/schemas/trips_cache_array"}}}}}}}},"components":{"schemas":{"trips_cache":{"description":"A representation of trips_cache","type":"object","properties":{"pickup_location":{"type":"integer","format":"int64"},"dropoff_location":{"type":"integer","format":"int64"},"total_trips":{"type":"integer","format":"int64"},"min_trip_time":{"type":"integer","format":"int64"},"max_trip_time":{"type":"integer","format":"int64"}},"required":["total_trips"]},"trips_cache_array":{"description":"Array of trips_cache","type":"array","items":{"$ref":"#/components/schemas/trips_cache"}}}},"tags":[{"name":"trips_cache"}]}
```
Alternatively, you can import all the above curl requests to Postman. 
![Dozer Open API Documention](@site/static/docs/oapi.png)

