# CLI Development Flow
Dozer Command Line Interface is a unified tool and exposes commands for publishing and managing your applications, as well as lower level tools to interact with each component of your application. This reference guides you through getting started with the CLI.

## Synopsis
```
dozer [options] <command> <subcommand> [parameters]
```
Use `dozer help`, `dozer -h` or `dozer --help` to view a list of available commands. Use `dozer <command> help`, `dozer <command> -h` or `dozer <command> --help` for information on a specific command with available subcommands. The synopsis for each command shows its parameters and their usage. Optional parameters are shown in square brackets.

## Development Flow

![Dozer CLI Flow](@site/static/docs/cli.svg)

## Local Development

#### `dozer init`
If you'd like to initialize a new dozer application, dozer will create `dozer-config.yaml` in the workspace with a pre-populated configuration template.

```bash
question: App name (quick-start-app): 
question: Home directory (./.dozer): 
question: Connection Type - one of: [P]ostgres, [E]thereum, [S]nowflake (Postgres): 
question: Config path (./dozer-config.yaml): 
```

#### `dozer live`
This is an experimental feature that initializes an in-browseer development / debugging environment which can be used to intercatively test your application.


#### `dozer`
Dozer operates through two primary runtimes:
- `app`: This functions as a real-time data pipeline, transforming data and forwarding it to the store.
- `api`: This is an API server that interfaces with the store, providing both gRPC and REST API services.

By default, executing the `dozer` command without any additional parameters initiates both the `app` and `api` within the same process. This mode is particularly useful for local testing of a complete Dozer application. Unless specified, this default run will search for and use the `dozer-config.yaml` located in the current directory. If you need to utilize a different configuration file, run the command as `dozer -c path/to/config/file.yaml`.

## Self-Hosted Deployment

#### `dozer build`
Run following command to initialize and lock the schema definitions. Once initialized, schemas cannot be changed.

#### `dozer run app`
If you run Dozer CLI with `run` command with `app` subcommand like below, dozer will bring up app service.

#### `dozer run api`
If you run Dozer CLI with `run` command with `api` subcommand like below, dozer will bring up api service. For more details on self-hosting, deployment details can be found [here](/docs/deployment).


## Dozer Cloud Deployment
You can list out available commands by running `dozer cloud -h`

#### `dozer cloud login`
Login to Dozer Cloud service.

#### `dozer cloud deploy`
Run following command to deploy your dozer applications to the dozer cloud.

### Cloud Specific Options

`--target-url (string)`, `-t (string)`
 
Provide target url for cloud deployment.

`--app-id (string)`, `-a (string)`

Provide the unique app id for your application.

`--profile (string)`, `p`
 
Provide user profile to cloud login for deployment.

`--ignore-pipe`
 
Use this option to avoid EOF while parsing a value in the config.

## Utility Commands

### Local

#### `dozer clean`
Run following command to clean home directory which has its data under `.dozer/` in your workspace.

#### `dozer connectors`
If you want to view available connectors for your application, run following command to get token.

> ```bash
> +------------+-------+----------------------------------------------------------+
> | Connection | Table | Columns                                                  |
> +------------+-------+----------------------------------------------------------+
> | s3         | trips | +-----------------------+-----------+----------+-------+ |
> |            |       | | Field                 | Type      | Nullable | PK    | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | VendorID              | Int       | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | tpep_pickup_datetime  | Timestamp | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | tpep_dropoff_datetime | Timestamp | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | passenger_count       | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | trip_distance         | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | RatecodeID            | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | store_and_fwd_flag    | String    | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | PULocationID          | Int       | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | DOLocationID          | Int       | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | payment_type          | Int       | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | fare_amount           | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | extra                 | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | mta_tax               | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | tip_amount            | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | tolls_amount          | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | improvement_surcharge | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | total_amount          | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | congestion_surcharge  | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> |            |       | | airport_fee           | Float     | true     | false | |
> |            |       | +-----------------------+-----------+----------+-------+ |
> +------------+-------+----------------------------------------------------------+
> ```

#### `dozer security generate-token`
If you want to utilize api security features, run following command to generate the token. Make sure you add following part in the dozer configuration file. For more details on how to configure authentication, details can be found [here](/docs/accessing-data/authorization).
```yaml
api:
  api_security:
    !Jwt
```

### Cloud

#### `dozer cloud delete`
Stop and delete application from Dozer Cloud. Make sure you have your id recorded under `dozer-config.cloud.yaml`.

> ```bash
> .____   ___ __________ ____
> |  _ \ / _ \__  / ____|  _ \
> | | | | | | |/ /|  _| | |_) |
> | |_| | |_| / /_| |___|  _ <
> |____/ \___/____|_____|_| \_\
> 
>  INFO Connecting to cloud service "https://api.dev.getdozer.io"
>  ✅ [1] Application stopped
>  ✅ [2] Deleted ******-****-****-****-**************
> ```

#### `dozer cloud status`
Get status of running application in Dozer Cloud.

#### `dozer cloud monitor`
Monitor processed data amount in Dozer Cloud.

#### `dozer cloud logs`
Inspect application logs.

#### `dozer cloud version`
Dozer application version management.

#### `dozer cloud set-app`
Set application, which will be used for all commands.

#### `dozer cloud list`
List all dozer application in Dozer Cloud.

#### `dozer cloud api`
Dozer API server management.

#### `dozer cloud secrets`
Dozer app secrets management.

## Global Options

`--config-path (string)`, `-c (string)`
 
Provide dozer configuration YAML file with given PATH.

`--config-overrides (string)`
 
Override dozer configuration with string. The part before = is a JSON pointer, and the part after = should be a valid JSON string. If the JSON pointer points to an existing config value, the JSON value will be replaced.
 e.g. `dozer --config-overrides /app/commit_size=100`

`--version`, `-V`
 
Print Dozer CLI version. Current lastest is `v0.1.33`.

`--help`, `-h`
 
Print help on command or subcommand.
