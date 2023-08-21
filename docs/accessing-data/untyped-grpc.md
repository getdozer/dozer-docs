# Common gRPC Protocol


## Discover Endpoints
Allows users to retrieve a list of available endpoints, each one corresponding to a store.

#### Service
`dozer.common.CommonGrpcService`

#### Method
`getEndpoints`

#### Example Command
```bash
grpcurl \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/getEndpoints
```

## Retrieve Store Schema
Allows users to obtain the schema of a specific store, detailing the structure and data types of the fields within.

#### Service
`dozer.common.CommonGrpcService`

#### Method
`getFields`

#### Parameters
- `endpoint`: The name of the store you want to query.

#### Example Command
```bash
grpcurl -d '{"endpoint": "trips"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/getFields
```

## Count Records
The `count` endpoint offers the total number of records present in a specific store. The parameter that needs to be provided to the endpoint is the store's name.

#### Service  
`dozer.common.CommonGrpcService`

#### Method  
`count`

#### Parameters  
- `endpoint`: The name of the store you want to query.

#### Example Request
```bash
grpcurl -d '{"endpoint": "trips"}' -plaintext localhost:50051 dozer.common.CommonGrpcService/count
```

Replace `"trips"` in the payload with the desired store's name for your query.

## Query Records

The `query` method of the Common Service enables querying across different stores without the requirement to know the specific type of the store. The conditions for data retrieval are defined in the query, conforming to the structure described in the [Query Format](query-format) page.

#### Service  
`dozer.common.CommonGrpcService`

#### Method  
`query`

#### Parameters  
- `endpoint`: The name of the store you're aiming to query.
- `query`: The conditions and parameters for data retrieval in JSON format.

#### Example Request
```bash
grpcurl -d '{"endpoint": "trips", "query": "{\"$limit\":1, \"$filter\": {\"PULocationID\": 211}}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query
```
Ensure your query adheres to the guidelines provided in the [Query Format](query-format) page.

## Listening for Store Change Events 
The `OnEvent` method in the common gRPC protocol allows users to establish a gRPC stream to monitor real-time modifications, such as inserts, updates, and deletes, in a specified store. This is based on certain filter criteria. 

#### Service  
`dozer.common.CommonGrpcService`

#### Method  
`OnEvent`

#### Parameters  
- `endpoint`: The name of the store you're establishing a stream for.
- `filter`: A JSON string specifying the conditions for the events you wish to listen to.

#### Example Request
```bash
grpcurl -d '{"endpoint": "trips", "filter": "{\"PULocationID\": 211}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/OnEvent
```

In the provided example, the "trips" endpoint is being monitored. This method offers a dynamic way of listening to changes across various stores using a universal gRPC service.