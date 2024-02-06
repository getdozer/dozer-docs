# Sinks
The endpoint configuration defines how Dozer should expose gRPC/REST endpoints. Each endpoint can be individually tailored to handle potential conflicts, routes, and indexing mechanisms.

```yaml
endpoints:
  - table_name: trips_cache
    config: !Aerospike
```

### Parameters
| Name                  | Type         | Description                                                                                                                         |
|-----------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `table_name`          | String       | Name of the table in source database                                                              
| `config`                | String       | Determines the sink used for the endpoint. For example, `!Dummy`, `!Aerospike` , `!Clickhouse`                                   |                                      

Each sinks typically requires additional parameters:
* Database
* Connection String

For a comprehensive list of supported sinks and their configurations, refer to [Dozer's supported sinks documentation](/category/sinks).



## Conflicts Resolution
The `conflict_resolution` section outlines the strategies to handle potential data conflicts within a Dozer endpoint. This section is optional.

```yaml
conflict_resolution:
  on_insert: !Update
  on_update: !Upsert
  on_delete: !Nothing
```

### Parameters
| Parameter   | Description                                                                                       | Options       |
|-------------|---------------------------------------------------------------------------------------------------|---------------|
| `on_insert` | Defines the action to be taken when a conflict arises during an insert operation.                  | `!Update`, `!Panic`, `!Nothing`  |
| `on_update` | Specifies the action to be taken when a conflict is detected during an update operation.           | `!Upsert`, `!Panic`, `!Nothing`  |
| `on_delete` | Designates the action to undertake when a conflict is perceived during a delete operation.         | `!Panic`, `!Nothing`             |

- `!Update`: This will result in an update of the conflicting record.
- `!Upsert`: If the record exists, it'll be updated; otherwise, a new record will be inserted.
- `!Panic`: The operation will stop immediately, and an error will be flagged.
- `!Nothing`: The operation will be ignored.


