# Primitives Scalar Functions

## Numeric

### `ABS()`
Returns the absolute value of a number, effectively removing any negative sign from it.

#### Syntax
```sql
ABS(expr) 
```
#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric)    | The [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) expression for which the absolute value is desired. |

#### Returns
The absolute number as a [`NUMERIC`](/transforming-data/data-types#numeric-types-numeric) value.


### `ROUND()`
Rounds a number to a specified number of decimals.

#### Syntax
```sql
ROUND(expr, decimals) 
```
#### Arguments
| Name     | Type                   | Description              |
|----------|------------------------|--------------------------|
| `expr`   | `FLOAT` or `DECIMAL`   | The numeric expression that represents the floating-point number you want to round. |
| `decimals`| `UINT`  | The number of decimal places to which the number should be rounded. If omitted, the function rounds to the nearest whole number. |

#### Returns
The rounded number as a `FLOAT` or `DECIMAL`, depending on the input type.



## Textual

### `TRIM()`
Removes specified prefix or suffix characters (or both) from a string. By default, it removes spaces if no character is specified.

#### Syntax
```sql
TRIM([[LEADING or TRAILING or BOTH] char FROM] expr)
```
#### Arguments
| Name     | Type                   | Description              |
|----------|------------------------|--------------------------|
| `LEADING` or `TRAILING` or `BOTH` |  |  Keywords to specify which part of the string to trim. `LEADING` trims the beginning, `TRAILING` the end, and `BOTH` trims both the beginning and end. If no keyword is chosen, `BOTH` behavior is default. |
| `char`   | [`TEXTUAL`](/transforming-data/data-types#textual-types-textual)   | The character(s) to be removed. If not provided, spaces will be removed by default. |
| `expr`| [`TEXTUAL`](/transforming-data/data-types#textual-types-textual)  | The [`TEXTUAL`](/transforming-data/data-types#textual-types-textual) expression from which the characters will be removed. |

#### Returns
A [`TEXTUAL`](/transforming-data/data-types#textual-types-textual) value where the specified character(s) have been removed from the beginning and/or end of the original string. If the character to be trimmed isn't found in the specified positions, it will return the original string unchanged.


### `UCASE()`
Converts all characters in a provided string to uppercase.

#### Syntax
```sql
UCASE(expr)
```

#### Arguments
| Name     | Type         | Description              |
|----------|--------------|--------------------------|
| `expr`  | [`TEXTUAL`](/transforming-data/data-types#textual-types-textual)    | The [`TEXTUAL`](/transforming-data/data-types#textual-types-textual) expression to be converted to uppercase. |

#### Returns
A [`TEXTUAL`](/transforming-data/data-types#textual-types-textual) where all alphabetic characters are in uppercase. Non-alphabetic characters remain unchanged.

