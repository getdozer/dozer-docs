# Snowflake

Dozer's Snowflake connector integration utilizes Snowflake's Table Streams for real-time data integration and synchronization. Dozer captures and processes data changes from Snowflake tables using Table Streams, ensuring instant updates without constant polling or manual synchronization.

### Configuration
The following configuration block can be used in `dozer-config.yaml` to define a new Snowflake connection:

```yaml
connections:
  - config: !Snowflake
      server: "dozer-test.snowflakecomputing.com"
      port: 443
      user: "dozerTest"
      password: "DozerSamplePassword!"
      database: "DOZER_SAMPLE_DATA"
      schema: PUBLIC
      warehouse: "COMPUTE_WH"
      driver: "SnowflakeDSIIDriver"
      role: "ACCOUNTADMIN"
```

### Parameters

| **Parameter Name** | **Type** | **Description** | 
|--------------------|----------|-----------------|
| `server` | String | The server URL or endpoint required for authenticating and connecting to the user's Snowflake account. |
| `port` | Integer | The specific port on which the Snowflake service is running. By default, Snowflake uses port 443 for encrypted communication. |
| `user` | String | The username required for authenticating the user's access to the Snowflake instance. |
| `password` | String | The password corresponding to the above username, required for secure authentication to the Snowflake instance. |
| `database` | String | The specific database within the Snowflake instance to which the connector needs to establish a connection. This is the database that will be used as the default for the session upon successful connection. |
| `schema` | String | The specific schema within the selected database that the connector needs to establish a connection. A schema is a logical container for database objects like tables, views, and procedures. |
| `warehouse` | String | The name of the warehouse to which the connector needs to connect. This determines the virtual compute resources available for executing queries and processing data within Snowflake. |
| `driver` | String | The type of driver or connector used to establish the connection with Snowflake. |
| `role` | String | The role to which the user is assigned within Snowflake. |


## Trying it out

To test a Snowflake sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/snowflake).