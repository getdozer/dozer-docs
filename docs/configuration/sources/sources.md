# Data Sources

| Connector                                                                       |   Status    | Type           |  Schema Mapping   | Frequency | Implemented Via |
|:--------------------------------------------------------------------------------|:-----------:|:---------------|:-----------------:|:----------|:----------------|
| [Postgres](/docs/configuration/sources/postgres)                                | Available ✅ | Relational     |      Source       | Real Time | Direct          |
| [Snowflake](/docs/configuration/sources/snowflake)                              | Available ✅ | Data Warehouse |      Source       | Polling   | Direct          |
| [Local Files (CSV, Parquet)](/docs/configuration/sources/object-stores)         | Available ✅ | Object Storage |      Source       | Polling   | Data Fusion     |
| [Ethereum](/docs/configuration/sources/ethereum)                                | Available ✅ | Blockchain     | Logs/Contract ABI | Real Time | Direct          |
| [Kafka Stream](/docs/configuration/sources/kafka)                               | Available ✅ |                |  Schema Registry  | Real Time | Debezium        |
| [MySQL](/docs/configuration/sources/mysql)                                      | Available ✅ | Relational     |      Source       | Real Time | Debezium        |
| [Delta Lake](/docs/configuration/sources/object-stores/formats/deltalake)       |    Alpha    | Data Warehouse |      Source       | Polling   | Direct          |
| [AWS S3 (CSV, Parquet)](/docs/configuration/sources/object-stores/types/aws-s3) |    Alpha    | Object Storage |      Source       | Polling   | Data Fusion     |
| Google Cloud Storage(CSV, Parquet)                                              | In Roadmap  | Object Storage |      Source       | Polling   | Data Fusion     |
| Google Sheets                                                                   | In Roadmap  | Applications   |      Source       |           |                 |
| Excel                                                                           | In Roadmap  | Applications   |      Source       |           |                 |
| Airtable                                                                        | In Roadmap  | Applications   |      Source       |           |                 |
