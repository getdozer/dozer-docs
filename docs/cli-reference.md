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
```bash
dozer init
```

### Dozer Live
Run following command to edit code for your dozer application. 
```bash
dozer live
```

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

### Run Dozer App
If you run Dozer CLI with `run` command with `app` subcommand like below, dozer will bring up app service.
```bash
dozer run app
```

### Run Dozer Api
If you run Dozer CLI with `run` command with `api` subcommand like below, dozer will bring up api service.
```bash
dozer run api
```

### Dozer Build
Run following command to initialize and lock the schema definitions. Once initialized, schemas cannot be changed.
```bash
dozer build
```

### Dozer Clean
Run following command to clean home directory which has its data under `.dozer/` in your workspace.
```bash
dozer clean
```

### Dozer Connectors
If you want to view available connectors for your application, run following command to get token.
```bash
dozer connectors
```

### Dozer Security
If you want to utilize api security features, run following command to generate the token
```bash
dozer security generate-token
```

and make sure you add following part in the dozer configuration file.
```yaml
api:
  api_security:
    !Jwt
```


## Cloud Deployment Commands

### Run Dozer
If you run Dozer CLI with no command are passed like below, dozer will bring up both `app` and `api` services.
```bash
dozer
```

### Dozer Cloud
Run following command to deploy your dozer applications to the dozer cloud.
```bash
dozer cloud
```

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
