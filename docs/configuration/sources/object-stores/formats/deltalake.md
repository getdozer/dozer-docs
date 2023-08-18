# DeltaLake

Delta Lake is an open-source storage layer that brings ACID (Atomicity, Consistency, Isolation, Durability) transactions to Apache Spark and big data workloads. 


## Configuration

The following configuration block can be used in `dozer-config.yaml`, as a table parameter of an Object Store connector, to define a new table using Delta files:

```yaml
- !Table
  name: delta
  config: !Delta
      path: {{delta_table_folder_path}}
```


## Parameters

* **path**: the path to the Delta table folder.