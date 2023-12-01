---
description: Allows the programmatic ingestion of events using the streaming gRPC protocol
---

# gRPC Ingestion

The gRPC connector allows to ingest data on Dozer pushing data to a gRPC endpoint in a streaming fashion.
It supports Dozer data format and Apache Arrow data format.
The Dozer ecosystem provides Python and React clients to easily ingest data on Dozer using gRPC.

## Default Adapter
### Configuration

To use gRPC connector the config parameter of the connection must be set to `!Grpc`.
The following configuration block can be used in `dozer-config.yaml` to define a new gRPC connection:

```yaml
connections:
  - config: !Grpc
      adapter: default
      schemas: !Path "trips.json"
      port: 7005
    name: trips_default
```

### Parameters
| Name               | Type      | Description                                                                                                                             |
|--------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `adapter`             | String    | The adapter to use to ingest data. |
| `schemas`        | String    | The path to the JSON file containing the schema definitions of the tables to ingest. |
| `port`      | Boolean   | The port on which the gRPC server will listen for incoming data. |

### Notes

The Arrow schema definition is using JSON format, here is an example:

```json
{
  "trips": {
    "schema": {
      "fields": [
        {
          "typ": "String",
          "name": "hvfhs_license_num",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "dispatching_base_num",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "originating_base_num",
          "nullable": true
        },
        {
          "typ": "Timestamp",
          "name": "request_datetime",
          "nullable": true
        },
        {
          "typ": "Timestamp",
          "name": "on_scene_datetime",
          "nullable": true
        },
        {
          "typ": "Timestamp",
          "name": "pickup_datetime",
          "nullable": true
        },
        {
          "typ": "Timestamp",
          "name": "dropoff_datetime",
          "nullable": true
        },
        {
          "typ": "Int",
          "name": "PULocationID",
          "nullable": true
        },
        {
          "typ": "Int",
          "name": "DOLocationID",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "trip_miles",
          "nullable": true
        },
        {
          "typ": "Int",
          "name": "trip_time",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "base_passenger_fare",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "tolls",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "bcf",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "sales_tax",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "congestion_surcharge",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "airport_fee",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "tips",
          "nullable": true
        },
        {
          "typ": "Float",
          "name": "driver_pay",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "shared_request_flag",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "shared_match_flag",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "access_a_ride_flag",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "wav_request_flag",
          "nullable": true
        },
        {
          "typ": "String",
          "name": "wav_match_flag",
          "nullable": true
        }
      ]
    }
  }
}
```


## Arrow Adapter
### Configuration

To use gRPC connector the config parameter of the connection must be set to `!Grpc`.
The following configuration block can be used in `dozer-config.yaml` to define a new gRPC connection:

```yaml
connections:
  - config: !Grpc
      adapter: arrow
      schemas: !Path "trips.json"
      port: 7005
    name: trips_arrow
```

### Parameters
| Name               | Type      | Description                                                                                                                             |
|--------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `adapter`             | String    | The adapter to use to ingest data. |
| `schemas`        | String    | The path to the JSON file containing the schema definitions of the tables to ingest. |
| `port`      | Boolean   | The port on which the gRPC server will listen for incoming data. |
### Notes

The Arrow schema definition is using JSON format, here is an example:

```json
[
  {
    "name": "trips",
    "schema": {
      "fields": [
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "hvfhs_license_num",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "dispatching_base_num",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "originating_base_num",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": {
            "Timestamp": [
              "Millisecond",
              "SGT"
            ]
          },
          "name": "request_datetime",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": {
            "Timestamp": [
              "Millisecond",
              "SGT"
            ]
          },
          "name": "on_scene_datetime",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": {
            "Timestamp": [
              "Millisecond",
              "SGT"
            ]
          },
          "name": "pickup_datetime",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": {
            "Timestamp": [
              "Millisecond",
              "SGT"
            ]
          },
          "name": "dropoff_datetime",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Int64",
          "name": "PULocationID",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Int64",
          "name": "DOLocationID",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "trip_miles",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Int64",
          "name": "trip_time",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "base_passenger_fare",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "tolls",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "bcf",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "sales_tax",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "congestion_surcharge",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "airport_fee",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "tips",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Float64",
          "name": "driver_pay",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "shared_request_flag",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "shared_match_flag",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "access_a_ride_flag",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "wav_request_flag",
          "nullable": true
        },
        {
          "dict_id": 0,
          "dict_is_ordered": false,
          "metadata": {},
          "data_type": "Utf8",
          "name": "wav_match_flag",
          "nullable": true
        }
      ],
      "metadata": {}
    }
  }
]
```