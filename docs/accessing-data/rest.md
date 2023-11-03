# REST Protocol

## List Stores

The root endpoint returns a JSON list of all the available stores.

### Endpoint

`/`

### Method

`GET`

### Example Request

```bash
curl -X GET http://localhost:8080/
```

## Count Records
The `count` endpoint offers the total number of records present in a specified store. The parameter that needs to be provided to the endpoint is the store's name.

#### Endpoint
`/<store-name>/count`

#### Method
`POST`

#### Path Parameters
| Name          | Type   | Description                             |
|---------------|--------|-----------------------------------------|
| `<store-name>`| String | The name of the store you want to count|

#### Example Request
```bash
curl -X POST http://localhost:8080/trips/count \
  --header 'Content-Type: application/json'
```

## Query Records
The `query` endpoint allows users to retrieve specific records from a store based on defined conditions.

#### Endpoint
`/<store-name>/query`

#### Method
`POST`

#### Path Parameters
| Name          | Type   | Description                             |
|---------------|--------|-----------------------------------------|
| `<store-name>`| String | The name of the store you want to query|

#### Request Body
A JSON object detailing your query conditions using Dozer's [Query Format](query-format).

#### Example Request
```bash
curl -X POST http://localhost:8080/trips/query \
  --header 'Content-Type: application/json' \
  --data '{"$limit":1, "$filter": {"PULocationID": 211}}'
```
For a comprehensive understanding of the query's structure, refer to our [Query Format](query-format) documentation. Ensure your query adheres to the guidelines provided on that page.

## Generate OpenAPI Definition
Generates an OpenAPI definition for a specific store

#### Endpoint 
`/<store-name>/oapi`

#### Path Parameters
| Name          | Type   | Description                             |
|---------------|--------|-----------------------------------------|
| `<store-name>`| String | The name of the store you want to get OpenAPI definitions for|

#### Method
`POST`

#### Example

```bash
curl -X POST http://localhost:8080/trips/oapi
```

## Get Store Phase

The `phase` endpoint returns the current phase of a store. The phase is either "Snapshotting" or "Streaming".

### Endpoint

`/<store-name>/phase`

### Method

`POST`

### Path Parameters

| Name          | Type   | Description                             |
|---------------|--------|-----------------------------------------|
| `<store-name>`| String | The name of the store you want to get the phase of|
