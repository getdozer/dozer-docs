# Deployment
In Dozer's architecture, there are two core components: the **app** module, responsible for data source connections and data processing, and the **API** module, which manages data storage in a low-latency store and handles API interactions. During development, these modules coexist in a singular process. However, for production deployment, it's best practice to decouple them, ensuring independent lifecycle management. This decoupling allows for, say, alterations in data processing logic in the **app** module without perturbing the uptime or performance of the **API** module.



To different deployment types are available for your dozer application. All deployment types' basis is your dozer application's `dozer-config.yaml`.

## Using Dozer Cloud

You can utilize what we already provide called Dozer Cloud. It takes care of deployment of your dozer applications on the cloud, and let you version the API and monitor them using dashboard without the burden of setting up the whole cloud environment by yourself.  

### `dozer cloud login`

Easiest way to log in to your cloud is go to your dashboard, there would be a pop-up containing your login information as a one liner command.
Or else you can fetch access related information from setting tab.

### `dozer cloud deploy`

Once you're logged in, you can deploy your local dozer application easily by just running `dozer cloud deploy` in your workspace.

## Using Docker

We do expose the latest dozer version as a public docker images. Following would be a template for you to build your application's docker image to deploy.


Following example will explain the structure of the deployment in 3 parts:
- environment variable setting as `x-common-variables`
- 3 services
  - `dozer-build`
  - `dozer-app`
  - `dozer-api`
- network connectivity with app host in `dozer-config.yaml`

Full sample of Snowflake local deployment configurations can be found [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/snowflake).

```yaml
version: '3.9'

x-common-variables: &commonEnvironment
  # list out environment variable required in your dozer application
  ACCESS_KEY_ID: ${ACCESS_KEY_ID}
  SECRET_ACCESS_KEY: ${SECRET_ACCESS_KEY}
  # this is a required line for network
  APP_HOST: "0.0.0.0"

services:
  dozer-build:
    container_name: dozer-build
    image: public.ecr.aws/getdozer/dozer:latest
    # use dozer-features image for kafka and snowflake connectors
    # image: public.ecr.aws/getdozer/dozer-features:latest
    environment: *commonEnvironment
    working_dir: /usr/local/bin
    volumes:
      - ./dozer-config.yaml:/usr/local/bin/dozer-config.yaml
      - ./.dozer:/usr/local/bin/.dozer
    command:
      - /bin/sh
      - -c
      - dozer build

  dozer-app:
    container_name: dozer-app
    image: public.ecr.aws/getdozer/dozer:latest
    # use dozer-features image for kafka and snowflake connectors
    # image: public.ecr.aws/getdozer/dozer-features:latest
    environment: *commonEnvironment
    ports:
      # Internal gRPC talks to api
      - "50053:50053"
    working_dir: /usr/local/bin
    volumes:
      - ./dozer-config.yaml:/usr/local/bin/dozer-config.yaml
      - ./.dozer:/usr/local/bin/.dozer
    command:
      - /bin/sh
      - -c
      - dozer run app
    depends_on:
      dozer-build:
        condition: service_completed_successfully
    stdin_open: true
    tty: true
    healthcheck:
      test: ["CMD", "curl", "0.0.0.0:50053", "--http2-prior-knowledge"]
      interval: 1s
      timeout: 20s
      retries: 90

  dozer-api:
    container_name: dozer-api
    links:
      - dozer-app
    image: public.ecr.aws/getdozer/dozer:latest
    # use dozer-features image for kafka and snowflake connectors
    # image: public.ecr.aws/getdozer/dozer-features:latest
    environment:
      <<: *commonEnvironment
      APP_HOST: 'dozer-app'
    ports:
      # REST APIs are published on port 8080
      - "8080:8080"
      # gRPC are available over 50051
      - "50051:50051"
    depends_on:
      dozer-app:
        condition: service_healthy
    working_dir: /usr/local/bin
    volumes:
      - ./dozer-config.yaml:/usr/local/bin/dozer-config.yaml
      - ./.dozer:/usr/local/bin//.dozer
    command:
      - /bin/sh
      - -c
      - dozer run api
    stdin_open: true
    tty: true
```

With above `docker-compose.yml`, run following command will pull dozer's docker image with your dozer configuration.

Make sure you add following lines in your `dozer-config.yaml` to allow network connectivity within your local deployment.
```yaml
api:
  app_grpc:
    host: "{{APP_HOST}}"
```

With following final command, you can run your local deployment of your dozer application.
```bash
docker-compose up
```
