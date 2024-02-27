---
description: Connects to Oracle Database
---

# Oracle


### Configuration
The following configuration block can be used in `dozer-config.yaml` to define a new Oracle connection:

```yaml
connections:
  - config: !Oracle
      user: DOZER
      password: abcd1234
      host: database-1.xyz.rds.amazonaws.com
      port: 1521
      sid: ORCL
      replicator: !LogMiner
        poll_interval_in_milliseconds: 1000
    name: oracle
```

### Parameters

| **Parameter Name** | **Type** | **Description** | 
|--------------------|----------|-----------------|
| `user` | String | The username required for authenticating the user's access to the Oracle instance. |
| `password` | String | The password corresponding to the above username, required for secure authentication to the Oracle instance. |
| `host` | String | The hostname or IP address of the Oracle instance. |
| `port` | Integer | The specific port on which the Oracle service is running. By default, Oracle uses port 1521 for communication. |
| `sid` | String | The System Identifier (SID) of the Oracle instance. |
|  `pdb` | String (Optional) | Only needed if using a pluggable database.
| `schemas` | List Of Strings | The schemas to consider when listing tables. If empty, will list all schemas, which can be slow.
| `batch_size` | Integer (Optional) | Batch Size during snapshotting. Default is 100k .
| `replicator` | Object | The replicator configuration for Oracle. |


The replicator configuration for Oracle can be one of the following:

1. `LogMiner`: This configuration uses Oracle's LogMiner to query the redo logs of the Oracle database at fixed intervals to capture changes. 
2. `DozerLogReader` ( Coming Soon ! ): This replicator uses Dozer's LogReader to capture changes from the Oracle database.

### Replicator Parameters (LogMiner)

| **Parameter Name** | **Type** | **Description** |
|--------------------|----------|-----------------|
| `poll_interval_in_milliseconds` | Integer | The interval in milliseconds at which the LogMiner replicator polls for changes in the Oracle database. |

