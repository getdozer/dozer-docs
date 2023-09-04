# Kafka
This connector allows Dozer to ingest data directly from Kafka topics.

### Configuration
```yaml
connections:
  - config: !Kafka
      broker: {{broker_url}} 
      schema_registry_url: {{schema_registry_url}} 
    name: kafka_store
```

### Parameters
| Name                  | Type   | Description                                                                                                                                                                             |
|-----------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `broker`              | String | The URL of the Kafka broker. This address is where the Kafka instance resides, and it's the primary point from which Dozer retrieves data.                                               |
| `schema_registry_url` | String | The URL pointing to the Kafka Schema Registry.                                                          |

## Trying it out

To test a Kafka sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/kafka).


