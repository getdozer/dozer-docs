# Configuration
Dozer relies on a YAML configuration structure delineated in `dozer-config.yaml`. This file serves as the backbone for specifying connectors, data sources, SQL transformations, API endpoints, and other critical characteristics of your application.

## Location and Naming
`dozer-config.yaml` must reside in the root directory of a Dozer application. Alternative filenames can be utilized but must be declared using the `-c` or `--config-path` option when executing the `dozer` command.

## Key Properties

| Property    | Mandatory | Description                                                                                                     |
|-------------|-----------|-----------------------------------------------------------------------------------------------------------------|
| `app_name`  | Yes       | Sets the unique name of the Dozer application.                                                                  |
| [`connections`](#connections) | Yes    | Details the array of various database connections.                                                              |
| [`sources`](#sources)   | Yes        | Denotes tables and associated data streams from the designated connections.                                      |
| [`sql`](#sql-transformations)       | No        | Describes the SQL transformations applied to the sourced data.                                                   |
| [`endpoints`](#api-endpoints) | Yes       | Establishes API endpoints, determining how data access and queries are managed.                                  |
| [`settings > app`](#app-settings) | No       | All APP related settings                                  |
| [`settings > api`](#api-settings) | No       | All API related settings                                  |

For an in-depth breakdown of each property, consult the associated sections.




