# Primitives Aggregation Functions

### `AVG()`
Calculates the cumulative average value of a numeric column.

#### Syntax
```sql
AVG(expr) 
```
#### Arguments
| Name   | Type                                                             | Description                                                                                                                                     |
|--------|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `expr` | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) | The [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) expression or column name for which the average value is to be calculated. |

#### Returns
The average value of the given numeric expression or column as a `FLOAT` value if `value` is `FLOAT`, otherwise `DECIMAL`


### `COUNT()`
Calculates the cumulative number of items in a column.

#### Syntax
```sql
COUNT(expr, expr, expr, ...) 
```
#### Arguments
| Name   | Type | Description                                                                                                             |
|--------|------|-------------------------------------------------------------------------------------------------------------------------|
| `expr` | ANY  | An expression or column name to count non `NULL` values. Using `*` counts all rows, including those with `NULL` values. |

#### Returns
A `UINT` representing the number of items in the given set or column. If there are no matching rows, the function returns `0`.


### `MAX()`
Calculates the maximum value in a column.

#### Syntax
```sql
MAX(expr) 
```
#### Arguments
| Name   | Type                                                                                                                                      | Description                                                                   |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `expr` | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime) | An expression or column name from which the maximum value is to be determined |

#### Returns
The highest [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)
 value from the specified column. If there are no non-NULL values in the column or set, the function returns NULL.


### `MAX_VALUE()`
Calculates the maximum value based on the evaluation of the `eval_expr`. If `eval_expr` results in the maximum value among its peers, the function returns the corresponding `return_expr`.

#### Syntax
```sql
MAX_VALUE(eval_expr, return_expr) 
```

#### Arguments  
| Name          | Type        | Description  |
|---------------|-------------|--------------|
| `eval_expr`     | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)  | The expression that is evaluated to determine the maximum value. |
| `return_expr`   | ANY  | The value to be returned when `eval_expr` achieves the minimum value. |

#### Returns  
The value of `return_expr` when `eval_expr` is the maximum. The data type of the returned value depends on the type of `return_expr`.

#### Example
Suppose we have a table `sales` with two columns, `product_id` and `units_sold`. If we want to find out which product has the most units sold, and return its product ID:

```sql
SELECT MAX_VALUE(units_sold, product_id) FROM sales;
```

In this example, the function evaluates each row's `units_sold` value. Once it identifies the row with the most units sold, it will return the corresponding `product_id`.

### `MIN()`
Calculates the minimum value in a column.

#### Syntax
```sql
MIN(expr) 
```
#### Arguments
| Name   | Type                                                                                                                                      | Description                                                                   |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `expr` | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime) | An expression or column name from which the minimum value is to be determined |

#### Returns
The lowest [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)
 value from the specified column. If there are no non-NULL values in the column or set, the function returns NULL.

### `MIN_VALUE()`
Calculates the minimum value based on the evaluation of the `eval_expr`. If `eval_expr` results in the minimum value among its peers, the function returns the corresponding `return_expr`.

#### Syntax
```sql
MIN_VALUE(eval_expr, return_expr) 
```

#### Arguments  
| Name          | Type        | Description  |
|---------------|-------------|--------------|
| `eval_expr`     | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)  | The expression that is evaluated to determine the minimum value. |
| `return_expr`   | ANY  | The value to be returned when `eval_expr` achieves the minimum value. |

#### Returns  
The value of `return_expr` when `eval_expr` is the minimum. The data type of the returned value depends on the type of `return_expr`.

#### Example
Suppose we have a table `sales` with two columns, `product_id` and `units_sold`. If we want to find out which product has the least units sold, and return its product ID:

```sql
SELECT MIN_VALUE(units_sold, product_id) FROM sales;
```

In this example, the function evaluates each row's `units_sold` value. Once it identifies the row with the least units sold, it will return the corresponding `product_id`.

### `SUM()`
Calculates the cumulative sum of a numeric column.

#### Syntax
```sql
SUM(expr) 
```
#### Arguments
| Name   | Type                                                             | Description                                                   |
|--------|------------------------------------------------------------------|---------------------------------------------------------------|
| `expr` | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) | An expression or column name whose values are to be summed up |

#### Returns
The total sum of the specified column or set of values as a [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) value, dependoing on the input type. If the column or set contains no non `NULL` values, the function returns `NULL`.

