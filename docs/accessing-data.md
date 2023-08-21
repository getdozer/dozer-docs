# Accessing Data

Dozer supports multiple interfaces for querying data:

### Typed gRPC Protocol
Typed gRPC services are generated from specific protobuf definitions. Each service and message type has its own set of methods, leading to strong type safety and optimized performance due to compile-time type checking. Essentially, with typed services, the client and server know exactly what data structures to expect.

Learn how to use the Typed gRPC Protocol [here](accessing-data/typed-grpc)

### Common gRPC Protocol
Common gRPC services offer a more generic interface. Rather than using specific message types, they handle data in a more generalized manner. This approach provides greater flexibility, especially when dealing with dynamic or changing data structures, but might come with slight overhead due to runtime checks or transformations.

Learn how to use the Common gRPC Protocol [here](accessing-data/untyped-grpc)

### REST Protocol
This enables users to interact with Dozer using HTTP methods, making it accessible to applications or systems that might not natively support gRPC. The REST interface involves sending or receiving JSON-formatted data over HTTP, providing a more universally accepted and readable format, but might not be as efficient as gRPC in terms of data serialization and communication speed.

Learn how to use the REST protocol [here](accessing-data/rest)
