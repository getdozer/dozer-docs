# PostgreSQL

Dozer PostgreSQL connector serves as an essential link for real-time data replication from a PostgreSQL database to Dozer. Upon its initial start, the connector begins by taking a snapshot of the existing data in specified tables. This process provides a foundation from which further data changes can be efficiently managed. After snapshotting, the connector taps into PostgreSQL's logical replication by connecting to a designated replication slot, monitoring for data changes in real-time. Any changes occurring in the PostgreSQL database are detected and instantly sent to Dozer, ensuring a continuous stream of updated data. The specific tables to observe are customizable within the connector configuration, ensuring a targeted and resource-optimized data-handling process.

### Configuration
The following configuration block can be used in `dozer-config.yaml` to define a new PostgreSQL connection:

```yaml
connections:
  - name: pagila_conn
    config: !Postgres
      user: postgres
      password: postgres
      host: localhost
      port: 5433
      database: film
```

```yaml
connections:
  - name: pagila_conn
    config: !Postgres
      # connection_url can be used instead of above config
      connection_url: postgresql://postgres:postgres@localhost:5433/film
      # ssl_mode with disable, prefer and require (optional)
      ssl_mode: require
```

### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                             | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `user`             | String               | The username required for authenticating the user's access to the PostgreSQL instance.                                                                                                                                                                                      |
| `password`         | String               | The password corresponding to the above username, required for secure authentication to the PostgreSQL instance.                                                                                                                                                            |
| `host`             | String or IP address | The host address of the PostgreSQL instance. It could be an IP address or a valid hostname.                                                                                                                                                                                 |
| `port`             | Integer              | The specific port on which the PostgreSQL service is running.                                                                                                                                                                                                               |
| `database`         | String               | The specific database within the PostgreSQL instance to which the connector needs to establish a connection.                                                                                                                                                                |
| `SSLMode`          | String               | The choice of SSL TCP/IP connection negotiation priority with the server can be configured with three available options: "require," "prefer," or "disable." These options allow you to define how the SSL connection will be established between the client and the server. |
| `connection_url`   | String               | Postgres connection string takes precedence over all other configurations in Dozer when connecting to the database. running.                                                                                                                                                |

## Trying it out

To test a PostgreSQL sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/postgres).


