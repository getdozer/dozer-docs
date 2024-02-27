---
description: Replicate data from your sources to ClickHouse.
---

# ClickHouse


### Configuration


The following configuration block can be used in `dozer-config.yaml` to define a new ClickHouse sink:

```yaml

sinks:
  - table_name: destination
    config: !Clickhouse
        database_url: http://localhost:8123
        user: default
        password: default
        database: default
        sink_table_name: sink_table
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `database_url` | String | The URL for the ClickHouse database. |
| `user`             | String               | The username required for authenticating the user's access to the Clickhouse instance.                                                                                                                                                          |
| `password`         | String               | The password corresponding to the above username, required for secure authentication to the Clickhouse instance.                                                                                                       |
| `database` | String | The name of the destination database in ClickHouse .                                                                                                                                                      |
| `sink_table_name`             | String | The name of the destination table in the ClickHouse database.                                                                                                                                                                              |
| `primary_keys` | List (Optional) | A list of columns to be used as primary keys for the destination table.                                                                                                                                                                          |
| `create_table_options` | List (Optional) | A list of settings to be used to create the destination table in Clickhouse.                                                                                                                                                                              |




Dozer allows you to create destination tables in Clickhouse using custom settings such as the ones mentioned below. These are a part of `create_table_options` parameter in the sink configuration.



### Destination Table Options

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `engine`             | String               | The table engine of the destination table. Default is `MergeTree`                                                                                                                                                     |
| `partition_by`         | String               | The partition key for the destination table.                                                                                                                  |
| `order_by`             | List Of Strings | The sorting key. A tuple of column names or arbitrary expressions. The key used to sort the data in the destination table.                                                                                                                                                                             |
| `sample_by`            | String | The sampling expression for destination table. If a sampling expression is used, the primary key must contain it.                                                                                                                                                                              |
| `cluster` | String | The name of the cluster.                                                                                                                                                                              |


