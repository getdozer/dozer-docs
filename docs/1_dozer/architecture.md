---
sidebar_position: 2
---

# Architecture

Dozer's architecture is designed to efficiently process and deliver data through three types of nodes: Ingestor nodes, Processor nodes, and Store/API nodes. 

**Ingestor Nodes**: These nodes are responsible for data ingestion from various sources such as databases, data warehouses, or object storages. They capture data continuously in real-time using Change Data Capture (CDC) or near-real-time using polling mechanisms. The captured data is transformed into Dozer operations (Inserts, Updates, Deletes) and ingested into the system.

**Processor Nodes**: These nodes embody a streaming SQL engine that enables real-time data transformations. As data is ingested, these transformations operate on the incoming streams directly. Processor nodes can source data from multiple ingestors or other processors, and they can combine and aggregate data using SQL.

**Store/API Nodes**: Once data is processed, it's transferred to the Store nodes. These nodes implement a data store using LMDB (Lightning Memory-Mapped Database), an ultra-fast, ultra-compact key-value embedded data store. The stored data is automatically indexed to expedite lookup performance and is accessible through gRPC and REST APIs. The definitions of the exposed data are available through OpenAPI or Protocol Buffers definitions.

![Dozer Architecture](./arch.svg)
