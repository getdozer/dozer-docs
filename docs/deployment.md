# Deployment

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

```yaml
version: '3.9'
services:
  dozer:
    container_name: dozer-deployment
    image: public.ecr.aws/getdozer/dozer:latest
    # use dozer-features image for kafka and snowflake connectors
    # image: public.ecr.aws/getdozer/dozer-features:latest
    environment:
      # list out environment variable required in your dozer application
      ACCESS_KEY_ID: ${ACCESS_KEY_ID}
      SECRET_ACCESS_KEY: ${SECRET_ACCESS_KEY}
    ports:
      # REST APIs are published on port 8080
      - "8080:8080"
      # gRPC are available over 50051
      - "50051:50051"
    volumes:
      # attach your dozer configuration
      - ./dozer-config.yaml:/usr/dozer/dozer-config.yaml
      # atttch your dozer home directory
      - ./.dozer:/usr/dozer/.dozer
    stdin_open: true
    tty: true
```

With above `docker-compose.yml`, run following command will pull dozer's docker image with your dozer configuration.

```bash
docker-compose up --build
```
