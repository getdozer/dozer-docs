# Configuration

## Dozer Configuration YAML

Dozer uses the YAML syntax for configuration. The `dozer-config.yaml`
file created when you run `dozer init` is a YAML configuration file in the root directory of a project which lets you define connectors, sources, sql, endpoints, and other properties for the dozer application and the packages and functions within it.

The structure of the information in `dozer-config.yaml` is aligned with the structure of your application.

### Format
The file format is based on the YAML spec. The file must be on the root directory of the repository unless you specify the configuration location path with `-c` or `--config-path` option in your command, and be named as:

- `dozer-config.yaml` (default)
- `dozer-config.yml`
- or any other names are fine, but you need to you specify the path including file name with `-c` or `--config-path` option in your command

### Main Properties

| Property          | Type   | Mandatory | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|-------------------|--------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`app_name`**    | String | true      | `app_name: dozer-application`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`connections`** | Array  | true      | `connections: ` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`- config: !Postgres` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`user: "{{PG_USER}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`password: "{{PG_PASSWORD}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`host: "{{PG_HOST}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`port: 5432`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`database: "{{PG_DB}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name: pg`<br/>more example available [here](#data-sources) |
| **`sources`**     | Array  | false     | `sources: ` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`- name: zones` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`table_name: zones` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`connection: pg`<br/>more example available [here](#data-sources)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`sql`**         | String | false     | `sql: SELECT * FROM trips`<br/>more example available [here](#sql-transformations)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`endpoints`**   | Array  | true      | `endpoints: `<br/>&nbsp;&nbsp;&nbsp;&nbsp;`- name: trips` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`path: /trips` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`table_name: trips`<br/>more example available [here](#api-endpoints)                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Data Sources

`connections` are the details around what database that you are going to connect your dozer application with. Meanwhile `sources` are details on the tables that you are fetching from that connections you defined.
Dozer supported connectors and detailed example configurations are available [here](/docs/category/data-sources). As an example, you can configure your connectors like below, in an array manner.

```bash
connections:
  - name: pagila_conn
    config: !Postgres
      user: postgres
      password: postgres
      host: localhost
      port: 5433
      database: film
      
  - name: kafka_store
    config: !Kafka
      broker: localhost:19092
      schema_registry_url: http://localhost:18081
```

And gather the necessary connection details for each data source. These details typically include:
- Database hostname or endpoint
- Port number
- Database name
- Username and password
- Authentication method (if applicable)
- Data warehouse or storage service credentials (if applicable)
- API keys or tokens (if applicable)

Sources are tables to fetch from each connector you defined above and can be defined like below in an array manner as well. This allows each dozer application can connect from various connectors and mix & match with data from different tables.

```bash
sources:
  - name: trips
    table_name: trips
    connection: pagila_conn
    
  - name: transactions
    table_name: transactions
    connection: kafka_store
```

You can also specify on the list of specific columns you want to fetch from the source table like below. This will ignore all other columns in the table to be available for use in dozer application. 
```bash
sources:
  - name: transactions
    table_name: transactions
    connection: kafka_store
    # specific columns to fetch (optional)
    columns:
      - txn_id
      - description
```

## SQL Transformations

Define the data transformation rules you want to apply to the ingested data. Every SQL transformation statement should have `INTO` clause to be exported as a transformed result.

```bash
sql: SELECT * INTO result FROM trips;
```

These SQLs might involve joining tables, aggregating data, or applying filters. Find more details about available SQL functions to be found [here](/docs/transforming-data).

```bash
sql: | # make sql section multi-line
  SELECT 
    id, first_name, last_name, number, age
  INTO result # required to expose transformed result
  FROM users
  WHERE age > 20;
```

You can add multiple SQL transformation statements under `sql` section and also can be exposed as separate transformed result with unique `INTO` clauses.

```bash
sql: |
  # exposing result_1
  SELECT * 
  INTO result_1 
  FROM trips
  INNER JOIN users
    ON users.id = trips.customer_id;

  # exposing result_2
  SELECT 
    id, first_name, last_name, number, age
  INTO result_2
  FROM users
    WHERE age > 20;
    
  # exposing result_3
  SELECT COUNT(*)
  INTO result_3
  FROM trips
  GROUP BY region;
```
You can also save your sql separately in form of `*.sql` file under `./queries` folder. Here is the [sample `basic.sql` file](@site/static/docs/basic.sql).

## API Endpoints

Configure the API endpoints to expose gRPC and REST APIs for data access. Define the endpoints and path that users or downstream systems will use to query and retrieve data.

```bash
endpoints:
  # exposing api directly from source
  - name: trips
    path: /trips
    table_name: trips

  # exposing sql transformed result
  - name: result
    path: /result
    table_name: result
    
  - name: result_3
    path: /result_3
    table_name: result_3
    # index keys from sql GROUP BY column keys
    index:
      primary:
        - region
```

You can introduce indexes such as `primary` keys. These keys are coming from the pre-defined `GROUP BY` column key that you wrote under `sql` block.
On top of this, you can also introduce configurable `secondary` and `full text` indexes as well as below.

```yaml
endpoints:
  - name: trips
    path: /trips
    table_name: trips
    index:
      secondary:
        create:
          - index: !SortedInverted
              fields:
                - hvfhs_license_num
                - trip_miles
```

## Global settings

| Property                               | Details                                                      | Type    | Default Value | Example                              |
|----------------------------------------|--------------------------------------------------------------|---------|---------------|--------------------------------------|
| `app_buffer_size`                      | Pipeline buffer size                                         | Integer | 20000         | `app_buffer_size: 50000`             |
| `commit_size`                          |                                                              | Integer | 10000         | `commit_size: 100`                   |
| `commit_timeout`                       | Commit timeout in milliseconds                               | Integer | 50            | `commit_timeout: 1000`               |
| `log_entry_max_size`                   | Max number of operations in one log entry                    | Integer | 100000        | `log_entry_max_size: 100000`         |
| `log_max_num`<br/>`_immutable_entries` | Max number of immutable entries                              | Integer | 100           | `log_max_num_immutable_entries: 100` |
| `log_storage`                          | The storage to use for the log                               |         |               | `log_storage: `                      |
| `error_threshold`                      | How many errors we can tolerate before bringing down the app | Integer | 0             | `error_threshold: 10`                |
| `home_dir`                             | Home directory of dozer application                          | String  | `./.dozer`    | `home_dir: ./.dozer`                 |
| `cache_dir`                            | Cache directory of dozer application                         | String  | `./.dozer`    | `cache_dir: ./.dozer`                |
| `cache_max_map_size`                   |                                                              | Integer | `./.dozer`    | `cache_max_map_size: 8589934592`     |
