# Functions and Operators

## Functions

### Numeric

| Function      | Input Type           | Return Type          | Description                                       |
|---------------|----------------------|----------------------|---------------------------------------------------|
| `ABS(V)`      | `NUMERIC`            | `NUMERIC`            | Calculates the absolute value of `V`              |
| `ROUND(V, D)` | `FLOAT` or `DECIMAL` | `FLOAT` or `DECIMAL` | Rounds a number `V` with `D` number with decimals |

### Aggregation

| Function   | Input Type              | Return Type                                           | Description                                                   |
|------------|-------------------------|-------------------------------------------------------|---------------------------------------------------------------|
| `AVG(V)`   | `NUMERIC`               | Returns `FLOAT` if `V` is `FLOAT` otherwise `DECIMAL` | Calculates cumulative `V` executed over multiple input values |
| `COUNT(V)` | `ANY`                   | `UINT`                                                | Calculates the cumulative count over multiple values          |
| `MAX(V)`   | `NUMERIC` or `DATETIME` | `NUMERIC` or `DATETIME`                               | Calculates maximum over a list of values                      |
| `MIN(V)`   | `NUMERIC` or `DATETIME` | `NUMERIC` or `DATETIME`                               | Calculates minimum over a list of values                      |
| `SUM(V)`   | `NUMERIC`               | `NUMERIC`                                             | Calculates the sum over a list of values                      |

### String

| Function                                                | Input Type                                 | Return Type        | Desctiption                                                                                                                                                                                                                                                    |
|---------------------------------------------------------|--------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `TRIM([[LEADING or TRAILING or BOTH] char FROM] value)` | `C` is `STRING`, `V` is `TEXT` or `STRING` | `TEXT` or `STRING` | Trims multiple leading or trailing characters `C` from a string `V` <br />`LEADING` Removes characters from the beginning of `V` <br />`TRAILING` Removes characters from the end of `V` <br />`BOTH` Removes characters from the beginning and the end of `V` |
| `UCASE(V)`                                              | `TEXT` or `STRING`                         | `TEXT` or `STRING` | Transform `V` into uppercase characters <br /> `V` is TEXT or STRING <br /> Returns the same type as `V`                                                                                                                                                       |

### Geospatial

| Function                                              | Input Type              | Return Type                                                | Description                                                                 |
|-------------------------------------------------------|-------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------|
| `DISTANCE(A, B, [GEODESIC or HAVERSINE or VINCENTY])` | `A` and `B` are `POINT` | Returns a `FLOAT`, if `A` or `B` are `NULL` returns `NULL` | Gets distance between `A` and `B`. By default `GEODESIC` algorithm is used. |


### JSON

| Function                   | Input Type              | Return Type                                           | Description                                                                                         |
|----------------------------|-------------------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `JSON_VALUE(expression , path)` | `JSON`, `STRING` | `SCALAR`  | Extracts a scalar value from a JSON string. The `expression` is a JSON object and `path` specifies the item to extract. |
| `JSON_QUERY(expression [ , path ])` | `JSON`, `STRING` | `OBJECT` or `ARRAY` | Extracts an object or an array from a JSON string. Default path for the query function is $ which means the original JSON. |

Here's how you can use these functions in SQL. Given the following JSON:

```json
{
  "test_jsonb": {"bar": {"1": 1, "2": 2, "3": 3}, "baz": null, "foo": [1, 2, 3]},
  "test_json": [{"digit": 30, "letter": "A"}, {"digit": 31, "letter": "B"}]
}
```

You can write the following SQL query:

```sql
select
    JSON_QUERY(test_jsonb,'$.bar') AS bar,
    JSON_VALUE(test_jsonb,'$.baz') AS baz,
    JSON_QUERY(test_jsonb,'$.foo') AS foo,
    JSON_VALUE(test_json,'$[0].letter') AS first_letter,
    JSON_QUERY(test_json) AS all
  into test_uuid_test
  from test_uuid;

  select
    JSON_QUERY(test_json,'$[*].digit') AS all_digits
  into test_uuid_res
  from test_uuid;
```

