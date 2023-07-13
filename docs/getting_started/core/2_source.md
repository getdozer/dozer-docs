# Connecting to Data Sources

Let's use [NY taxi dataset](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page):
- ny yellow taxi trip data in parquet files uploaded on AWS S3
- zone lookup data in Postgres (we used [Supabase](https://supabase.com/) in this usecase)

## Connecting to S3

Following connection section in `dozer-config.yaml` will be taking care of the s3 connection to get the trip data.

```yaml
connections:
  - config : !S3Storage
      details:
        access_key_id: {{YOUR_ACCESS_KEY}}
        secret_access_key: {{YOUR_SECRET_KEY}}
        region: {{YOUR_REGION}}
        bucket_name: {{YOUR_BUCKET_NAME}}
      tables:
        - !Table
          name: yellow_trips
          config: !Parquet
            path: . # path to files or folder inside a bucket
            extension: .parquet
    name: s3
```

Update the config with your AWS s3 access keys with region and bucket name accordingly and if there is any path ahead of your file stored, specify that as well too.

```yaml
sources:
  - name: yellow_trips
    table_name: yellow_trips  # match with connection.config.tables.name
    connection: s3            # match with connections.name
```

## Connecting to Supabase PostgreSQL

In this usecase, you can use Postgres connection to get zone lookup data such as Supabase Postgres or local based Postgres.

```yaml
connections:
  - config: !Postgres
      user: {{PG_USER}}
      password: {{PG_PASSWORD}}
      host: {{PG_HOST}}
      port: {{PG_PORT}}
      database: {{PG_DATABASE}}
    name: pg
```

Like previous example populate config with necessary information or use environment variable to proceed.

```yaml
sources:
  - name: zones
    table_name: zones    # make sure it matches the table name in the pg database
    connection: pg       # match with connections.name
```

