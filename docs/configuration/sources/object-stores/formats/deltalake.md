# DeltaLake

Delta Lake is an open-source storage layer that brings ACID (Atomicity, Consistency, Isolation, Durability) transactions to Apache Spark and big data workloads. 


## Configuration

```yaml
- !Table
  name: delta
  config: !Delta
      path: {{delta_table_folder_path}}
```


#### Parameters

* **path**: the path to the Delta table folder.