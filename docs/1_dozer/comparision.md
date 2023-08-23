---
sidebar_position: 2
---

# Comparison

Dozer takes an opinionated and horizontal approach that cuts across categories. Dozer has modules and functionality comparable to streaming databases, caches, search engines, and API generation tools.

With a simple configuration, Dozer can go from data sources to APIs within minutes. Dozer is also available as a single binary and can be initialized with a single command. This brings up the entire data pipeline as well as storage and APIs.

The Dozer App and APIs can be run separately and scaled separately. APIs have very low resource consumption and can be deployed on serverless architecture for scale and cost-effective deployment.

Here are some of the common questions we are asked.

## Dozer vs Hasura
Even though Dozer generates APIs, it is vastly different from Hasura. Dozer implements a full layer of a data pipeline. It makes a copy of the data and stores and indexes it for fast query performance. Dozer APIs do not add any additional burden on existing data sources and scale effectively.

Hasura exposes a GraphQL query layer on top of existing data sources. This brings the querying back to existing data sources and can cause additional load. Sometimes databases can struggle to perform.

Hasura offers full CRUD APIs on top of databases. Dozer focuses on only on READ APIs. Dozer aims to primarily solve the data consumption problem, not to be another API orchestration tool.

## Dozer vs Apache Flink and other streaming databases
Streaming databases have become popular and there are many implementations. We respect these implementations and the teams behind them.

However, at Dozer, we do not think that every company needs the full functionality of a streaming database. Dozer offers a solution.

Dozer uses CDC similarly to stream processing products such as Apache Flink. At the heart of Dozer, inserts, updates, and deletes are propagated all the way from sources to the storage/caching layer.

This is one component of Dozer and the comparison sort of ends there. Dozer is also fully built in Rust, offering superior data processing.

Dozer's main goal is to offer ready-made, extensible functionality so that data products can be built and iterated rapidly.

## Dozer vs ElastiSearch/Algolia
ElasticSearch offers a full-featured and mature search functionality with advanced capabilities for index management. ElasticSearch offers REST APIs out of the box and is JSON based.

Dozer's caching layer is built on top of LMDB with automatic indexes. Dozer offers gRPC and REST APIs with static typing. That means client libraries can be generated, offering a far superior developer experience.
Dozer offers the most common search functionality out of the box but ElastiSearch has more advanced functionality. That being said, we are actively working on our search functionality and the feature list will grow.

Dozer automatically pulls a copy of your data. In ElasticSearch, developers have to programmatically populate the data.

We will be writing an article on Dozer vs ElastiSearch soon. Stay tuned!

## Dozer vs ETL tools such as FiveTran/Airbyte
Most ETL tools are focused on batch workflows and typically involve a source and a destination. Dozer supports both real-time and batch.

Dozer will support a wide variety of connectors in the future but our vision is very much about building high-performance APIs over a caching layer. 

Dozer is also open source and extensible so that developers can build their own connectors.

## Dozer vs Redis
Dozer by default offers a caching layer on top of our embedded storage. Dozer may support a "Bring Your Own Cache" mode if there is sufficient interest. API functionality might be limited depending on the functionality of the cache. Currently, because we control the cache, we can customize it a lot more.
