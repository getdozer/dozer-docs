# Adding Transformations

To further aggregate on trips data with zone lookup, you can utilize real-time sql transformation as part of your `dozer-config.yaml`.

```yaml
sql: |
  SELECT t.tpep_pickup_datetime AS pickup_time, z.Zone AS zone
  INTO pickup
  FROM yellow_trips t 
  JOIN zones z 
    ON t.PULocationID = z.LocationID;
```

`SELECT` statement with `JOIN` ON zone lookup to transform your raw data and export that result using `INTO` clause. Once this is done, you can use that `INTO` temporary view in your endpoints directly.

```yaml
endpoints:
  - name: pickup
    path: /pickup
    table_name: pickup  # match with sql INTO clause
```

<br /><br />

Want to jump into the end result? Here is the [link](https://github.com/getdozer/dozer/blob/main/examples/4_supabase_s3/dozer-config.yaml) for you to download the whole `dozer-config.yaml` for you to get started.
