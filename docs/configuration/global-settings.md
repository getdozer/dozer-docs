# Global Settings
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
