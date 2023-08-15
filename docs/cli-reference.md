# CLI Reference
Dozer Command Line Interface is a unified tool and exposes commands for publishing and managing your applications, as well as lower level tools to interact with each component of your application. This reference guides you through getting started with the CLI.

## Synopsis
```
dozer [options] <command> <subcommand> [parameters]
```
Use `dozer help`, `dozer -h` or `dozer --help` to view a list of available commands. Use `dozer <command> help`, `dozer <command> -h` or `dozer <command> --help` for information on a specific command with available subcommands. The synopsis for each command shows its parameters and their usage. Optional parameters are shown in square brackets.


## Development Commands

### Dozer Initialization
If you like to initialize dozer application, dozer will create `dozer-config.yaml` in the workspace with pre-populated configuration template.

:::info command
```bash
dozer init
```
:::

> ```bash
> question: App name (quick-start-app): 
> question: Home directory (./.dozer): 
> question: Connection Type - one of: [P]ostgres, [E]thereum, [S]nowflake (Postgres): 
> question: Config path (./dozer-config.yaml): 
> ```

### Dozer Live
Run following command to edit code for your dozer application.
:::info command
```bash
dozer live
```
:::

> ```bash
> .____   ___ __________ ____
> |  _ \ / _ \__  / ____|  _ \
> | | | | | | |/ /|  _| | |_) |
> | |_| | |_| / /_| |___|  _ <
> |____/ \___/____|_____|_| \_\
> 
> Dozer Version: 0.1.33
> 
> INFO Starting live server
> ```

### Run Dozer
If you run Dozer CLI with no command are passed like below, dozer will bring up both `app` and `api` services.
:::info command
```bash
dozer
```
:::

### Dozer Build
Run following command to initialize and lock the schema definitions. Once initialized, schemas cannot be changed.
:::info command
```bash
dozer build
```
:::

> ```bash
>  INFO Initiating app: ..
>  ...
>  INFO Created new build v0001
> ```

### Dozer Clean
Run following command to clean home directory which has its data under `.dozer/` in your workspace.
:::info command
```bash
dozer clean
```
:::

### Dozer Connectors
If you want to view available connectors for your application, run following command to get token.
:::info command
```bash
dozer connectors
```
:::

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

### Dozer Security
If you want to utilize api security features, run following command to generate the token
:::info command
```bash
dozer security generate-token
```
:::

and make sure you add following part in the dozer configuration file.
```yaml
api:
  api_security:
    !Jwt
```


## Cloud Deployment Commands

### Run Dozer App
If you run Dozer CLI with `run` command with `app` subcommand like below, dozer will bring up app service.
:::info command
```bash
dozer run app
```
:::

### Run Dozer Api
If you run Dozer CLI with `run` command with `api` subcommand like below, dozer will bring up api service.
:::info command
```bash
dozer run api
```
:::

### Dozer Cloud
Run following command to deploy your dozer applications to the dozer cloud.
:::info command
```bash
dozer cloud
```
:::

#### Cloud Specific Options

> `--target-url (string)`, `-t (string)`
> 
> Provide target url for cloud deployment.

> `--app-id (string)`, `-a (string)`
> 
> Provide the unique app id for your application.

> `--profile (string)`, `p`
> 
> Provide user profile to cloud login for deployment.

## Global Options

> `--config-path (string)`, `-c (string)`
> 
> Provide dozer configuration YAML file with given PATH.

> `--config-overrides (string)`
> 
> Override dozer configuration with string. The part before = is a JSON pointer, and the part after = should be a valid JSON string. If the JSON pointer points to an existing config value, the JSON value will be replaced.
> e.g. `dozer --config-overrides /app/commit_size=100`

> `--version`, `-V`
> 
> Print Dozer CLI version. Current lastest is `v0.1.33`.

> `--help`, `-h`
> 
> Print help on command or subcommand.
