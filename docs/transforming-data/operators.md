# Operators

## Comparison

| Operator | Data Types & Usage                                                                                                      | Description                                                                                        |
|----------|-------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `<`      | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is smaller than the second operand, otherwise `FALSE`          |
| `>`      | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is bigger than the second operand, otherwise `FALSE`           |
| `=`      | `ANY` `=` `ANY` ➜ `BOOLEAN`                                                                                             | Returns `TRUE` if the first operand is equal to the second operand, otherwise `FALSE`              |
| `!=`     | `ANY` `!=` `ANY` ➜ `BOOLEAN`                                                                                            | Returns `TRUE` if teh first operand is not equal to the second operand, otherwise `FALSE`          |
| `<=`     | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is smaller or equal than the second operand, otherwise `FALSE` |
| `>=`     | `NUMERIC` `<` `NUMERIC` ➜ `BOOLEAN`<br/>`TEXTUAL` `<` `TEXTUAL` ➜ `BOOLEAN`<br/>`DATE/TIME` `<` `DATE/TIME` ➜ `BOOLEAN` | Returns `TRUE` if the first operand is bigger or equal than the second operand, otherwise `FALSE`  |

## Logical

| Operator | Data Types & Usage                    | Description                                                          |
|----------|---------------------------------------|----------------------------------------------------------------------|
| `AND`    | `BOOLEAN` `AND` `BOOLEAN` ➜ `BOOLEAN` | Returns `TRUE` if both operans are `TRUE`, otherwise `FALSE`         |
| `OR`     | `BOOLEAN` `OR` `BOOLEAN` ➜ `BOOLEAN`  | Returns `TRUE` any of the two oiperants is `TRUE`, otherwise `FALSE` |
| `NOT`    | `NOT` `BOOLEAN` ➜ `BOOLEAN`           | Returns `TRUE` if operand is `FALSE`, otherwise `FALSE`              |

## Mathematical

| Operator | Data Types                                                                                                                                         | Description                                                                 |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `+`      | `NUMERIC` `+` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Sums two operand                                                            |
| `-`      | `NUMERIC` `-` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Substracts the second operand from the first one and returns the difference |
| `*`      | `NUMERIC` `*` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Multiplies two operands                                                     |
| `/`      | `UINT` `/` `NUMERIC` ➜ `FLOAT` <br/> `INT` `/` `NUMERIC` ➜ `FLOAT` <br/> `FLOAT` `/` `NUMERIC` ➜ `FLOAT` <br/> `DECIMAL` `/` `NUMERIC` ➜ `DECIMAL` | Divides the first operands by the second operand and returns teh result     |
| `%`      | `NUMERIC` `%` `NUMERIC` ➜ `NUMERIC`                                                                                                                | Calculate the modulo between two operands                                   |
