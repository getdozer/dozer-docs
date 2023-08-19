# REST Protocol

## Count Records
The `count` endpoint offers the total number of records present in a specified store. The parameter that needs to be provided to the endpoint is the store's name.

#### Endpoint
`/store-name/count`

#### Method
`POST`

#### Headers
- `Content-Type: application/json`

#### Parameter  
- `store-name`: The name of the store you want to query.

#### Example Request
```bash
curl -X POST http://localhost:8080/trips/count \
  --header 'Content-Type: application/json'
```

## Query Records
The `query` endpoint allows users to retrieve specific records from a store based on defined conditions.

#### Endpoint
`/store-name/query`

#### Method
`POST`

#### Headers
- `Content-Type: application/json`

#### Parameters
- `store-name`: The name of the store you wish to query.
- `body`: A JSON object detailing your query conditions.

#### Example Request
```bash
curl -X POST http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data '{"$limit":1, "$filter": {"PULocationID": 211}}'
```

For a comprehensive understanding of the query's structure, refer to our [Query Format](query-format) documentation. Ensure your query adheres to the guidelines provided on that page.
