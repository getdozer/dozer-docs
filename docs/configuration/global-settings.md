# Global Application Parameters

## Settings
These settings can be specified at the root of the `dozer-config.yaml` file to define global configurations for your Dozer application.

#### Example
```yaml
app_buffer_size: 50000
commit_size: 100
home_dir: ./.dozer_custom
...
```

#### `app_buffer_size`
Pipeline buffer size
- **Type**: Integer
- **Default Value**: 20000
- **Example**: `app_buffer_size: 50000`

#### `commit_size`
The maximum number of CDC events that can be sent by a source before triggering a commit
- **Type**: Integer
- **Default Value**: 10000
- **Example**: `commit_size: 100`

#### `commit_timeout`
Commit timeout in milliseconds
- **Type**: Integer
- **Default Value**: 50
- **Example**: `commit_timeout: 1000`

#### `log_entry_max_size`
Max number of operations in one log entry
- **Type**: Integer
- **Default Value**: 100000
- **Example**: `log_entry_max_size: 100000`

#### `log_max_num_immutable_entries`
Max number of immutable entries
- **Type**: Integer
- **Default Value**: 100
- **Example**: `log_max_num_immutable_entries: 100`

#### `log_storage`
The storage to use for the log
- **Type**: LogStorage (Internal Type)
- **Default Value**: Local Storage
- **Example**: `log_storage: !S3`

#### `error_threshold`
How many errors we can tolerate before bringing down the app
- **Type**: Integer
- **Default Value**: 0
- **Example**: `error_threshold: 10`

#### `home_dir`
Home directory of dozer application
- **Type**: String
- **Default Value**: `./.dozer`
- **Example**: `home_dir: ./.dozer`

#### `cache_dir`
Cache directory of dozer application
- **Type**: String
- **Default Value**: `./.dozer/cache`
- **Example**: `cache_dir: ./.dozer/cache`

#### `cache_max_map_size`
Maximum map size that cache allows for pipeline processing
- **Type**: Integer
- **Default Value**: 1073741824 (1024 * 1024 * 1024)
- **Example**: `cache_max_map_size: 8589934592`



## Flags
These flgs can be specified at the root of the `dozer-config.yaml` under the `flags` section, to enable or disable spefic features or functionalities.

#### Example
```yaml
flags:
    dynamic: true
    grpc_web: true
...
```

#### `dynamic`
Enables the Common GRPC endpoint. Defaults to `true`.

#### `grpc_web`
Enables HTTP 1.1 and web support for gRPC. This is required for web browser clients to connect to Dozer. Defaults to `true`.

#### `push_events`
Enables gRPC events streaming for all store insert, update and delete operations. Defaults to `true`.

#### `authenticate_server_reflection`
Enables authentication for gRPC server reflection. Defaults to `true`

#### `enable_probabilistic_optimizations`
Configurations to enable or disable probabilistic data structures to optimize memory usage at the potential expense of accuracy.

```yaml
flags:
  enable_probabilistic_optimizations:
    in_sets: true 
    in_joins: true 
    in_aggregations: true
```

- `in_sets`: Optimizes set operations (UNION, EXCEPT, INTERSECT) using probabilistic structures. Defaults to `false`.
- `in_joins`: Optimizes JOIN operations using probabilistic structures. Defaults to `false`.
- `in_aggregations`: Optimizes aggregations (SUM, COUNT, MIN, etc.) using probabilistic structures. Defaults to `false`.



