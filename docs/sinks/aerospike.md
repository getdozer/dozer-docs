---
description: Replicate data from your sources to Aerospike.
---

# Aerospike


### Configuration

First of all, we need to define an Aerospike connection which can then be used as a sink. To add an Aerospike connection, add the following configuration block to `dozer-config.yaml`:

```yaml
connections:
  - config: !Aerospike
      hosts: localhost:3000
      namespace: test
      sets:
       - customers
       - transactions

    name: aerospike
```

The following configuration block can be used in `dozer-config.yaml` to define a new Aerospike sink:

```yaml
sinks:
  - table_name: transactions
    config: !Aerospike
      connection: aerospike 
      namespace: test
      set_name: transactions
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `connection`             | String               | The corresponding connection for Aerospike which is being used as a destination                                                                                                                                                                 |
| `namespace`         | String               | The namespace for your Aerospike connection where you want the record to live.                                                                                                                  |
| `set_name`             | String | The set within the namespace for the destination record.                                                                                                                                                                              |


Additionally, Dozer also allows you to denormalize the destination data in Aerospike, allowing for faster read operations.

With denormalization, you can combine tables that were previously seperated. This can be useful when you have a table with a lot of reads and you want to avoid joins. In essence, it is like a left-join, so the below example is equivalent to the following SQL query:

```sql
SELECT t.*, c.PHONE_NUMBER 
FROM transactions AS t 
LEFT JOIN customers AS c ON t.CUSTOMER_ID = c.PK -- PK being the aerospike key here
```

Example:

```yaml
sinks:
  - table_name: transactions
    config: !Aerospike
      connection: aerospike 
      namespace: test
      set_name: transactions
      denormalize:
        - from_namespace: test
          from_set: customers
          key: CUSTOMER_ID
          columns:
            - PHONE_NUMBER
```

You can enable denormalization by adding the `denormalize` parameter to the sink configuration. The `denormalize` parameter is a list of denormalization rules to apply to the data before writing it to the destination. Each rule is a dictionary with the following parameters:

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `from_namespace`             | String               | The namespace for the source record.                                                                                                                                                                 |
| `from_set`         | String               | The set within the namespace for the source record.                                                                                                                  |
| `key`             | String | The key to use to join the source and destination records.                                                                                                                                                                              |
| `columns`             | List | A list of columns to copy from the source record to the destination record.                                                                                                                                                                              |







