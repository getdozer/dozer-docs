# Getting Started
For getting started with Dozer Analytics, create a new account at https://cloud.getdozer.io.

1) Start by creating a new project.

![Creating a new Project](./getting_started_pulse/create_new.png). 

2) Configure your project.
You ll be prompted to configure the project. You can do the following things using Dozer Analytics immediately. 

![Setup a new project](./getting_started_pulse/setup.png). 

1) Start ingesting data by leveraging one of the two methods. 

There are two ways developers can ingest data into Dozer. 
- Event Based Approach
- Dozer Connectors via CDC

### Event Based 
Developers can conveniently push data to Dozer using REST APIs which will be the easiest way to get started. Or if you are already leveraging Kafka `Dozer` can pull data from Kafka using Schema Registry for message parsging.

Typically you would ingest transactional or high volume data using this method. Dozer and Clickhouse boast amazing ingestion speeds when compared to other tools. 

### Data Stores, Data Lakes & Files

Dozer utilizes `Dozer Connectors` for keeping upto date with all the databases. It pulls data from various sources like databases, data lakes, and warehouses using Change Data Capture (CDC) and periodic polling mechanisms. This ensures up-to-date data ingestion in real-time or near-real-time.


### Ingest a sample Event
Click on the (+) Add Data Source and select Events. You can try ingesting a sample record using the ingest API. 

![Setup a new project](./getting_started_pulse/ingest.png)

### Sample Event
```bash

    curl  -X POST \
    'https://cloud.getdozer.io/apps/1001/ingest' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "name": "customers_2",
    "data": {
      "name": "Mr. Fox",
      "phone": "991",
      "email": "fox@disney.com"
    }
  }'
```


## Çreate an Endpoint

Now that you have access to a datasource, you can create an endpoint with a query. 
```bash

    curl  -X POST \
    'https://cloud.getdozer.io/apps/1001/endpoints' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "name": "customers_2",
    "query": "SELECT COUNT(*) as customer_count from customers"
  }'
  
```

Voila! You have created your first endpoint. Now you can use this as an API for calling Dozer Endpoint.