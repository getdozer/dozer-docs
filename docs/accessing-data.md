# Accessing Data

Dozer supports multiple interfaces for querying data:

## Typesafe gRPC Protocol
Typesafe gRPC services are generated from specific protobuf definitions. Each service and message type has its own set of methods, leading to strong type safety and optimized performance due to compile-time type checking. Protobuf definitions of typesafe services are automaticalley derived and generated using the source schema and SQL transformations.

Learn how to use the Typesafe gRPC Protocol [here](accessing-data/typesafe-grpc)

## Common gRPC Protocol
Common gRPC services offer a more generic interface. Rather than using specific message types, they handle data in a more generalized manner, using common Protobuf defintiions. This approach provides greater flexibility, especially when dealing with dynamic data structures, but comes with slight overhead.

Learn how to use the Common gRPC Protocol [here](accessing-data/common-grpc)

## REST Protocol
REST enables users to interact with Dozer using HTTP methods, making it accessible to applications or systems that might not natively support gRPC. The REST interface involves sending or receiving JSON-formatted data, providing a more universally accepted and readable format, but will not be as efficient as gRPC in terms of data serialization and communication speed.

Learn how to use the REST protocol [here](accessing-data/rest)
