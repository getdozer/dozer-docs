# Transformations
To cater to intricate data transformation requirements, the Dozer configuration supports complex SQL statements. For a better understanding, consider the following guidelines:

## Multi-Line SQL Statements:
When your transformation logic spans multiple lines, utilize the pipe (`|`) symbol for clarity:

```yaml
sql: |
  SELECT 
    id, first_name, last_name, number, age
  INTO result
  FROM users
  WHERE age > 20;
```

## Combining Multiple Transformations:
Under the `sql` key, you can sequence various transformation statements, each exposing its own distinct result via individual `INTO` clauses:

```yaml
sql: |
  SELECT * 
  INTO result_1 
  FROM trips
  JOIN users ON users.id = trips.customer_id;

  SELECT 
    id, first_name, last_name, number, age
  INTO result_2
  FROM users
  WHERE age > 20;

  SELECT COUNT(*)
  INTO result_3
  FROM trips
  GROUP BY region;
```

For additional details and available SQL functions, consult the [SQL Functions Guide](/transforming-data).

## External SQL Files

For better organization, especially when dealing with a multitude of complex transformations, it's possible to save your SQL transformations in separate files. Simply place these `*.sql` files under the `./queries` directory.

For instance, if you have a transformation stored in `basic.sql`:

```sql
-- File: ./queries/basic.sql

SELECT 
  region, COUNT(*)
INTO regional_counts
FROM trips
GROUP BY region;
```
Dozer will automatically recognize and load all SQL files in this directory, integrating their results into the overall data pipeline.

## User Defined Functions (UDFs)

Dozer supports ONNX based UDFs that can be used as the part of the SQL transformation.
Following would be an example configuration for UDFs.

```yaml
udfs:
   name: is_fraudulent
   config: !Onnx
     path: ./path/to/model/model_file
```

Under sql block, utilizing the function name defined from udf, you can introduce new aggregation.

```yaml
sql: |
  SELECT 
    is_fraudulent(col1, col2, col3, col4) 
  INTO res 
  FROM onnx_test;
```
