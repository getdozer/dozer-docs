# Object Stores
In Dozer, object store connectors provide interfaces to different data storage solutions. A fundamental component of these connectors is the `tables` attribute, which denotes specific datasets or collections within the storage. Through these table configurations, Dozer enables a modular approach, allowing various storage mediums to be paired with distinct data formats.

Consider the example:

```yaml
  - name: local_dataset
    config: !LocalStorage
      details:
        path: /tmp/data
      tables:
        -  !Table
             name: zones
             config: !CSV
             path: {{file_path}} 
             extension: .csv
             marker_file: true
             marker_extension: .marker
```

Here, `local_dataset` represents a connector for local storage. Within it, the `zones` table is defined to use the CSV format, illustrating Dozer's flexibility in combining storages, such as `LocalStorage`, with data formats like `CSV`.

## Storage Types

### Local Storage
The Local Storage connector is used to connect to a local file system, and use it as a source for data ingestion, like any other Object Store.

```yaml
connections:
  - name: local_dataset
    config: !LocalStorage
      details:
        path: /tmp/data
      tables:
        ...
    
```

#### Parameters
| Name   | Type | Description                                                                                     |
|--------|------|-------------------------------------------------------------------------------------------------|
| `path` | Path | The path to the local storage folder.                                                           |
| `tables` | List | A list of tables to be ingested from the local storage. Refer to the [File Formats](#file-formats) section for more details. |

### AWS S3
The AWS S3 connector is used to connect to an S3 bucket, and use it as a source for data ingestion.

```yaml
connections:
  - name: local_dataset
    config: !LocalStorage
      details:
        path: /tmp/data
      tables:
        ...    
```
#### Parameters
| Name                | Type   | Description                                                                                                 |
|---------------------|--------|-------------------------------------------------------------------------------------------------------------|
| `access_key_id`     | String | The access key id of the AWS account.                                                                       |
| `secret_access_key` | String | The secret access key of the AWS account.                                                                   |
| `region`            | String | The region of the S3 bucket.                                                                                |
| `bucket_name`       | String | The name of the S3 bucket.                                                                                  |
| `tables`            | List   | A list of tables to be ingested from the S3 bucket. Refer to the [File Formats](#file-formats) section for more details. |



## File Formats

### CSV
The Dozer CSV reader operates in an "append" mode, continually monitoring a specified directory for new CSV files. Upon detecting new files, it triggers an automatic ingestion process. To enhance the ingestion control, there's a "marker file" mechanism. If this feature is active, a new CSV file will only be ingested if a corresponding marker file is also present in the directory. This ensures deliberate and controlled data ingestion.

```yaml
-  !Table
    name: zones
    config: !CSV
        path: {{file_path}} 
        extension: .csv
        marker_file: true
        marker_extension: .marker
```

#### Parameters
| Name               | Type      | Description                                                                                                                       |
|--------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `path`             | String    | The path to folder containing CSV files.                                                                                                         |
| `extension`        | String    | The extension of the CSV file.                                                                                                    |
| `marker_file`      | Boolean   | Optional. Indicates whether to require marker files for ingestion. If `true`, only files with corresponding marker files are ingested. |
| `marker_extension` | String    | Optional. The extension of the marker files. Only relevant if `marker_file` is set to `true`.                                     |


### Parquet
The Dozer Parquet reader operates in an "append" mode, continually monitoring a specified directory for new Parquet files. Upon detecting new files, it triggers an automatic ingestion process. To enhance the ingestion control, there's a "marker file" mechanism. If this feature is active, a new Parquet file will only be ingested if a corresponding marker file is also present in the directory. This ensures deliberate and controlled data ingestion.

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
| Name               | Type      | Description                                                                                                                             |
|--------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `path`             | String    | The path to the folder containing the Parquet files.                                                                                   |
| `extension`        | String    | Optional. The extension of the Parquet files.                                                                                          |
| `marker_file`      | Boolean   | Optional. Indicates whether to require marker files for ingestion. If `true`, only files with corresponding marker files are ingested.   |
| `marker_extension` | String    | Optional. The extension of the marker files. Only relevant if `marker_file` is set to `true`.                                           |




