# Configuration

## Dozer Configuration YAML file

Dozer uses the YAML syntax for configuration. The `dozer-config.yaml`
file created when you run `dozer init` is a YAML configuration file in the root directory of a project which lets you define connectors, sources, sql, endpoints, and other properties for the dozer application and the packages and functions within it.

The structure of the information in `dozer-config.yaml` is aligned with the structure of your application.

### Format
The file format is based on the YAML spec. The file must be on the root directory of the repository unless you specify the configuration location path with `-c` or `--config-path` option in your command, and be named as:

- `dozer-config.yaml` (default)
- `dozer-config.yml`
- or any other names are fine, but you need to you specify the path including file name with `-c` or `--config-path` option in your command

### Conventions
The spec of the configuration file must use these conventions.

- Use **`[]`** to indicate an empty list
- Use **`null`** to indicate a null value
- Use **`true`** and **`false`** as only options on boolean fields

## Main Properties

| Property          | Type   | Mandatory | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------------|--------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`app_name`**    | String | true      | `app_name: dozer-application`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`connections`** | Array  | true      | `connections: ` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`- config: !Postgres` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`user: "{{PG_USER}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`password: "{{PG_PASSWORD}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`host: "{{PG_HOST}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`port: 5432`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`database: "{{PG_DB}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name: pg` |
| **`sources`**     | Array  | false     | `sources: ` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`- name: zones` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`table_name: zones` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`connection: pg`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`sql`**         | String | false     | `sql: SELECT * FROM trips`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`endpoints`**   | Array  | true      | `endpoints: `<br/>&nbsp;&nbsp;&nbsp;&nbsp;`- name: trips` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`path: /trips` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`table_name: trips`                                                                                                                                                                                                                                                                                                                                                                                                                                        |


## Optional Application Properties

### **`app_buffer_size`**

| Details              | Type    | Default Value | Example                  |
|----------------------|---------|---------------|--------------------------|
| Pipeline buffer size | Integer | 20000         | `app_buffer_size: 50000` |

### **`commit_size`**

| Details     | Type    | Default Value | Example            |
|-------------|---------|---------------|--------------------|
| Commit size | Integer | 10000         | `commit_size: 100` |

### **`commit_timeout`**

| Details                        | Type    | Default Value | Example                |
|--------------------------------|---------|---------------|------------------------|
| Commit timeout in milliseconds | Integer | 50            | `commit_timeout: 1000` |

[//]: # ()
[//]: # (| Property                            | Type    | Example                                   | Remarks                                                                     |)

[//]: # (|-------------------------------------|---------|-------------------------------------------|-----------------------------------------------------------------------------|)

[//]: # (| **`commit_size`**                   | Integer | `commit_size: 100`                        | Commit size `[default: 10000]`                                              |)

[//]: # (| **`commit_timeout`**                | String  | `commit_timeout: 1000`                    | Commit timeout `[default: 50]`                                              |)

[//]: # (| **`log_entry_max_size`**            | String  | `log_entry_max_size: 100000`              | Max number of operations in one log entry `[default: 100000]`               |)

[//]: # (| **`log_max_num_immutable_entries`** | String  | `log_max_num_immutable_entries: ./.dozer` | `[default: 100]`                                                            |)

[//]: # (| **`log_storage`**                   | String  | `log_storage: ./.dozer`                   | The storage to use for the log                                              |)

[//]: # (| **`error_threshold`**               | String  | `error_threshold: ./.dozer`               | How many errors we can tolerate before bringing down the app `[default: 0]` |)

[//]: # (| **`home_dir`**                      | String  | `home_dir: ./.dozer`                      |                                                                             |)

[//]: # (| **`cache_dir`**                     | String  | `cache_dir: 8589934592`                   |                                                                             |)

[//]: # (| **`cache_max_map_size`**            | Integer | `cache_max_map_size: 8589934592`          |                                                                             |)
