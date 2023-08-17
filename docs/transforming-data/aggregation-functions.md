# Primitives Aggregation Functions

### `AVG()`
Calculates the cumulative average value of a numeric column.

#### Syntax
```sql
AVG(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric)    | The [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) expression or column name for which the average value is to be calculated. |

#### Returns
The average value of the given numeric expression or column as a `FLOAT` value if `value` is `FLOAT`, otherwise `DECIMAL`


### `COUNT()`
Calculates the cumulative number of items in a column.

#### Syntax
```sql
COUNT(expr, expr, expr, ...) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | ANY    | An expression or column name to count non `NULL` values. Using `*` counts all rows, including those with `NULL` values.  |

#### Returns
A `UINT` representing the number of items in the given set or column. If there are no matching rows, the function returns `0`.


### `MAX()`
Calculates the maximum value in a column.

#### Syntax
```sql
MAX(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)  | An expression or column name from which the maximum value is to be determined |

#### Returns
The highest [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)
 value from the specified column. If there are no non-NULL values in the column or set, the function returns NULL.


### `MIN()`
Calculates the minimum value in a column.

#### Syntax
```sql
MIN(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)  | An expression or column name from which the minimum value is to be determined |

#### Returns
The lowest [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)
 value from the specified column. If there are no non-NULL values in the column or set, the function returns NULL.


### `SUM()`
Calculates the cumulative sum of a numeric column.

#### Syntax
```sql
SUM(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric)    | An expression or column name whose values are to be summed up |

#### Returns
The total sum of the specified column or set of values as a [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) value, dependoing on the input type. If the column or set contains no non `NULL` values, the function returns `NULL`.

