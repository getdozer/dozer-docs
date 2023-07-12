---
hide_table_of_contents: true
---
import flow from '/docs/flow.png';

# Getting Started
A quick start guide on how to get yourself started quickly with Dozer. The purpose of this documentation is to assist in quickly setting up Dozer, enabling you to understand and establish your API using the provided sample easily. It aims to streamline the process and facilitate a smooth introduction to Dozer's functionalities.

<img src={flow} style={{width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} />

# Prerequisites
Before using the dozer for the first time, please see the installation guide [here](2_installation.md) for more details on installing dozer on different platforms.

## Step 1: Clone the Sample Configuration and Data Repository
To clone the dozer samples repository, and follow the steps below:
1. Head over to the dozer sample repository [here](https://github.com/getdozer/dozer-samples/tree/main).
2. Select the sample that you want to run on your device by clicking on the connectors folder. In this example, we choose the local-storage connectors.
3. Download a sample [NY Taxi Dataset file](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page).

## Step 2: Run Dozer Binary
To initiate the processing of data and populate the cache, follow the steps below by running the provided code after downloading the sample configuration and dataset:

```bash
dozer -c dozer-config.yaml
```
:::note
**Note:**
You are able to monitor the execution progress through the terminal or console on your device.
:::

## Step 3: Query the APIs
Once data has been processed and populated in the cache, you can query the API by utilizing either the gRPC or REST API server. The following code can be used to query the APIs:

:::note
**Note:**
Dozer enables both gRPC and REST API by default when loading the sample configuration data.
:::

```bash
# gRPC
grpcurl -d '{"query": "{\"$limit\": 1}"}' -plaintext localhost:50051 dozer.generated.trips_cache.TripsCaches/query

# REST
curl -X POST  http://localhost:8080/trips/query --header 'Content-Type: application/json' --data-raw '{"$limit":3}'
```

### Step 3.1: Query the APIs using Postman
Once the data has been loaded and cached, you can alternatively interact with the generated APIs using both the gRPC and HTTP server using [Postman](https://www.postman.com/). This allows you to seamlessly make queries and perform operations on the APIs using the [Postman](https://www.postman.com/) platform.
