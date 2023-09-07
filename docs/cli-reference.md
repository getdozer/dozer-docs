# Development Flow
Dozer offers a Command Line (CLI) Interface that exposes commands for developing, publishing and managing Dozer applications. This reference guides you through getting started with the CLI.

## Synopsis
```
dozer [options] <command> <subcommand> [parameters]
```
Use `dozer help` to view a list of available commands. Use `dozer <command> help` for information on a specific command with available subcommands. The synopsis for each command shows its parameters and their usage. Optional parameters are shown in square brackets.

## Application Lifecycle
Dozer provides a streamlined approach to application development and deployment, ensuring users can effectively create, test, and distribute their applications. Initially, users can either employ the `dozer init` command or manually craft a `dozer-config.yaml` file to set the foundational configurations. From there, the `dozer live` command allows for real-time interactive development and testing. For more straightforward, non-interactive testing, users can run their application locally using just the `dozer run` command. When it comes to deployment, Dozer offers flexibility. Applications can either be hosted on Dozer's cloud with the `dozer cloud deploy` command or on self-managed infrastructures. In the latter scenario, a build is created using `dozer build`, followed by the separation of the app and API components into individual processes through `dozer run app` and `dozer run api` respectively. This distinction ensures modularity and independent lifecycle management for each component.

![Dozer CLI Flow](@site/static/docs/cli.svg)

## Local Development

#### `dozer init`
Initializes a new Dozer project by generating the foundational `dozer-config.yaml` file within the current directory. This command can be skipped when the `dozer-config.yaml` is manually created.

#### `dozer live`
Initiates an in-browser interface for real-time Dozer application development. As the source code is modified in the IDE, changes are immediately reflected in this interface, enabling instant visualization and interactive testing. It streamlines the feedback loop, offering insights into data flows, configurations, and endpoints, all within the context of the live application.

#### `dozer run`
Initiates Dozer in a non-interactive way, but starting both `app` and `api` as different threads of the same process.

## Self-Hosted Deployment

`dozer run` does a lot of work for you, and when developing your application, that is very handy! When creating a production deployment of you dozer application, you will want to separate these steps to have full control.

#### `dozer build [--locked]`
The first thing that `dozer run` does for you is `build` your application. During the build process, the current data schema and API configurations are finalized and several auxiliary files are generated. 
After building, your application's data contract specifying all the inputs, transformations and outputs for all the application's endpoints, is written to the `dozer.lock` file, which you might have noticed appearing next to your `dozer-config.yaml`. 
Before running the application using the `dozer run app` and `dozer run api` commands, make sure you run `dozer build` and that the resulting files (`dozer.lock` and the contents of the `.dozer/` directory) are available to these commands.

To ensure that your application's data sources or its configuration did not change between developing and deploying, you can add the `--locked` flag to `dozer build` during deployment. This will make Dozer check that the built application conforms to the data contract specified in `dozer.lock`.

#### `dozer run app`
`dozer run app` runs the `app` component of the Dozer application built with [`dozer build`]. 
This component is responsible for establishing connections to data sources, ingesting the data from them and applying all the data transformations specified in your `dozer-config.yaml`.

#### `dozer run api`
`dozer run app` runs the `API` component of the Dozer application built with [`dozer build`]. 
This component manages the low-latency data store and gRPC services. It connects to its corresponding upstream `app` component to receive processed data and serve it to clients through theAPI endpoints defined in `dozer-config.yaml`


## Dozer Cloud Deployment

#### `dozer cloud deploy`
Deploying to Dozer Cloud is as simple as running the `dozer cloud deploy` command.
Cloud uses your `dozer.lock` to check that the application you deploy is the application you meant to deploy. So, make sure you `dozer build` or `dozer run` your application before deploying. If you don't want `dozer cloud` to check your `dozer.lock`, you can run `dozer cloud deploy` with the `--no-lock` flag.


### Versions
Every Dozer application deployed to Dozer Cloud has a version, which is specified with the `version` option in `dozer-config.yaml`.
Dozer Cloud will ensure that you don't accidentally make a breaking change to an already deployed version and will abort the deployment if you do.
A breaking change is any change that will make current access patterns fail, such as removing an endpoint, changing the primary index or changing the
data type of a field in the schema of an API endpoint. As such, adding an endpoint and adding fields to existing endpoints are not breaking changes.
If you do need to make a breaking change to an API, you will need to specify a new `version` for the Dozer application. When deploying a new version, the old version will stay up, so any applications that use the old version of the API will continue working.

[`dozer build`]: #dozer-build---locked
