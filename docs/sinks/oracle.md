---
description: Replicate data from your sources to Oracle Database.
---

# Oracle


### Configuration


The following configuration block can be used in `dozer-config.yaml` to define a new Oracle sink:

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
