---
description: Replicate data from your sources to ClickHouse.
---

# ClickHouse


### Configuration


The following configuration block can be used in `dozer-config.yaml` to define a new ClickHouse sink. This configuration is designed to replicate data from a table named `source_table` from the source, to the table named `sink_table` in the ClickHouse database.

```yaml

sinks:
  - name: destination
    config: !Clickhouse
        database_url: http://localhost:8123
        user: default
        password: default
        database: default
        sink_table_name: sink_table
        source_table_name: source_table
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `database_url` | String | The URL for the ClickHouse database. |
| `user`             | String               | The username required for authenticating the user's access to the Clickhouse instance.                                                                                                                                                          |
| `password`         | String               | The password corresponding to the above username, required for secure authentication to the Clickhouse instance.                                                                                                       |
| `database` | String | The name of the destination database in ClickHouse .                                                                                                                                                      |
| `sink_table_name`             | String | The name of the destination table in the ClickHouse database.                                                                                                                                                                              |
| `source_table_name`         | String | The name of the source table in the source database.                                                                                                       |
| `primary_keys` | List (Optional) | A list of columns to be used as primary keys for the destination table.                                                                                                                                                                          |
| `create_table_options` | List (Optional) | A list of [settings to be used to create the destination table](#destination-table-options) in Clickhouse.                                                                                                                                                                              |





### Destination Table Options

- engine: Default is `MergeTree`.
- partition_by
- order_by
- sample_by
- cluster

For more information on these parameters refer to the [ClickHouse MergeTree docs](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree#mergetree-query-clauses).



