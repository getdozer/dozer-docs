---
sidebar_position: 2
---

# Architecture

Dozer's architecture is designed to efficiently process and deliver data through three types of nodes: Ingestor nodes, Processor nodes, and Store/API nodes. 

**Ingestor Nodes**: These nodes are responsible for data ingestion from various sources such as databases, data warehouses, or object storages. They capture data continuously in real-time using Change Data Capture (CDC) or near-real-time using polling mechanisms. The captured data is transformed into Dozer operations (Inserts, Updates, Deletes) and ingested into the system.

**Processor Nodes**: These nodes embody a streaming SQL engine that enables real-time data transformations. As data is ingested, these transformations operate on the incoming streams directly. Processor nodes can source data from multiple ingestors or other processors, and they can combine and aggregate data using SQL.

**Store/API Nodes**: Once data is processed, it's transferred to the Store nodes. These nodes implement a data store using LMDB (Lightning Memory-Mapped Database), an ultra-fast, ultra-compact key-value embedded data store. The stored data is automatically indexed to expedite lookup performance and is accessible through gRPC and REST APIs. The definitions of the exposed data are available through OpenAPI or Protocol Buffers definitions.

![Dozer Architecture](./arch.svg)

## Data Flows

![Dozer Architecture](./images/e2e.svg)

Ingestor nodes form the initial data pipeline by connecting to various data sources and streaming data into the system. Each Ingestor node maintains an in-memory queue of all incoming messages, allowing for high-speed data processing. However, this queue has a size limit to prevent memory overflow. 

When the volume of incoming data reaches a certain threshold, the Ingestor node initiates an offloading process. The earliest (or head) messages in the queue, which are likely to have been processed already, are moved to a cloud storage system. This mechanism of transferring older data to more permanent storage allows the Ingestor node to free up memory space for new incoming data, ensuring smooth, uninterrupted data flow and real-time processing.

Ingestor nodes not only process incoming data but also serve as crucial data access points for the rest of the system. They achieve this by exposing a gRPC endpoint that downstream nodes can connect to. This gRPC endpoint implements a protocol to provide access to data for all downstream nodes, effectively allowing for the distribution and dissemination of data across the system.
