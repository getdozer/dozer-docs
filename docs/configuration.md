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

## Parent Level Properties

| Property          | Type   | Mandatory | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------------|--------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`app_name`**    | String | true      | `app_name: dozer-application`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`connections`** | Array  | true      | `connections: ` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`- config: !Postgres` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`user: "{{PG_USER}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`password: "{{PG_PASSWORD}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`host: "{{PG_HOST}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`port: 5432`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`database: "{{PG_DB}}"`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name: pg` |
| **`sources`**     | Array  | false     | `sources: ` <br/>&nbsp;&nbsp;&nbsp;&nbsp;`- name: zones` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`table_name: zones` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`connection: pg`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`sql`**         | String | false     | `sql: SELECT * FROM trips`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`endpoints`**   | Array  | true      | `endpoints: `<br/>&nbsp;&nbsp;&nbsp;&nbsp;`- name: trips` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`path: /trips` <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`table_name: trips`                                                                                                                                                                                                                                                                                                                                                                                                                                        |

