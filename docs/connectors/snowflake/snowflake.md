---
description: Integration guide for Snowflake Connector
---

# Snowflake Connector Integration
Dozer's Snowflake connector integration utilizes Snowflake's Table Streams for real-time data integration and synchronization. Using Table Streams, Dozer captures and processes data changes from Snowflake tables, ensuring instant updates without constant polling or manual synchronization. The captured changes are efficiently stored in an embedded cache powered by LMDB, enabling lightning-fast data access and query performance.

Dozer's Snowflake connector integration simplifies data infrastructure by automating data synchronization, transformation, and API generation. With the automatic creation of seamless REST and gRPC API generation, developers can save time and effort while focusing on core application development.

# How to Connect Snowflake with Dozer

## Prerequisites
Before connecting Snowflake with Dozer, ensure you have already done the following:

- [Install Dozer](https://getdozer.io/docs/installation).
- [Install Docker](https://www.docker.com/).
- To connect Dozer with Snowflake, set up a Snowflake account and gather the following Snowflake parameters:
  - [Snowflake Account URL](https://docs.snowflake.com/en/user-guide/admin-account-identifier): Your Snowflake account URL, which you can get in your Snowflake account section. This parameter will be used as SN_SERVER for integration.
  - Snowflake Username: Your Snowflake account's username. This parameter will be used as SN_USER for integration.
  - Snowflake Password: Your Snowflake account's password. This parameter will be used as SN_PASSWORD for integration.
  - [Snowflake Database](https://docs.snowflake.com/en/user-guide/ui-snowsight-data-databases): Create a database within Snowflake, which will serve as your project database. This parameter will be used as SN_DATABASE for integration.
  - [Snowflake Warehouse](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse): Create a warehouse within Snowflake for your project. This parameter will be used as SN_WAREHOUSE for integration.
  - Snowflake Role: Your Snowflake account role. This parameter will be used as SN_ROLE for integration.

## Integrate Snowflake with Dozer

![](image1.png)

### Step 1: Create a Docker Provision File

To create a docker provision file, follow the steps below:

1. Create a new project directory on your local computer.
2. Create a file named **`docker-compose.yml`** file and fill the file with the following code:

```yaml
version: '3.9'
services:
  dozer:
    container_name: snowflake-dozer
    image: public.ecr.aws/getdozer/dozer-features:latest
    environment:
      SN_SERVER: ${SN_SERVER}
      SN_USER: ${SN_USER}
      SN_PASSWORD: ${SN_PASSWORD}
      SN_DATABASE: ${SN_DATABASE}
      SN_WAREHOUSE: ${SN_WAREHOUSE}
      SN_ROLE: ${SN_ROLE}
    ports:
      # REST APIs are published on port 8080
      - "8080:8080"
      # gRPC are available over 50051
      - "50051:50051"
    volumes:
      - ./dozer-config.yaml:/usr/dozer/dozer-config.yaml
      - ./.dozer:/usr/dozer/.dozer
    stdin_open: true
    tty: true

```

3. Replace the parameters in **Environment** fields with the Snowflake parameters you have just saved. See the code below for example:

```yaml
version: '3.9'
services:
  dozer:
    container_name: snowflake-dozer
    image: public.ecr.aws/getdozer/dozer-features:latest
    environment:
      SN_SERVER: dozer-test.snowflakecomputing.com
      SN_USER: dozerTest
      SN_PASSWORD: 'DozerSamplePassword!'
      SN_DATABASE: DOZER_SAMPLE_DATA
      SN_WAREHOUSE: COMPUTE_WH
      SN_ROLE: ACCOUNTADMIN
    ports:
      # REST APIs are published on port 8080
      - "8080:8080"
      # gRPC are available over 50051
      - "50051:50051"
    volumes:
      - ./dozer-config.yaml:/usr/dozer/dozer-config.yaml
      - ./.dozer:/usr/dozer/.dozer
    stdin_open: true
    tty: true

```

### Step 2: Create a Dozer Configuration File

To integrate with Dozer, create a Dozer configuration file by following the steps below:

1. On the same directory as the ` **docker-compose.yml`** , create a new file named ` **dozer-config.yaml** `.
2. Copy the code below and paste it into the ` **dozer-config.yaml`** file:

:::note
Ensure you have replaced the Config parameters with your Snowflake parameters.
:::

```yaml
app_name: snowflake-tutorial
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
    name: sn_data

sources:
  - name: customers
    connection: !Ref sn_data
    table_name: CUSTOMERS
    columns:

  - name: orders
    connection: !Ref sn_data
    table_name: ORDERS
    columns:

sql: |
  SELECT C_CUSTKEY, C_NAME, COUNT(O_CUSTKEY), AVG(O_TOTALPRICE)
  INTO customers_orders
  FROM customers
  JOIN orders 
  ON C_CUSTKEY = O_CUSTKEY
  GROUP BY C_CUSTKEY, C_NAME;

  SELECT C_CUSTKEY, C_NAME, C_ADDRESS, C_NATIONKEY, C_PHONE, C_ACCTBAL, C_MKTSEGMENT, C_COMMENT
  INTO customers_data
  FROM customers;

  SELECT O_ORDERKEY, O_CUSTKEY, O_ORDERSTATUS, O_TOTALPRICE, O_ORDERDATE, O_ORDERPRIORITY, O_CLERK, O_SHIPPRIORITY, O_COMMENT
  INTO orders_data
  FROM orders;

endpoints:
  - name: customers
    path: /customers
    table_name: customers_data
    index:
      primary_key:
        - C_CUSTKEY

  - name: orders
    path: /orders
    table_name: orders_data
    index:
      primary_key:
        - O_ORDERKEY

  - name: customers_orders
    path: /customers_orders
    table_name: customers_orders
    index:
      primary_key:
        - C_CUSTKEY
        - C_NAME

```

### Step 3: Run the Docker Command

After everything has been set up in your Snowflake folder, run the command below:

```bash
docker-compose up
```

This will automatically generate the seamless REST and gRPC API from the Snowflake Database you provided in the configuration files.

![](image4.gif)

### Step 4: Query the APIs

After generating the APIs, you can try querying the APIs using the Dozer's Snowflake React interface by following the steps below:

1. Clone the **dozer-samples** repository [here](https://github.com/getdozer/dozer-samples/tree/main).
2. Go to the **usecases** > **snowflake-react**.
3. Install the **script** by running the code below:

```bash
#Windows
npm install
#MacOs
yarn Install
```

4. Start the **Snowflake React interface** by running the code below:

```bash
#Windows
npm start
#MacOs
yarn start
```

5. Navigate to [http://localhost:3000](http://localhost:3000/) to see the data generated.

![](image2.gif)

An alternative approach is to utilize Postman for querying the generated example APIs. You can use the REST or gRPC Methods.

![](image3.gif)