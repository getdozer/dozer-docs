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

- Use `[]` to indicate an empty list
- Use `null` to indicate a null value
- Use `true` and `false` as only options on boolean fields

## Parent Level Properties

- `app_name` 
- `connections`
- `sources`
- `endpoints`
