# Object Stores

The Dozer Object Store Connector is designed to be versatile, working seamlessly with various object storage systems, including Amazon S3, Azure Blob Store, and Google Cloud Storage. This versatility extends to support different data formats like CSV and Parquet, offering users the flexibility to choose the format that best fits their use case.

The configuration of the Object Store Connector includes various parameters related to the connection to these storage systems. This allows for fine-tuning based on the specifics of your storage system and network setup. Moreover, Dozer allows you to define multiple tables within a single object store configuration, with the possibility of each table using a different file format. 

## Storage Types

The Object Store connector supports the following storage types: Local Storage and AWS S3. Setting the `config` parameter to the corresponding storage type will allow you to connect to the storage system of your choice.

### Local Storage

The Local Storage connector is used to connect to a local file system, and use it as a source for data ingestion, like any other Object Store.

#### Configuration

The following configuration block can be used in `dozer-config.yaml` to define a new local storage connection:

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

* **path**: the path to the local storage folder.
* **tables**: a list of tables to be ingested from the local storage. see Formats section for more details.

### AWS S3

The AWS S3 connector is used to connect to an S3 bucket, and use it as a source for data ingestion.

#### Configuration

The following configuration block can be used in `dozer-config.yaml` to define a new S3 connection:

```yaml
connections:
  - name: s3
    config: !S3Storage
      details:
        access_key_id: {{AWS_ACCESS_KEY_ID}}
        secret_access_key: {{AWS_SECRET_ACCESS_KEY}}
        region: {{AWS_REGION}}
        bucket_name: {{AWS_BUCKET_NAME}}
      tables:
        ...
```

#### Parameters

* **access_key_id**: the access key id of the AWS account.
* **secret_access_key**: the secret access key of the AWS account.
* **region**: the region of the S3 bucket.
* **bucket_name**: the name of the S3 bucket.
* **tables**: a list of tables to be ingested from the local storage. see Formats section for more details.


<!-- 
### Google Cloud Storage


#### Configuration
```yaml
connections:
  - name: GCS
    config: !GCPStorage
      details:
        account: {{SERVICE_ACCOUNT_PATH}}
        bucket: {{GCP_BUCKET_NAME}}
      tables:
        ...
```

### Azure Blob Storage

#### Configuration

```yaml
connections:
  - name: sample_connector
    config: !AzureStorage
      details:
        connection_string: {{AZURE_CONNECTION_STRING}}
        container_name: {{AZURE_CONTAINER_NAME}}
      tables:
        ...
```
-->


