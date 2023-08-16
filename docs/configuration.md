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

### Conventions
The spec of the configuration file must use these conventions.

- Use **`[]`** to indicate an empty list
- Use **`null`** to indicate a null value
- Use **`true`** and **`false`** as only options on boolean fields


## Data Sources

Followings are dozer supported connectors and detailed example configurations are available:
- [Postgres](/docs/configuration/sources/postgres#configuration)
- [Snowflake](/docs/configuration/sources/snowflake#configuration)
- [Ethereum](/docs/configuration/sources/ethereum#configuration)
- [Kafka](/docs/configuration/sources/kafka#configuration)
- [gRPC](/docs/configuration/sources/grpc#configuration)
- [Delta Lake](/docs/configuration/sources/object-stores/formats/deltalake#configuration)
- [AWS S3](/docs/configuration/sources/object-stores/types/aws-s3#configuration)
- Local Object Store ([csv](/docs/configuration/sources/object-stores/formats/csv#configuration), [parquet](/docs/configuration/sources/object-stores/formats/parquet#configuration))

And gather the necessary connection details for each data source. These details typically include:
- Database hostname or endpoint
- Port number
- Database name
- Username and password
- Authentication method (if applicable)
- Data warehouse or storage service credentials (if applicable)
- API keys or tokens (if applicable)

## SQL Transformations

Define the data transformation rules you want to apply to the ingested data. 
These SQLs might involve joining tables, aggregating data, or applying filters.

## API Endpoints

Configure the Store/API nodes to expose gRPC and REST APIs for data access. Define the endpoints and routes that users or downstream systems will use to query and retrieve data.

## Global settings (Optional)

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
