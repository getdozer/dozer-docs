# Primitives Scalar Functions

## Numeric

### `ABS()`
Calculates the absolute value of of a number

#### Syntax
```sql
ABS(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric)    | An expression returning a [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) type |

#### Returns
The absolute number as a [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) value


### `ROUND()`
Rounds a number with a specified number of decimals

#### Syntax
```sql
ROUND(expr, decimals) 
```
#### Arguments
| Name     | Type                   | Description              |
|----------|------------------------|--------------------------|
| `expr`   | `FLOAT` or `DECIMAL`   | An expression returning a `FLOAT` or `DECIMAL` value |
| `decimals`| `UINT`  | Number of decimals |

#### Returns
The rounded number as a `FLOAT` or `DECIMAL`, depending on the input type



## Textual

### `TRIM()`
Trims one or multiple characters from a `TEXTUAL`

#### Syntax
```sql
TRIM([[LEADING or TRAILING or BOTH] char FROM] expr)
```
#### Arguments
| Name     | Type                   | Description              |
|----------|------------------------|--------------------------|
| `expr`   | `FLOAT` or `DECIMAL`   | An expression returning a `FLOAT` or `DECIMAL` value |
| `decimals`| `UINT`  | Number of decimals |

#### Returns
The rounded number as a `FLOAT` or `DECIMAL`, depending on the input type






| Function                                                | Input Type                                 | Return Type        | Desctiption                                                                                                                                                                                                                                                    |
|---------------------------------------------------------|--------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `TRIM([[LEADING or TRAILING or BOTH] char FROM] value)` | `C` is `STRING`, `V` is `TEXT` or `STRING` | `TEXT` or `STRING` | Trims multiple leading or trailing characters `C` from a string `V` <br />`LEADING` Removes characters from the beginning of `V` <br />`TRAILING` Removes characters from the end of `V` <br />`BOTH` Removes characters from the beginning and the end of `V` |
| `UCASE(V)`                                              | `TEXT` or `STRING`                         | `TEXT` or `STRING` | Transform `V` into uppercase characters <br /> `V` is TEXT or STRING <br /> Returns the same type as `V`                                                                                                                                                       |


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
