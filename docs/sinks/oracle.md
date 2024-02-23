---
description: Replicate data from your sources to Oracle Database.
---

# Oracle


### Configuration

To start, define a new connection to Oracle in your `dozer-config.yaml` file using the steps outlined [here](../sources/oracle.md).

Thereby, the following configuration block can be added to define a new Oracle sink:

```yaml
sinks:
  - table_name: transactions
    config: !Oracle
      connection: oracle 
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `connection`             | String               | The corresponding connection for Oracle which is being used as a destination                                                                                                                                                                 |
