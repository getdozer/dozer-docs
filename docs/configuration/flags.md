# Global Parameters and Flags

## Settings
These settings can be specified at the root of the `dozer-config.yaml` file to define global configurations for your Dozer application.

#### Example
```yaml
app_buffer_size: 50000
commit_size: 100
home_dir: ./.dozer_custom
...
```

#### `app_name`
Determines the name of the Dozer application.  
**Type**: String 

#### `app_name`
Determines the version of the Dozer application.  
**Type**: Integer 

#### `cache_dir`
Determines the directory where Dozer will save its cache.  
**Type**: String | **Default**: `./.dozer/cache`  

#### `cache_max_map_size`
Optional setting denoting the maximum size, in bytes, of the cache lmdb map.  
**Type**: Integer | **Default**: `1073741824`  

#### `app_buffer_size`
Optional parameter specifying the buffer size for Dozer's application processes.  
**Type**: Integer | **Default**: `20000`  

#### `commit_size`
Optional parameter defining the maximum number of events that can be sent before triggering a commit.  
**Type**: Integer | **Default**: `10000`  

#### `commit_timeout`
Optional parameter setting the timeout duration, in milliseconds, for commits.  
**Type**: Integer | **Default**: `50`  

#### `file_buffer_capacity`
Optional parameter indicating the buffer capacity, in bytes, for the Log Writer.  
**Type**: Integer | **Default**: `1073741824`  

#### `err_threshold`
Optional setting determining the error threshold. Exceeding this number would terminate the process.
**Type**: Integer | **Default**: `0`  

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



