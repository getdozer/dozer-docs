# Configuration
Dozer relies on a YAML configuration structure delineated in `dozer-config.yaml`. This file serves as the backbone for specifying connectors, data sources, SQL transformations, API endpoints, and other critical characteristics of your application.

## Location and Naming
`dozer-config.yaml` must reside in the root directory of a Dozer application. Alternative filenames can be utilized but must be declared using the `-c` or `--config-path` option when executing the `dozer` command.

## Key Properties
`dozer-config.yaml` has multiple key sections:

| Property    | Mandatory | Description                                                                                                     |
|-------------|-----------|-----------------------------------------------------------------------------------------------------------------|
| [`connections`](configuration/data-sources) | Yes    | Details the array of various database, data wareshouses or any other type of connection.                                                              |
| [`sources`](configuration/data-sources)   | Yes        | Denotes tables and associated data streams from the designated connections.                                      |
| [`sql`](configuration/transformations)       | No        | Describes the SQL transformations applied to the sourced data.                                                   |
| [`endpoints`](configuration/api-endpoints) | Yes       | Establishes API endpoints, determining how data access and queries are managed.                                  |

In addition to the above, there are multiple configurations sections. Check the details below:
    - [Other Settings](configuration/other)
    - [Global Parameters and Flags](configuration/flags)




