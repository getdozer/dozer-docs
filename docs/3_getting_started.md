---
hide_table_of_contents: true
---
# Getting Started

**Download sample configuration and data**

Create a new empty directory and run the commands below. This will download a [sample configuration file](https://github.com/getdozer/dozer-samples/blob/main/local-storage/dozer-config.yaml) and a sample [NY Taxi Dataset file](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).

```bash
curl -o dozer-config.yaml https://raw.githubusercontent.com/getdozer/dozer-samples/main/connectors/local-storage/dozer-config.yaml
curl --create-dirs -o data/trips/fhvhv_tripdata_2022-01.parquet https://d37ci6vzurychx.cloudfront.net/trip-data/fhvhv_tripdata_2022-01.parquet
```

**Run Dozer binary**

```bash
dozer -c dozer-config.yaml
```

Dozer will start processing the data and populating the cache. You can see a progress of the execution from the console.

**Query the APIs**

When some data is loaded, you can query the cache using gRPC or REST

```bash
# gRPC
grpcurl -d '{"query": "{\"$limit\": 1}"}' -plaintext localhost:50051 dozer.generated.trips_cache.TripsCaches/query

# REST
curl -X POST  http://localhost:8080/trips/query --header 'Content-Type: application/json' --data-raw '{"$limit":3}'
```

Alternatively, you can use [Postman](https://www.postman.com/) to discover gRPC endpoints through gRPC reflection

![postman query](postman.png)

### More Samples

Check out Dozer's [samples repository](https://github.com/getdozer/dozer-samples) for more comprehensive examples and use case scenarios. 