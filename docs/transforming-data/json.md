# JSON Support

Dozer provides native support for [JSON](/transforming-data/data-types#other) data types, catering to structured yet flexible data representation. Integrated primitive functions enable direct extraction from JSON fields using JSON path expressions, eliminating the need for intermediate parsing or deserialization. This integrated capability allows efficient querying and manipulation of nested JSON objects, streamlining operations on complex data hierarchies.

## JSON Functions

### JSON_QUERY()
Extracts a JSON sub-object from a larger JSON object based on the provided JSON path.

#### Syntax
```
JSON_QUERY(expression [,path])`
```

#### Arguments
| Name         | Type       | Description                                               |
|--------------|------------|-----------------------------------------------------------|
| `expression` | `JSON`     | The column or JSON string from which the value will be extracted.  |
| `path`       | `STRING`   | The JSON path expression used to specify which sub-object should be retrieved. |

#### Returns
The function returns the `JSON` sub-object from the `expression` based on the specified `path`. If the target of the JSON path is a scalar value, the function returns a JSON string representation of that value.  Default path for the query function is $ which translates into the the original input JSON.

#### Example
Given the following JSON
```json
{
  "test_jsonb": {"bar": {"1": 1, "2": 2, "3": 3}, "baz": null, "foo": [1, 2, 3]},
  "test_json": [{"digit": 30, "letter": "A"}, {"digit": 31, "letter": "B"}]
}
```
The query below
```sql
select
  JSON_QUERY(test_json,'$[*].digit') AS all_digits
into test_uuid_res
from test_uuid;
```
would return the following result
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


### JSON_VALUE()
The `JSON_VALUE` function retrieves a value from a JSON object based on the provided JSON path. Unlike `JSON_QUERY`, which returns a JSON sub-object, `JSON_VALUE` returns the value as a primitive data type.

#### Syntax
```
JSON_VALUE(expression, path)
```

#### Arguments
| Name         | Type       | Description                                               |
|--------------|------------|-----------------------------------------------------------|
| `expression` | `JSON`     | The column or JSON string from which the value will be extracted.  |
| `path`       | `STRING`   | he JSON path expression used to pinpoint the specific scalar value within the JSON object |

#### Returns
A scalar value extracted from the `expression` based on the given `path`. If the specified JSON path doesn't locate any data, the function returns NULL. If the target of the JSON path is a non-scalar value (e.g., an array or object), an error is raised.

#### Example
Given the following JSON
```json
{
  "test_jsonb": {"bar": {"1": 1, "2": 2, "3": 3}, "baz": null, "foo": [1, 2, 3]},
  "test_json": [{"digit": 30, "letter": "A"}, {"digit": 31, "letter": "B"}]
}
```
The query below
```sql
select
    JSON_QUERY(test_jsonb,'$.bar') AS bar,
    JSON_VALUE(test_jsonb,'$.baz') AS baz,
    JSON_QUERY(test_jsonb,'$.foo') AS foo,
    JSON_VALUE(test_json,'$[0].letter') AS first_letter,
    JSON_QUERY(test_json) AS all
  into test_uuid_test
  from test_uuid;
```
would return the following result
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

