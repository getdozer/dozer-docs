---
sidebar_position: 2
---

# Comparision

Dozer takes an opinionated and horizontal approach that cuts across different categories. In Dozer, you would find modules and functionalities comparable to streaming databases, caches, search engines and API generation tools.

With a simple configuration, Dozer can go from sources to APIs within minutes. Dozer is also available as a single binary and can be initialized with a single command. This can bring up the entire data pipeline as well as storage and APIs.

Dozer App and APIs can be run separately and scaled separately. APIs have very little resource consumption and can be deployed on serverless architecture to scale, and can offer cost-effective deployment.

These are some of the common questions we are asked.

## Dozer vs Hasura
Even though Dozer generates APIs, both products are vastly different. Dozer implements a full layer of a data pipeline and takes a copy of the data, stores and indexes it for fast query performance. Dozer APIs do not add any additional burden on the existing data sources and scale effectively.

Hasura exposes a GraphQL query layer on top of existing data sources. This brings the querying back to existing data sources and causes additional load and sometimes databases can struggle to perform.

Hasura offers full CRUD APIs on top of databases. Dozer focuses on `READ APIs` only. Dozer aims to primarily solve the data consumption problem and not to be another API orchestration tool.

## Is Dozer yet another stream processing product such as Flink?
Streaming databases have become popular and there are recently many implementations. We very much respect these implementations and some of them have great teams behind them.

However, at Dozer, it is our belief that not every company needs the full functionality of a streaming database and Dozer offers a solution approach.

Dozer utilizes CDC very similarly to stream processing products such as Apache Flink to solve this problem. At the heart of Dozer, inserts, updates and deletes get propagated all the way from sources to the storage/caching layer.

This is one component of Dozer and the comparison sort of ends there. Dozer is also fully built in Rust offering superior data processing.


Dozer's main goal is to offer ready and extensible functionality that data products can be built and iterated rapidly.

## Dozer vs ElastiSearch/Algolia
ElasticSearch offers a full-featured and mature search functionality with advanced capabilities for index management.  ElasticSearch offers REST APIs out of the box and is JSON based.

Dozer's caching layer is built on top of LMDB with automatic indexes. Dozer offers gRPC and REST APIs with static typing. That means client libraries can be generated offering a far superior developer experience.
Dozer offers the most common search functionality out of the box but ElastiSearch has a lot more advanced functionality. That being said, we are actively working on the functionality and the feature list will grow.

Dozer automatically pulls a copy of your data whereas, in ElasticSearch, developers have to programmatically populate the data.

We will be writing an article on Dozer vs ElastiSearch soon. Stay tuned!

## Dozer vs ETL tools such as FiveTran/Airbyte
Most of the ETL tools are focused on batch workflows and typically involve a source and a destination.

Dozer will be supporting a wide variety of connectors in the future but the destination is very much about building high-performance APIs over a caching layer. Dozer also has support for real-time and batch.

Dozer is also open-source and extensible. So developers can build their own connectors.

## Dozer vs Redis
Dozer by default offers a caching layer on top of our embedded storage. Dozer will be supporting "Bring your own Cache" mode if there is sufficient interest in that workflow. API functionality might be limited depending on the functionality of the cache. Currently, as we control the cache, we can customize it a lot more.
