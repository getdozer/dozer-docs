# Parquet

Apache Parquet is a columnar storage file format available to any project in the Hadoop ecosystem. It provides efficient data compression and encoding schemes with enhanced performance to handle complex data in bulk.

## Configuration

```yaml
-  !Table
    name: trips
    config: !Parquet
        path: {{file_path}}   
        extension: .parquet
        marker_file: true
        marker_extension: .marker
```


#### Parameters

* **path**: the path to the folder containing the Parquet files.
* **extension** (optional): the extension of the Parquet files.
* **marker_file** (optional): a boolean value indicating whether to use marker files or not. If set to true, the connector will only ingest files for which exists a marker file with the same name and the marker extension. If set to false, the connector will ingest all files in the folder.
* **marker_extension** (optional): the extension of the marker files. This parameter is only used if marker_file is set to true.