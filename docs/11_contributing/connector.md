---
id: connector
sidebar_position: 3
---

# Implement a new connector

Connectors are implemented as a trait, [`Connector`](https://github.com/getdozer/dozer/blob/main/dozer-ingestion/src/connectors/mod.rs#L77), which defines a set of methods that must be implemented in order to interact with a specific data source. This allows Dozer to support a wide range of data sources without having to tightly couple the code to any specific implementation.

## The Connector trait

Every connector to external database needs to implement connector trait [/dozer-ingestion/src/connectors/mod.rs](https://github.com/getdozer/dozer/blob/main/dozer-ingestion/src/connectors/mod.rs#L77)

```rust
pub trait Connector: Send + Sync + Debug {
    /// Returns all the external types and their corresponding Dozer types.
    /// If the external type is not supported, None should be returned.
    fn types_mapping() -> Vec<(String, Option<FieldType>)>
    where
        Self: Sized;

    /// Validates the connector's connection level properties.
    async fn validate_connection(&self) -> Result<(), ConnectorError>;

    /// Lists all the table names in the connector.
    async fn list_tables(&self) -> Result<Vec<TableIdentifier>, ConnectorError>;

    /// Validates the connector's table level properties for each table.
    async fn validate_tables(&self, tables: &[TableIdentifier]) -> Result<(), ConnectorError>;

    /// Lists all the column names for each table.
    async fn list_columns(&self, tables: Vec<TableIdentifier>) -> Result<Vec<TableInfo>, ConnectorError>;

    /// Gets the schema for each table. Only requested columns need to be mapped.
    ///
    /// If this function fails at the connector level, such as a network error, it should return a outer level `Err`.
    /// Otherwise the outer level `Ok` should always contain the same number of elements as `table_infos`.
    ///
    /// If it fails at the table or column level, such as a unsupported data type, one of the elements should be `Err`.
    async fn get_schemas(
        &self,
        table_infos: &[TableInfo],
    ) -> Result<Vec<SourceSchemaResult>, ConnectorError>;

    /// Starts outputting data from `tables` to `ingestor`. This method should never return unless there is an unrecoverable error.
    async fn start(&self, ingestor: &Ingestor, tables: Vec<TableInfo>) -> Result<(), ConnectorError>;
}
```

Detailed explanation of the data structures and method contracts can be found in [the specification](https://github.com/getdozer/dozer/blob/main/dozer-ingestion/SPEC.md).

### Connector functions usage in dozer commands

Dozer uses connector methods in 3 different commands. During `connector ls` execution, dozer just fetches schemas. To get schemas we use `list_tables`, `list_columns` and `get_schemas` methods.

The other two dozer commands which use connectors are `build` and `run app`. During both command execution, first, we validate the connection and schema using `validate_connection`, `validate_tables` and `get_schemas` methods. After that `run app` command also calls `start` method and the connector starts data ingestion.

## Schema mapping

Every external schema should be mapped to dozer types. If an external type is not supported, connector should return an error during `get_schemas`. During ingestion data should be mapped the same way as in `get_schemas`.

## Unit tests

It is important to have unit tests for schema mapping and data mapping to dozer types.

More complex tests require connection a real database. Such test cases are expected to have the following:

* Database infrastructure, preferably created in docker container(s)
* Connection configuration (with placeholders)
* It should be possible to run test cases without any manual modification to the database.

[Short description of how to run existing tests.](https://github.com/getdozer/dozer/blob/main/dozer-ingestion/src/tests/README.md)

## E2E tests

More complex tests need to connect to a real database. Such tests cases are expected to have several things:

- Database infrastructure, preferably created in docker container(s)
- Connection configuration (with placeholders)
- It should be possible to run test cases without doing any manual modifications in database.
