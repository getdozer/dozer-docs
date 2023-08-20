

# Connectors

| Connector                                                   |   Status    | Type           |  Schema Mapping   | Frequency | Implemented Via |
| :---------------------------------------------------------- | :---------: | :------------- | :---------------: | :-------- | :-------------- |
| [Postgres](#postgresql)                                       | Available ✅ | Relational     |      Source       | Real Time | Direct          |
| [Snowflake](#snowflake)                                     | Available ✅ | Data Warehouse |      Source       | Polling   | Direct          |
| [Local Files (CSV, Parquet)](#local-files)                  | Available ✅ | Object Storage |      Source       | Polling   | Data Fusion     |
| [Delta Lake](#deltalake)                                    |    Alpha    | Data Warehouse |      Source       | Polling   | Direct          |
| [AWS S3 (CSV, Parquet)](#aws-s3)                            |    Alpha    | Object Storage |      Source       | Polling   | Data Fusion     |
| [Google Cloud Storage(CSV, Parquet)](#google-cloud-storage) |    Alpha    | Object Storage |      Source       | Polling   | Data Fusion     |
| [Ethereum](#ethereum)                                       | Available ✅ | Blockchain     | Logs/Contract ABI | Real Time | Direct          |
| [Kafka Stream](#kafka-stream)                                                      | Available ✅  |          |  Schema Registry  | Real Time | Debezium        |
| [MySQL](#mysql)                                             | Available ✅ | Relational     |      Source       | Real Time | Direct        |
| Google Sheets                                               | In Roadmap  | Applications   |      Source       |           |                 |
| Excel                                                       | In Roadmap  | Applications   |      Source       |           |                 |
| Airtable                                                    | In Roadmap  | Applications   |      Source       |           |                 |


## PostgreSQL

> **Important:** Before using the PostgreSQL connector, please ensure that you've properly configured PostgreSQL's WAL and replication settings according to the [PostgreSQL prerequisites](https://github.com/getdozer/dozer/tree/main/dozer-ingestion/src/connectors/postgres#postgres-requirements) for Dozer.

```yaml
connections:
  - config: !Postgres
      user: postgres
      password: postgres
      host: localhost
      port: 5433
      database: banking
    name: banking
```
For a complete example of how to use the PostgreSQL connector with Dozer, please refer to the [PostgreSQL sample app](https://github.com/getdozer/dozer-samples/tree/main/connectors/postgres) in the [`dozer-samples`](https://github.com/getdozer/dozer-samples) repository. This sample app provides a detailed example of how to set up and use the PostgreSQL connector in a real-world scenario.

Additionally, you can explore the [PostgreSQL Flights use case sample](https://github.com/getdozer/dozer-samples/tree/main/usecases/pg-flights) for a practical application of the PostgreSQL connector in a specific use case.

## Snowflake
> **Note:** For Snowflake, dozer has to be built with the feature `snowflake` enabled.

```yaml
connections:
  - config: !Snowflake
      server: "{{SN_SERVER}}"
      port: 443
      user: "{{SN_USER}}"
      password: "{{SN_PASSWORD}}"
      database: "{{SN_DATABASE}}"
      schema: PUBLIC
      warehouse: "{{SN_WAREHOUSE}}"
      driver: "SnowflakeDSIIDriver"
    name: sn_data
```

## Local Files
```yaml
connections:
  - config : !LocalStorage
      details:
        path: data
      tables:
        - !Table
          name: trips
          prefix: /trips
          file_type: parquet
          extension: .parquet
    name: ny_taxi
```

For a complete example of how to use the LocalStorage connector with Dozer, please refer to the [LocalStorage sample app](https://github.com/getdozer/dozer-samples/tree/main/connectors/local-storage) in the [`dozer-samples`](https://github.com/getdozer/dozer-samples) repository. This sample app provides a detailed example of how to set up and use the LocalStorage connector in a real-world scenario.

## Ethereum
Ethereum exposes logs, traces and parsed smart contract events.
```yaml
app_name: dozer-eth-dashboard
connections:
  - config: !Ethereum
      provider: !Trace
        https_url: "{{ETH_HTTPS_URL}}"
        from_block: 1000000
        to_block:
        batch_size: 3
    name: eth_conn1
```
Logs
```yaml
  - config: !Ethereum
      provider: !Log
        filter:
          from_block:
          to_block:
          addresses:
          topics:
        wss_url: "{{ETH_WSS_URL}}"
    name: eth_conn2
```
Parse smart contracts
```yaml
- config: !Ethereum
      provider: !Log
        wss_url: "{{ETH_WSS_URL}}"
        contracts:
          - name: punks
            address: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb
            abi: >
              [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"punksOfferedForSale","outputs":[{"name":"isForSale","type":"bool"},{"name":"punkIndex","type":"uint256"},{"name":"seller","type":"address"},{"name":"minValue","type":"uint256"},{"name":"onlySellTo","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"}],"name":"enterBidForPunk","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"},{"name":"minPrice","type":"uint256"}],"name":"acceptBidForPunk","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addresses","type":"address[]"},{"name":"indices","type":"uint256[]"}],"name":"setInitialOwners","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"imageHash","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nextPunkIndexToAssign","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"punkIndexToAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"punkBids","outputs":[{"name":"hasBid","type":"bool"},{"name":"punkIndex","type":"uint256"},{"name":"bidder","type":"address"},{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"allInitialOwnersAssigned","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"allPunksAssigned","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"}],"name":"buyPunk","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"punkIndex","type":"uint256"}],"name":"transferPunk","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"}],"name":"withdrawBidForPunk","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"punkIndex","type":"uint256"}],"name":"setInitialOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"},{"name":"minSalePriceInWei","type":"uint256"},{"name":"toAddress","type":"address"}],"name":"offerPunkForSaleToAddress","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"punksRemainingToAssign","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"},{"name":"minSalePriceInWei","type":"uint256"}],"name":"offerPunkForSale","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"}],"name":"getPunk","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingWithdrawals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"punkIndex","type":"uint256"}],"name":"punkNoLongerForSale","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"punkIndex","type":"uint256"}],"name":"Assign","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"punkIndex","type":"uint256"}],"name":"PunkTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"punkIndex","type":"uint256"},{"indexed":false,"name":"minValue","type":"uint256"},{"indexed":true,"name":"toAddress","type":"address"}],"name":"PunkOffered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"punkIndex","type":    "uint256"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"fromAddress","type":"address"}],"name":"PunkBidEntered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"punkIndex","type":"uint256"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"fromAddress","type":"address"}],"name":"PunkBidWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"punkIndex","type":"uint256"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"fromAddress","type":"address"},{"indexed":true,"name":"toAddress","type":"address"}],"name":"PunkBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"punkIndex","type":"uint256"}],"name":"PunkNoLongerForSale","type":"event"}]
          - name: apes
            address: 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
            abi: >
              [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"maxNftSupply","type":"uint256"},{"internalType":"uint256","name":"saleStart","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BAYC_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_APES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REVEAL_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"apePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencySetStartingIndexBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxApePurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mintApe","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveApes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revealTimeStamp","type":"uint256"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

        filter:
          from_block: 16262470
          addresses:
            - 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
            - 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb
          topics:
    name: eth_conn
```
For a complete example of how to use the Ethereum connector with Dozer, please refer to the [Ethereum sample app](https://github.com/getdozer/dozer-samples/tree/main/connectors/ethereum) in the[`dozer-samples`](https://github.com/getdozer/dozer-samples) repository. This sample app provides a detailed example of how to set up and use the Ethereum connector in a real-world scenario.

## Kafka Stream

The Kafka Connector in Dozer provides a way to ingest data from Kafka, a distributed streaming platform. This section covers the configuration for the Kafka Connector in Dozer.
>  Please note that this feature is currently under a feature flag and needs to be explicitly enabled.
> To use the Kafka connector, you need to build Dozer from the source with the Kafka feature enabled.
>
> Use `cargo build --release --features kafka --bin dozer` commnad to enable kafka feature.

```yaml
app_name: dozer-kafka
connections:
  - config : !Kafka
      broker: {{broker_url}} # e.g. kafka-broker:9092
      schema_registry_url: {{schema_registry_url}} # e.g. http://localhost:8081
    name: kafka_store
sources:
  - name: purchases
    table_name: purchases # kafka topic name
    connection: !Ref kafka_store
    columns:

```
In this configuration, you will need to replace the placeholders with your actual values.
**Note:** `schema_regsitry_url` can be empty as well if you are not using schema-regsitry for your Kafka setup.
If you are not using a schema registry, we expect key and value as strings in the Kafka message.

For a complete example of how to use the Kafka connector with Dozer, please refer to the [Kafka sample app](https://github.com/getdozer/dozer-samples/tree/main/connectors/kafka) in the [`dozer-samples`](https://github.com/getdozer/dozer-samples) repository. This sample app provides a detailed example of how to set up and use the Kafka connector in a real-world scenario.

## MySQL

To use a MySQL connector, a server URL is needed. This URL contains the server location, authentication credentials, database name, and optional parameters.

For example

```yaml
connections:
  - config: !MySQL
      url: mysql://root:mysql@localhost:3306/orders
    name: orders
```

This configuration declares a MySQL connector which will ingest data from a MySQL database named `orders` in a server located at `localhost:3306`, while authenticating as the user `root` with password `mysql`.

The connection URL may optionally contain additional connection parameters in the form of URL query parameters; for example, `mysql://root:mysql@localhost:3306/orders?require_ssl=true`. The list of supported connection parameters includes `require_ssl: bool` (defaults to `false`), `verify_ca: bool` (defaults to `true`), `verify_identity: bool` (defaults to `true`). For a reference of all supported parameters and their descriptions, checkout [mysql_async::Opts](https://docs.rs/mysql_async/latest/mysql_async/struct.Opts.html).

A complete example of how to use the MySQL connector with Dozer can be found at the [MySQL sample app](https://github.com/getdozer/dozer-samples/tree/main/connectors/mysql) in the [`dozer-samples`](https://github.com/getdozer/dozer-samples) repository. This sample app provides a detailed example of how to set up and use the MySQL connector in a real-world scenario.







## Deltalake
(Coming Soon)

## AWS S3
(Coming Soon)

## Google Cloud Storage
(Coming Soon)
