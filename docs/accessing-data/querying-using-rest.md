# 🔎 Querying Data using REST APIs

Dozer automatically produces REST APIs including the documentation support. 
Let's use the same data source, but this time making query by using `curl`. 


### Example 1: display only 3 entries, using REST APIs

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


### Example 2: query with filter, using REST APIs

Now let's add a filter, choosing a min_trip_time equals 150. The parameters in this example are:

* the POST request,
* the URL of the REST API
* the header format
* and the data-row, in this example we limit it in 3 rows and add filter `"min_trip_time": 150`.

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

 
## Test API using Postman

Alternatively, you can import all the above curl requests to Postman.

![](../img/postman_rest_api.png)

## 📚 Get Open API Documentation

In case you need the API documentation, Dozer provides it by using this command:

`curl -X POST  http://localhost:8080/trips/oapi`

The response will be the full documentation that Dozer generates and which might help in showing all the endpoints and parameters of the REST API.