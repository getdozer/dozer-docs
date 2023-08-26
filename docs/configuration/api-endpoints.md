# Endpoints
The endpoint configuration defines how Dozer should expose gRPC/REST endpoints. Each endpoint can be individually tailored to handle potential conflicts, routes, and indexing mechanisms.

```yaml
endpoints:
  - name: trips_cache  
    path: /trips
    table_name: trips_cache
    index:
      ...
    conflict_resolution: 
      ...
```

### Parameters
| Name                  | Type         | Description                                                                                                                         |
|-----------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `name`                | String       | The designated name of the endpoint.                                                                                                |
| `path`                | String       | Determines the route or path for the REST endpoint.                                                                                 |
| `table_name`          | String       | Identifies the name of the table in the source or in the SQL that this endpoint is set to expose.                                   |
| `index`               | Object       | An optional section that describes the index configuration for this endpoint, specifying primary and secondary indexes and whether to skip default configurations.  |
| `conflict_resolution` | Object       | An optional section that outlines the strategies to handle potential data conflicts for this endpoint.                              |

## Indexes
The `index` section of the endpoint configuration in Dozer determines how indexing is managed for the exposed endpoint. Appropriate indexing ensures quick data retrieval and can greatly improve query performance.

```yaml
index:
  primary_key:
    - pickup_location
    - dropoff_location
  secondary:
    create:
      - index: !SortedInverted
          fields:
            - hvfhs_license_num
            - trip_miles
  skip_default: 
```

### Parameters
| Name                                | Type                      | Description                                                                                                            |
|-------------------------------------|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| `primary_key`                        | List of Strings           | Defines the fields that compose the primary key for the endpoint. Essential for unique record identification.          |
| `secondary.create`                   | List of Objects           | An array of secondary index configurations.                 |
| ↳ `index`                            | Enum                      | Type of the secondary index. Examples: `!SortedInverted`, `!FullText`.                                                  |
| ↳ `fields`                           | List of Strings           | The fields that are covered by this secondary index configuration.                                                      |
| `skip_default`                       | Boolean                   | If set to true, instructs Dozer to bypass the default index configuration for the endpoint.  |


## Conflicts Resolution
The `conflict_resolution` section outlines the strategies to handle potential data conflicts within a Dozer endpoint. This section is optional.

```yaml
conflict_resolution:
  on_insert: !Update
  on_update: !Upsert
  on_delete: !Nothing
```

### Parameters
| Parameter   | Description                                                                                       | Options       |
|-------------|---------------------------------------------------------------------------------------------------|---------------|
| `on_insert` | Defines the action to be taken when a conflict arises during an insert operation.                  | `!Update`, `!Panic`, `!Nothing`  |
| `on_update` | Specifies the action to be taken when a conflict is detected during an update operation.           | `!Upsert`, `!Panic`, `!Nothing`  |
| `on_delete` | Designates the action to undertake when a conflict is perceived during a delete operation.         | `!Panic`, `!Nothing`             |

- `!Update`: This will result in an update of the conflicting record.
- `!Upsert`: If the record exists, it'll be updated; otherwise, a new record will be inserted.
- `!Panic`: The operation will stop immediately, and an error will be flagged.
- `!Nothing`: No action will be taken in response to the conflict.


---