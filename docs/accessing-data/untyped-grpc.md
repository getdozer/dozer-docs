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
- `query`: The conditions and parameters for data retrieval in JSON format, following Dozer's [Query Format](query-format)

#### Example Request
```bash
grpcurl -d '{"endpoint": "trips", "query": "{\"$limit\":1, \"$filter\": {\"PULocationID\": 211}}"}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/query
```
Ensure your query adheres to the guidelines provided in the [Query Format](query-format) page.

Of course! Here's the documentation using a tabular representation:

## Listening for Store Change Events 
The `OnEvent` method facilitates users in establishing a gRPC stream to monitor real-time store modifications. The method allows simultaneous subscriptions to multiple endpoints.

#### Service  
`dozer.common.CommonGrpcService`

#### Method  
`OnEvent`

### Parameters

- `endpoints`: A map with key-value pairs. The key is the name of the endpoint to monitor, and the value is the corresponding `EventFilter`.

#### EventFilter

- `type`: The event type to subscribe to: `ALL`, `INSERT_ONLY`, `UPDATE_ONLY`, `DELETE_ONLY`.
- `filter`: A JSON filter string indicating the specific conditions provided in the Dozer [Query Format](query-format)

#### Example Request

```bash
grpcurl -d '{"endpoints": {"trips": {"type": "ALL", "filter": "{\"PULocationID\": 211}"}}}' \
    -plaintext localhost:50051 dozer.common.CommonGrpcService/OnEvent
```

The example showcases setting up a stream to listen for all event types on the "trips" endpoint where `PULocationID` equals `211`. The enhanced `OnEvent` provides users with a comprehensive approach to efficiently monitor various stores via a single gRPC service.