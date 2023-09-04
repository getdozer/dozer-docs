---
description: Connects to MongoDB, leveraging Change Streams for real-time event capturing.
---

# MongoDB
The Dozer MongoDB connector is an experimental connector for Dozer, replicating any data changes in MongoDB collections into Dozer in real-time. 
To replicate data from a MongoDB cluster, this cluster needs to be configured as a [replica set], so that MongoDB creates a replication log, which can be used for efficient streaming of data changes. Furthermore, the collections to be replicated need to have [Document Pre- and Post-images] enabled, so that dozer knows what the new version of the changed documents looks like. If access control is enabled on the cluster, the user that is used with the connector needs to have the `find` and `changeStream` privileges.

### Configuration
The only piece of configuration required to get started with the Dozer connector for MongoDB is a [`connection_string`]. The database name is required in the `connection_string`:

```yaml
connections:
  - name: mongodb_conn
    config: !MongoDB
      connection_string: mongodb://username:password@hostname:port/databasename
```

### Limitations
Currently, [sharded clusters] are not supported.

[replica set]: https://www.mongodb.com/docs/manual/replication/
[Document Pre- and Post-images]: https://www.mongodb.com/docs/v7.0/changeStreams/#change-streams-with-document-pre--and-post-images
[`connection_string`]: https://www.mongodb.com/docs/manual/reference/connection-string/
[sharded clusters]: https://www.mongodb.com/docs/manual/sharding/

