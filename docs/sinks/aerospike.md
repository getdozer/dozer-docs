---
description: Replicate data from your sources to Aerospike.
---

# Aerospike


### Configuration

First of all, we need to define an Aerospike connection in our `dozer-config.yaml` which can then be used as a sink. 

An Aerospike connection configuration has the following parameters.

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hosts`             | String               | The host and port of the Aerospike server.                                                                                                                                                                 |
| `namespace`         | String               | The namespace for your Aerospike connection.                                                                                                                  |
| `sets`             | List | A list of sets within the namespace.                                                                                                                                                                              |
| `replication` | Object (Optional) | [Server configuration](#replication-parameters) for receiving replication messages from Aerospike during ingestion.                                                                                                                                                                           


#### Replication Parameters

- `server_address`:
  
  The address of the server used to receive replication messages from Aerospike. Default is `0.0.0.0.0`.
- `server_port`:
  
   The port of the server. Default is `5929`.


Example:

```yaml
connections:
  - config: !Aerospike
      hosts: localhost:3000
      namespace: test
      sets:
       - customers
       - transactions

    name: aerospike
```



After an Aerospike connection has been setup,the following configuration block can be used in `dozer-config.yaml` to define a new Aerospike sink.

 This particular configuration is designed to replicate data from a table named `transactions` from the source, to the set `transactions` within the `test` namespace (after denormalisation) in the Aerospike connection referenced by the name `aerospike`.


#### Example:

```yaml
sinks:
  - name: transactions
    config: !Aerospike
      connection: aerospike 
      tables: 
        - namespace: test
          set_name: transactions
          source_table_name: transactions
          denormalize:
            - from_namespace: test
              from_set: customers
              key: CUSTOMER_ID
              columns:
                - PHONE_NUMBER
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `connection`             | String               | The corresponding connection for Aerospike which is being used as a destination                                                                                                                                                                 |
| `tables`         | List               | List of tables to write to on destination sink. Parameters for [table configuration](#table-parameters).                                                                                                     |
| `n_threads`             | Integer | The maximum number of threads to spawn to write to Aerospike sink.                                                                                                                                                                              |

#### Table Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `namespace`             | String               | The namespace for the table.                                                                                                                                                                            |
| `set_name`             | String               | The set within the namespace for the table.                                                                                                                                                                              |
| `source_table_name`             | String | The name of the table in the source database.                                                                                                                                                                              |
| `denormalize`             | List | A [list of denormalization rules](#denormalisation-parameters) to apply to the data before writing it to the destination.




#### Denormalisation Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `from_namespace`             | String               | The namespace for the source record.                                                                                                                                                                 |
| `from_set`         | String               | The set within the namespace for the source record.                                                                                                                  |
| `key`             | String | The key to use to join the source and destination records.                                                                                                                                                                              |
| `columns`             | List | A list of columns to copy from the source record to the destination record.                                                                                                                                                                              |

In essence, it is like a left-join, so the [example sink configuration](#example) is equivalent to the following SQL query:

```sql
SELECT t.*, c.PHONE_NUMBER 
FROM transactions AS t 
LEFT JOIN customers AS c ON t.CUSTOMER_ID = c.PK -- PK being the aerospike key here
```









