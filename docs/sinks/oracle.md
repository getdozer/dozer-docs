---
description: Replicate data from your sources to Oracle Database.
---

# Oracle


### Configuration

To start, define a new connection to Oracle in your `dozer-config.yaml` file using the steps outlined [in the Oracle Connection configuration](../sources/oracle.md).

The following configuration block can be included to establish a new Oracle sink. This configuration is designed to replicate data from a table named `transactions` to a table with an identical name in the Oracle database, previously defined in connections with the name `oracle_connection`.

```yaml
sinks:
  - name: transactions
    config: !Oracle
      connection: oracle_connection
      table_name: transactions 
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `connection`             | String               | The corresponding connection for Oracle which is being used as a destination                                                                                                                                                                 |
| `table_name`         | String               | The name of the table in the source database.                                                                                                       |

