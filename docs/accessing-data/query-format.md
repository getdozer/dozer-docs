# Query Format
The Dozer query system uses a JSON-based language. Below, you'll find a comprehensive guide detailing each component of this query language.

### QueryExpression

This is the main structure used to build your query. It consists of:

| Parameter      | Description                                                   |
|----------------|---------------------------------------------------------------|
| `filter`       | Used to specify the filter conditions.                        |
| `order_by`     | Details how results should be ordered.                        |
| `limit`        | Limits the number of results returned.                        |
| `skip`         | Specifies the number of results to skip or provides a start point. |
| `after`        | Begins retrieval after a certain `__dozer_record_id`.         |


#### Example:

```json
{
    "filter": {"age": {"$gt": 21}},
    "order_by": {"field_name": "asc"},
    "limit": 10,
    "skip": 20
}
```

### Filter Expression

Filters allow you to refine the data you retrieve from the dataset. They are composed of key-value pairs, where the key represents the field name and the value can either be another key-value pair denoting the operator and its corresponding value or a direct value implying the equality operator.

#### Simple Filters:
For filtering a specific field to a value, you can directly assign the value to the field. By default, this implies an equality (`$eq`) comparison.

```json
{
    "$filter": {"PULocationID": 211}
}
```

#### Using Operators:
You can employ operators for more complex comparisons. The operator will be defined as a key inside the field you're looking to filter.

```json
{
    "$filter": {"age": {"$gt": 21}}
}
```

#### Compound Filters (`And`):
To combine multiple filters, you can use the `$and` operator, which accepts an array of filter conditions. All conditions inside the array must be true for the filter to match a record.

Using implicit equality:
```json
{
    "$filter": {"$and": [{"PULocationID": 236}, {"DOLocationID": 100}]}
}
```

Using explicit operators:
```json
{
    "$filter": {"$and": [{"PULocationID": {"$eq": 236}}, {"DOLocationID": {"$eq": 100}}]}
}
```

### Sort Options and Direction

This structure is used to define the order of the results:

| Name         | Type   | Description                                        |
|--------------|--------|----------------------------------------------------|
| `field_name` | String | Name of the field to sort by.                      |
| `direction`  | Enum   | Either `asc` for ascending or `desc` for descending. |


```json
{
    "order_by": {"field_name" : "asc"}
}
```

### Skip

The `skip` attribute lets you bypass a certain number of records before starting the data retrieval. It's useful for pagination scenarios or when you want to ignore a specified amount of leading records.

```json
{
    "$limit": 3, 
    "$filter": {"PULocationID": 211}, 
    "$skip": 5
}
```

In this example, the first 5 records are skipped, and the data retrieval starts from the 6th record.

### After

The `after` attribute is used to begin retrieving records after a specified `__dozer_record_id`. This is especially useful when you want to retrieve records after a known point in your dataset, potentially due to past queries or logical segmentation of data.

```json
{
    "$limit": 3, 
    "$filter": {"PULocationID": 211}, 
    "$after": 145
}
```

In this example, records retrieval starts after the record with `__dozer_record_id` of 145.


### Operators

Operators are used within filter expressions to compare values:

| Operator       | Description                       |
|----------------|-----------------------------------|
| `$lt`          | Less Than                         |
| `$lte`         | Less Than or Equal                |
| `$eq`          | Equal                             |
| `$gt`          | Greater Than                      |
| `$gte`         | Greater Than or Equal             |
| `$contains`    | Contains the specified value.     |
| `$matches_any` | Matches any of the specified values. |
| `$matches_all` | Matches all of the specified values. |


#### Example:

To filter records where a field named "age" is greater than 21:

```json
{
    "filter": {
        "Simple": ["age", {"$gt": 21}]
    }
}
```
