# Configuration
Dozer relies on a YAML configuration structure delineated in `dozer-config.yaml`. This file serves as the backbone for specifying connectors, data sources, SQL transformations, API endpoints, and other critical characteristics of your application.

### Location and Naming
`dozer-config.yaml` must reside in the root directory of a Dozer application. Alternative filenames can be utilized but must be declared using the `-c` or `--config-path` option when executing the `dozer` command.

### Key Properties

| Property    | Mandatory | Description                                                                                                     |
|-------------|-----------|-----------------------------------------------------------------------------------------------------------------|
| `app_name`  | Yes       | Sets the unique name of the Dozer application.                                                                  |
| [`connections`](#connections) | Yes    | Details the array of various database connections.                                                              |
| [`sources`](#sources)   | Yes        | Denotes tables and associated data streams from the designated connections.                                      |
| [`sql`](#sql-transformations)       | No        | Describes the SQL transformations applied to the sourced data.                                                   |
| [`endpoints`](#api-endpoints) | Yes       | Establishes API endpoints, determining how data access and queries are managed.                                  |

For an in-depth breakdown of each property, consult the associated sections.


## Data Sources

### Connections

`connections` define the databases or services Dozer will interface with. Each connection is represented as an array item and details the kind of database or service being connected to.

```yaml
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

Each connection typically requires the following details:
- Database hostname or endpoint.
- Port number.
- Database name.
- User credentials: username and password.
- Specific details depending on the service type (e.g., schema registry for Kafka).

For a comprehensive list of supported connectors and their configurations, refer to [Dozer's supported connectors documentation](/data-sources).

### Sources

`sources` represent the specific tables or data points you wish to fetch from the established connections. Like connections, sources are also represented in an array format.

```yaml
sources:
  - name: trips
    table_name: trips
    connection: pagila_conn
    
  - name: transactions
    table_name: transactions
    connection: kafka_store
```

For more refined data extraction, you can also specify the columns you wish to fetch from a source. This makes it possible to tailor data intake to only the necessary fields, optimizing the efficiency of your Dozer application.

```yaml
sources:
  - name: transactions
    table_name: transactions
    connection: kafka_store
    columns: # Optional
      - txn_id
      - description
```
## SQL Transformations
To cater to intricate data transformation requirements, the Dozer configuration supports complex SQL statements. For a better understanding, consider the following guidelines:

### Multi-Line SQL Statements:
When your transformation logic spans multiple lines, utilize the pipe (`|`) symbol for clarity:

```yaml
sql: |
  SELECT 
    id, first_name, last_name, number, age
  INTO result
  FROM users
  WHERE age > 20;
```

### Combining Multiple Transformations:
Under the `sql` key, you can sequence various transformation statements, each exposing its own distinct result via individual `INTO` clauses:

```yaml
sql: |
  SELECT * 
  INTO result_1 
  FROM trips
  JOIN users ON users.id = trips.customer_id;

  SELECT 
    id, first_name, last_name, number, age
  INTO result_2
  FROM users
  WHERE age > 20;

  SELECT COUNT(*)
  INTO result_3
  FROM trips
  GROUP BY region;
```

For additional details and available SQL functions, consult the [SQL Functions Guide](/transforming-data).

### External SQL Files

For better organization, especially when dealing with a multitude of complex transformations, it's possible to save your SQL transformations in separate files. Simply place these `*.sql` files under the `./queries` directory.

For instance, if you have a transformation stored in `basic.sql`:

```sql
-- File: ./queries/basic.sql

SELECT 
  region, COUNT(*)
INTO regional_counts
FROM trips
GROUP BY region;
```
Dozer will automatically recognize and load all SQL files in this directory, integrating their results into the overall data pipeline.

## API Endpoints
API endpoints in Dozer allow you to expose both gRPC and REST APIs for seamless data access. In this section, you can define the endpoint names, paths, and associate them with data sources or transformed results.

### Basic Endpoint Configuration

Endpoints can be tied directly to a source or to an SQL-transformed result. Here are some examples:

```yaml
endpoints:
  # Exposing API directly from a source
  - name: trips
    path: /trips
    table_name: trips

  # Exposing SQL-transformed results
  - name: result
    path: /result
    table_name: result
    
  - name: result_3
    path: /result_3
    table_name: result_3
```

### Indexes

Indexes help optimize the speed and efficiency of queries. You can define primary, secondary, or full-text indexes based on your needs.

#### Primary Indexes
You can explicitly define primary indexes for your tables. However, it's important to note that when your SQL transformations include a `GROUP BY` clause, primary indexes are automatically set based on the field names within that `GROUP BY` clause. This ensures optimal querying performance on aggregated data.

```yaml
endpoints:
  - name: result_3
    path: /result_3
    table_name: result_3
    index:
      primary:
        - region
```

#### Secondary and Full-Text Indexes

For more complex querying capabilities, consider adding secondary or full-text indexes:

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

When structuring your indexes, always consider your application's querying needs and performance requirements.

## Global settings
These settings can be specified at the root of the `dozer-config.yaml` file to define global configurations for your Dozer application.

#### Example
```yaml
app_buffer_size: 50000
commit_size: 100
home_dir: ./.dozer_custom
...
```

| Property                               | Details                                                                                  | Type                       | Default Value                   | Example                              |
|----------------------------------------|------------------------------------------------------------------------------------------|----------------------------|---------------------------------|--------------------------------------|
| `app_buffer_size`                      | Pipeline buffer size                                                                     | Integer                    | 20000                           | `app_buffer_size: 50000`             |
| `commit_size`                          | The maximum number of CDC events that can be sent by a source before triggering a commit | Integer                    | 10000                           | `commit_size: 100`                   |
| `commit_timeout`                       | Commit timeout in milliseconds                                                           | Integer                    | 50                              | `commit_timeout: 1000`               |
| `log_entry_max_size`                   | Max number of operations in one log entry                                                | Integer                    | 100000                          | `log_entry_max_size: 100000`         |
| `log_max_num`<br/>`_immutable_entries` | Max number of immutable entries                                                          | Integer                    | 100                             | `log_max_num_immutable_entries: 100` |
| `log_storage`                          | The storage to use for the log                                                           | LogStorage (Internal Type) | Local Storage                   | `log_storage: !S3`                   |
| `error_threshold`                      | How many errors we can tolerate before bringing down the app                             | Integer                    | 0                               | `error_threshold: 10`                |
| `home_dir`                             | Home directory of dozer application                                                      | String                     | `./.dozer`                      | `home_dir: ./.dozer`                 |
| `cache_dir`                            | Cache directory of dozer application                                                     | String                     | ` ./.dozer/cache`               | `cache_dir: ./.dozer/cache`          |
| `cache_max_map_size`                   | Maximum map size that cache allows for pipeline processing                               | Integer                    | 1073741824 (1024 * 1024 * 1024) | `cache_max_map_size: 8589934592`     |
