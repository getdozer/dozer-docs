# Parquet

Apache Parquet is a columnar storage file format available to any project in the Hadoop ecosystem. It provides efficient data compression and encoding schemes with enhanced performance to handle complex data in bulk.

## Configuration

```yaml
-  !Table
    name: trips
    config: !Parquet
        path: {{file_path}}   
        extension: .parquet
```


#### Parameters

* **path**: the path to the folder containing the Parquet files.
* **extension**: the extension of the Parquet files.