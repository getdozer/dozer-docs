---
sidebar_position: 2
---

# Architecture

Dozer takes an opinionated and horizontal approach and cuts across different categories. In Dozer, you would find modules and functionality comparable to streaming databases, caches, search engines and API generation tools.

Dozer's architecture is designed to be robust, scalable, and efficient. It takes an opinionated and horizontal approach, cutting across different categories. In Dozer, you would find modules and functionalities comparable to streaming databases, caches, search engines, and API generation tools.

The architecture of Dozer is composed of several key entities, including Connections, Sources, Endpoints, Pipeline, Cache, and Authorization. Each of these entities plays a crucial role in the operation of Dozer, contributing to its ability to process data rapidly and generate APIs instantly.


![architecture](@site/static/docs/dozer_Architecture.png)

## Key Entities
- [Connections](#connections)
- [Sources](#sources)
- [Endpoints](#endpoints)
- [Pipeline](#pipeline)
- [Cache](#cache)
- [Authorization](#authorization)


### Connections
A *Connection* describes one connection to each data store. One Connection can have multiple sources. Typically you describe the connection details and credentials within the configuration section.

Connectors are implemented in [dozer-ingestion module](https://github.com/getdozer/dozer/tree/main/dozer-ingestion).

### Sources
Each *Source* essentially describes one unique table with a name and schema.

### Endpoints
Each *Endpoint* describes one API Endpoint that will be deployed when Dozer is running. You can find the configuration reference [here](/docs/configuration/endpoints)

Every `Endpoint` attaches REST and gRPC API routes on a `Cache Reader` instance.  Every endpoint also creates a `Sink` in the pipeline where a `Cache Writer` is initialized.

### Pipeline
Dozer instantiates a data pipeline which is essentially a DAG. The pipeline contains sources, processors and sinks.
- Every source explained above acts as a pipeline source.
- SQL is transformed into a collection of several processors.
- A `Sink` is initialized for each `Endpoint`.

Pipeline and DAG construction is implemented under [dozer-core](https://github.com/getdozer/dozer/tree/main/dozer-core).

### Cache
The cache interface exposes methods to insert, update, delete and query records. The cache also creates secondary and full-text indexes for fast lookups and queries. `Cache Writer` is initialized within a `Sink` and data gets processed and committed in bulk as part of the pipeline.
Both `Rest` and `gRPC` API Servers initialize `Cache Readers` and interact with data stored in the storage layer.

`Cache Reader` has also support for `Authorization` based on properties.

This is implemented under [dozer-cache](https://github.com/getdozer/dozer/tree/main/dozer-core).

### Authorization
`JWT Tokens` can be initialized using APIs that have narrowed down permissions to access data. This could be per `Endpoint` or even based on `Document Properties`.
