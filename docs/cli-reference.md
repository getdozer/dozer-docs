# Development Flow
Dozer offers a Command Line (CLI) Interface that exposes commands for developing, publishing and managing Dozer applications. This reference guides you through getting started with the CLI.

## Synopsis
```
dozer [options] <command> <subcommand> [parameters]
```
Use `dozer help` to view a list of available commands. Use `dozer <command> help` for information on a specific command with available subcommands. The synopsis for each command shows its parameters and their usage. Optional parameters are shown in square brackets.

## Application Lifecycle
Dozer provides a streamlined approach to application development and deployment, ensuring users can effectively create, test, and distribute their applications. Initially, users can either employ the `dozer init` command or manually craft a `dozer-config.yaml` file to set the foundational configurations. From there, the `dozer live` command allows for real-time interactive development and testing. For more straightforward, non-interactive testing, users can run their application locally using just the `dozer` command. When it comes to deployment, Dozer offers flexibility. Applications can either be hosted on Dozer's cloud with the `dozer cloud deploy` command or on self-managed infrastructures. In the latter scenario, a build is created using `dozer build`, followed by the separation of the app and API components into individual processes through `dozer run app` and `dozer run api` respectively. This distinction ensures modularity and independent lifecycle management for each component.

![Dozer CLI Flow](@site/static/docs/cli.svg)

## Local Development

#### `dozer init`
Initializes a new Dozer project by generating the foundational `dozer-config.yaml` file within the current directory. This command can be skipped when the `dozer-config.yaml` is manually created.

#### `dozer live`
Initiates an in-browser interface for real-time Dozer application development. As the source code is modified in the IDE, changes are immediately reflected in this interface, enabling instant visualization and interactive testing. It streamlines the feedback loop, offering insights into data flows, configurations, and endpoints, all within the context of the live application.

#### `dozer`
Initiates Dozer in a non-interactive way, but starting both `app` and `api` as different threads of the same process.

## Self-Hosted Deployment

#### `dozer build`
This command is an essential step preceding deployment. During the build process, the current data schema and API configurations are finalized, ensuring that the data contract is consistently stored on disk. Each execution of the `dozer build` command results in the automatic creation of a new version, encapsulating the current state of the application. Consequently, any modifications to the application, such as changes in SQL leading to alterations in the API schema, necessitate a fresh build and the subsequent generation of a distinct version to capture these updates.

#### `dozer run app`
This command initiates the app component of a Dozer application as an isolated process. This component is responsible for establishing connections to data sources and performing real-time data processing tasks.

#### `dozer run api`
This command launches the API component of a Dozer application as an isolated process. This component manages the low-latency data store and gRPC services. It connects to its corresponding upstream app component to receive and handle processed data in real-time.


## Dozer Cloud Deployment
Coming Soon!