This would return:

<details>

```json
"bar": {
    "struct_value": {
        "fields": [
            {
                "key": "1",
                "value": {
                    "number_value": 1
                }
            },
            {
                "key": "2",
                "value": {
                    "number_value": 2
                }
            },
            {
                "key": "3",
                "value": {
                    "number_value": 3
                }
            }
        ]
    }
},
"baz": {
    "null_value": "NULL_VALUE"
},
"foo": {
    "list_value": {
        "values": [
            {
                "number_value": 1
            },
            {
                "number_value": 2
            },
            {
                "number_value": 3
            }
        ]
    }
},
"first_letter": {
    "list_value": {
        "values": [
            {
                "string_value": "A"
            }
        ]
    }
},
"all": {
    "list_value": {
        "values": [
            {
                "list_value": {
                    "values": [
                        {
                            "struct_value": {
                                "fields": [
                                    {
                                        "key": "letter",
                                        "value": {
                                            "string_value": "A"
                                        }
                                    },
                                    {
                                        "key": "digit",
                                        "value": {
                                            "number_value": 30
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "struct_value": {
                                "fields": [
                                    {
                                        "key": "letter",
                                        "value": {
                                            "string_value": "B"
                                        }
                                    },
                                    {
                                        "key": "digit",
                                        "value": {
                                            "number_value": 31
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

```json

"all_digits": {
    "list_value": {
        "values": [
            {
                "number_value": 30
            },
            {
                "number_value": 31
            }
        ]
    }
}
```
</details>

## Operators

### Comparison

| Operator | Data Types & Usage                                                                                                      | Description                                                                                        |
|----------|-------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<`      | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is smaller than the second operand, otherwise `FALSE`          |
| `>`      | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is bigger than the second operand, otherwise `FALSE`           |
| `=`      | `ANY` `=` `ANY` ➜ `BOOLEAN`                                                                                             | Returns `TRUE` if the first operand is equal to the second operand, otherwise `FALSE`              |
| `!=`     | `ANY` `!=` `ANY` ➜ `BOOLEAN`                                                                                            | Returns `TRUE` if teh first operand is not equal to the second operand, otherwise `FALSE`          |
| `<=`     | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is smaller or equal than the second operand, otherwise `FALSE` |
| `>=`     | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is bigger or equal than the second operand, otherwise `FALSE`  |

### Logical

| Operator | Data Types & Usage                    | Description                                                          |
|----------|---------------------------------------|----------------------------------------------------------------------|
| `AND`    | `BOOLEAN` `AND` `BOOLEAN` ➜ `BOOLEAN` | Returns `TRUE` if both operans are `TRUE`, otherwise `FALSE`         |
| `OR`     | `BOOLEAN` `OR` `BOOLEAN` ➜ `BOOLEAN`  | Returns `TRUE` any of the two oiperants is `TRUE`, otherwise `FALSE` |
| `NOT`    | `NOT` `BOOLEAN` ➜ `BOOLEAN`           | Returns `TRUE` if operand is `FALSE`, otherwise `FALSE`              |

### Mathematical

| Operator | Data Types                                                                                                                                         | Description                                                                 |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `+`      | `NUMERIC` `+` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Sums two operand                                                            |
| `-`      | `NUMERIC` `-` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Substracts the second operand from the first one and returns the difference |
| `*`      | `NUMERIC` `*` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Multiplies two operands                                                     |
| `/`      | `UINT` `/` `NUMERIC` ➜ `FLOAT` <br/> `INT` `/` `NUMERIC` ➜ `FLOAT` <br/> `FLOAT` `/` `NUMERIC` ➜ `FLOAT` <br/> `DECIMAL` `/` `NUMERIC` ➜ `DECIMAL` | Divides the first operands by the second operand and returns teh result     |
| `%`      | `NUMERIC` `%` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Calculate the modulo between two operands                                   |
