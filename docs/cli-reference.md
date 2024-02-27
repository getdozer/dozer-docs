# CLI Reference
Dozer offers a Command Line (CLI) Interface that exposes commands for developing, publishing and managing Dozer applications. This reference guides you through getting started with the CLI.

## Synopsis
```
dozer [options] <command> <subcommand> [parameters]
```
Use `dozer help` to view a list of available commands. Use `dozer <command> help` for information on a specific command with available subcommands. The synopsis for each command shows its parameters and their usage. Optional parameters are shown in square brackets.

## Self-Hosted Deployment

#### `dozer build ` & `dozer clean`
During the build process, the current data schema and API configurations are finalized and several auxiliary files are generated. 

You can utilize `dozer clean` to remove the created `.dozer` folder. 

#### `dozer run`
`dozer run` runs the replication pipeline inline with the provided configuration.


#### `dozer ui`
Initiates an in-browser interface for viewing the pipeline as well as monitoring replication instances.
