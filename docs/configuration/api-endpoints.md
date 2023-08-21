# API Endpoints
API endpoints in Dozer allow you to expose both gRPC and REST APIs for seamless data access. In this section, you can define the endpoint names, paths, and associate them with data sources or transformed results.

## Basic Endpoint Configuration

Endpoints can be tied directly to a source or to an SQL-transformed result. Here are some examples:

```yaml
endpoints:
  # Exposing API directly from a source
  - name: trips
    path: /trips
    table_name: trips

  # Exposing SQL-transformed results
  - name: result
    path: /result
    table_name: result
    
  - name: result_3
    path: /result_3
    table_name: result_3
```

## Indexes

Indexes help optimize the speed and efficiency of queries. You can define primary, secondary, or full-text indexes based on your needs.

### Primary Indexes
You can explicitly define primary indexes for your tables. However, it's important to note that when your SQL transformations include a `GROUP BY` clause, primary indexes are automatically set based on the field names within that `GROUP BY` clause. This ensures optimal querying performance on aggregated data.

```yaml
endpoints:
  - name: result_3
    path: /result_3
    table_name: result_3
    index:
      primary:
        - region
```

### Secondary and Full-Text Indexes

For more complex querying capabilities, consider adding secondary or full-text indexes:

```yaml
endpoints:
  - name: trips
    path: /trips
    table_name: trips
    index:
      secondary:
        create:
          - index: !SortedInverted
              fields:
                - hvfhs_license_num
                - trip_miles
```

When structuring your indexes, always consider your application's querying needs and performance requirements.
