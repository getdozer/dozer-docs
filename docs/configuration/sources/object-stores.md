# Object Stores

The Dozer Object Store Connector is designed to be versatile, working seamlessly with various object storage systems, including Amazon S3, Azure Blob Store, and Google Cloud Storage. This versatility extends to support different data formats like CSV and Parquet, offering users the flexibility to choose the format that best fits their use case.

The configuration of the Object Store Connector includes various parameters related to the connection to these storage systems. This allows for fine-tuning based on the specifics of your storage system and network setup. Moreover, Dozer allows you to define multiple tables within a single object store configuration, with the possibility of each table using a different file format. 

## Storage Types

### AWS S3
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

### Google Cloud Storage
```yaml
connections:
  - name: GCS
    config: !GCPStorage
      details:
        project_id: {{GCP_PROJECT_ID}}
        bucket: {{GCP_BUCKET_NAME}}
      tables:
        ...
```


### Azure Blob Storage