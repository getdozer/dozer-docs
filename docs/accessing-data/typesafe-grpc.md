# Typesafe gRPC Protocol
In Typesafe gRPC, each store directly maps to a gRPC endpoint. Using the gRPC reflection mechanism, endpoints can be discovered and subsequently interacted with via their respective gRPC services.

## List Services
The `list` capability uses gRPC server reflection to list all available services

#### Example Request
```bash
grpcurl -plaintext localhost:50051 list
```
::::note
`list` is not a Dozer specific method, but a general functionality of gRPC reflection to discover all available services.
::::

Executing this command will display a list of all available gRPC endpoints for the typesafe services, including all store querying services. Store querying services follows the format `dozer.generated.<store-name>.<StoreName>`.

## Count Records
The `count` endpoint offers the total number of records present in a specified store. The parameter that needs to be provided to the endpoint is the store's name.

#### Method  
`count`

#### Example Request
```bash
grpcurl -plaintext localhost:50051 dozer.generated.trips.Trips/count
```

Replace `<store-name>` and `<StoreName>` with the desired store's name for your query. In the provided examples, "trips" is the store name.

## Query Records

The `query` method facilitates the retrieval of records from a specified store based on certain conditions. The conditions are defined in the query, which follows a specific format detailed in the [Query Format](query-format) page.

#### Method  
`query`

#### Parameters  
| Name   | Type        | Description                                                                                        |
|--------|-------------|----------------------------------------------------------------------------------------------------|
| `query`| JSON | The conditions and parameters for data retrieval in JSON format following Dozer's [Query Format](query-format). |


#### Example Request
```bash
grpcurl -d '{"query": "{\"$limit\":1, \"$filter\": {\"PULocationID\": 211}}"}' \
    -plaintext localhost:50051 dozer.generated.trips.Trips/query
```

Replace `<store-name>` and `<StoreName>` with the appropriate store's name for your query. In the provided examples, "trips" is the store name. Make sure to format your query according to the guidelines in the [Query Format](query-format) page.

## Listening for Store Change Events
The `OnEvent` method within the typed gRPC service lets users establish a gRPC stream to monitor real-time changes (like inserts, updates, and deletes) in a particular store, based on specific filter criteria. 

#### Method  
`OnEvent`

#### Parameters  

| Name     | Type   | Description                                                                                                                   |
|----------|--------|-------------------------------------------------------------------------------------------------------------------------------|
| `type`   | Enum   | The event type to subscribe to: `ALL`, `INSERT_ONLY`, `UPDATE_ONLY`, `DELETE_ONLY`.                                           |
| `filter` | JSON   | The criteria for the events you wish to listen to, using Dozer's [Query Format](query-format).                    |

#### Example Request
```bash
grpcurl -d '{"filter": "{\"PULocationID\": 211}"}' \
    -plaintext localhost:50051 dozer.generated.trips.Trips/on_event
```

Substitute `<store-name>` and `<StoreName>` with the respective name of the store you're interested in. In the example provided, "trips" is the store's name. This method provides a real-time feed of data changes, ideal for applications necessitating instant updates from Dozer stores. Make sure to format your filter according to the guidelines in the [Query Format](query-format) page.