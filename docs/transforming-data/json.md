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
Given a record containing a JSON column named `library`

```json
{
  "library": {
    "fiction": [
      {"title": "To Kill a Mockingbird", "author": "Harper Lee"},
      {"title": "1984", "author": "George Orwell"},
      {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"}
    ],
    "non_fiction": [
      {"title": "Sapiens", "author": "Yuval Noah Harari"},
      {"title": "Educated", "author": "Tara Westover"}
    ]
  }
}
```

if you wanted to extract just the titles of all fiction books, you can use the SQL statement below

```sql
select
  JSON_QUERY(library, '$.fiction[*].title') AS fiction_titles
into result_table
from library_data;
```

which would produce the result
```json
"fiction_titles": {
    "list_value": {
        "values": [
            {
                "string_value": "To Kill a Mockingbird"
            },
            {
                "string_value": "1984"
            },
            {
                "string_value": "The Great Gatsby"
            }
        ]
    }
}
```

This example provides a clearer use case, which is extracting the titles of fiction books from a library data set.


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
Given a record containing a JSON column named `library`

```json
{
  "library": {
    "fiction": [
      {"title": "To Kill a Mockingbird", "author": "Harper Lee"},
      {"title": "1984", "author": "George Orwell"},
      {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"}
    ],
    "non_fiction": [
      {"title": "Sapiens", "author": "Yuval Noah Harari"},
      {"title": "Educated", "author": "Tara Westover"}
    ]
  }
}
```

If you wanted to extract the author of the first fiction book, you can use the SQL statement below
```sql
select
  JSON_VALUE(library, '$.fiction[0].author') AS first_fiction_author
from library_data;
```
which would produce the result, with `first_fiction_author` as a `STRING` type
```
first_fiction_author: "Harper Lee"
```