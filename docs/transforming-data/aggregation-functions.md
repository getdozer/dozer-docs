# Primitives Aggregation Functions

### `AVG()`
Calculates the cumulative average executed over multiple input values

#### Syntax
```sql
AVG(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric)    | An expression returning the value to be added to the cumulative average |

#### Returns
The cumulative average as a `FLOAT` value if `value` is `FLOAT`, otherwise `DECIMAL`


### `COUNT()`
Calculates the cumulative count over multiple values

#### Syntax
```sql
COUNT(expr, expr, expr, ...) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | Array of ANY    | A list of expressions  |

#### Returns
The cumulative count as a `UINT` value


### `MAX()`
Calculates maximum over a list of values

#### Syntax
```sql
MAX(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)  | An expression returning the value to be added to the maximum value candidates |

#### Returns
The maximum value as [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)


### `MIN()`
Calculates minimum over a list of values

#### Syntax
```sql
MIN(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)  | An expression returning the value to be added to the minimum value candidates |

#### Returns
The minimum value as [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) or [`DATETIME`](/transforming-data/data-types#date--time-types-datetime)


### `SUM()`
Calculates the cumulative sum executed over multiple input values

#### Syntax
```sql
SUM(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric)    | An expression returning the value to be added to the cumulative sum |

#### Returns
The cumulative sum as a [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) value

