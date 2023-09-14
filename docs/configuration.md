# Configuration
Dozer relies on a YAML configuration structure delineated in `dozer-config.yaml`. This file serves as the backbone for specifying connectors, data sources, SQL transformations, API endpoints, and other critical characteristics of your application.

## Location and Naming
`dozer-config.yaml` must reside in the root directory of a Dozer application. Alternative filenames can be utilized but must be declared using the `-c` or `--config-path` option when executing the `dozer run` command. Additionally, the file can be loaded from standard input and passed as input to `dozer run` using a pipe.


## Key Properties
`dozer-config.yaml` has multiple key sections:

| Property    | Description                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------|
| [Connections and Sources](configuration/data-sources) | Details the array of various database, data wareshouses or any other type of connection and their tables.  |
| [Transformations](configuration/transformations)       | Describes the transformations applied to the sourced data.                                                   |
| [Endpoints](configuration/api-endpoints) | Establishes API endpoints, determining how data access and queries are managed.                                  |
| [Other Settings](configuration/other) | Any additional configuration like API ports configurations, API security, etc.                                 |
| [Global Parameters and Flags](configuration/flags) | Enables or disables specific options or feature                                  |




