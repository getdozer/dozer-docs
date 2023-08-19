# Query Format
The Dozer query system uses a JSON-based language. Below, you'll find a comprehensive guide detailing each component of this query language.

### QueryExpression

This is the main structure used to build your query. It consists of:

- `filter` (optional): Used to specify the filter conditions.
- `order_by`: Details how results should be ordered.
- `limit` (optional): Limits the number of results returned.
- `skip`: Specifies the number of results to skip or provides a point to start after.

#### Example:

```json
{
    "filter": {/* FilterExpression */},
    "order_by": {/* SortOptions */},
    "limit": 10,
    "skip": {/* Skip */}
}
```

### Filter Expression

Filters allow you to refine the data you retrieve from the dataset. They are composed of key-value pairs, where the key represents the field name and the value can either be another key-value pair denoting the operator and its corresponding value or a direct value implying the equality operator.

#### Simple Filters:
For filtering a specific field to a value, you can directly assign the value to the field. By default, this implies an equality (`$eq`) comparison.

Example:
```json
{
    "$filter": {"PULocationID": 211}
}
```

#### Using Operators:
You can employ operators for more complex comparisons. The operator will be defined as a key inside the field you're looking to filter.

Example:
```json
{
    "$filter": {"age": {"$gt": 21}}
}
```

#### Compound Filters (`And`):
To combine multiple filters, you can use the `$and` operator, which accepts an array of filter conditions. All conditions inside the array must be true for the filter to match a record.

Examples:

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

- `field_name`: Name of the field to sort by.
- `direction`: Either `asc` for ascending or `desc` for descending.

#### Example:

```json
{
    "order_by": {
        "field_name": "field_name",
        "direction": "asc"
    }
}
```

### Skip

Defines the number of results to skip or a point to start after:

- `Skip`: Skips a defined number of results.
- `After`: Begins results after a certain point.

#### Example:

```json
{
    "skip": {
        "Skip": 5
    }
}
```

or

```json
{
    "skip": {
        "After": 100
    }
}
```

### Operators

Operators are used within filter expressions to compare values:

- `$lt`: Less Than
- `$lte`: Less Than or Equal
- `$eq`: Equal
- `$gt`: Greater Than
- `$gte`: Greater Than or Equal
- `$contains`: Contains the specified value.
- `$matches_any`: Matches any of the specified values.
- `$matches_all`: Matches all of the specified values.

#### Example:

To filter records where a field named "age" is greater than 21:

```json
{
    "filter": {
        "Simple": ["age", {"$gt": 21}]
    }
}
```
