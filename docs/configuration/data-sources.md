# Data Sources

## Connections

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

## Sources

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