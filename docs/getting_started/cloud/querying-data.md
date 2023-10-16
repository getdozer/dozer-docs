# Querying Data via APIs

Dozer supports querying data in both gRPC and REST formats. Let's explore in details each of them.

## Querying Data via gRPC APIs

Dozer automatically produces gRPC APIs in two formats.

* **Common Format**: This format serves data representing it as a generic record.
* **Typed Format**: This format generatea a full Protobuf type definition of the types exposed. Protobuf definitions are automatically generated from the SQL specified in `dozer-config.yaml`.

::::tip
Following the examples below requires `grpcurl`. You can install it  from this [repository](https://github.com/fullstorydev/grpcurl).
::::


## Using API Endpoints on Dozer Cloud

After you have succesfully deployed your application on cloud. Head to the API Endpoints section of your application. Here you can get the gRPC and REST endpoints for your application. 

You can choose from different mehtods while querying your data
* Count
* Query
* OnEvent

### Query

You can query the data using the [format](../../accessing-data.md) in the `Query` field.

