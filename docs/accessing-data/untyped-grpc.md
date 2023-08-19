# Common gRPC Protocol

## Count Records
The `count` endpoint offers the total number of records present in a specified store. The parameter that needs to be provided to the endpoint is the store's name.

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

Remember to adjust the `endpoint` to the particular store's name you're interested in querying. Ensure your query adheres to the guidelines provided in the [Query Format](query-format) page.