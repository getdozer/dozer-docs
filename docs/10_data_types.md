# Data Types

The following data types are natively supported by Dozer.

## Primitive Types

### Numeric Types (`NUMERIC`)

Any numeric type, referred as `NUMERIC` in the rest of the documentation

| Type        | Descritpion                                                                                                                                            | Example             |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `UINT`      | Unsigned 64-bit integer                                                                                                                                | `1`                |
| `INT`       | Signed 64-bit integer                                                                                                                                  | `-1`                 |
| `FLOAT`     | 64-bit floating point number                                                                                                                           | `2.567`             |
| `DECIMAL`   | A Decimal number implementation suitable for financial calculations that require significant integral and fractional digits with no round-off errors.  | `DECIMAL(10.90001)` |

### Textual Types (`TEXTUAL`)

Any textual type, referred as `TEXTUAL` in the rest of the documentation

| Type        | Description                                                                    | Example                                               |
|-------------|--------------------------------------------------------------------------------|-------------------------------------------------------|
| `STRING`    | Variable length string                                                         | `'value1'`                                            |
| `TEXT`      | Variable length string. `TEXT` should be used for full-text indexable content. | `TEXT('The quick brown fox jumps over the lazy dog')` |
| `VARCHAR`   | Variable length string                                                         | `'value1'`                                            |
| `CHAR`      | Fixed length string                                                            | `'value1'`                                            |
| `BPCHAR`    | Blank-padded character                                                         | `'value1'`                                            |
| `TEXT[]`    | Array of `TEXT` type                                                           | `TEXT[]('value1', 'value2')`                          |
| `VARCHAR[]` | Array of `VARCHAR` type                                                        | `VARCHAR[]('value1', 'value2')`                       |
| `CHAR[]`    | Array of `CHAR` type                                                           | `CHAR[]('value1', 'value2')`                          |
| `BPCHAR[]`  | Array of `BPCHAR` type                                                         | `BPCHAR[]('value1', 'value2')`                        |

### Date / Time Types (`DATE/TIME`)

Any date and time related type, referred as `DATE/TIME` in the rest of the documentation

| Type        | Descritpion                                                               | Example                                        |
|-------------|---------------------------------------------------------------------------|------------------------------------------------|
| `TIMESTAMP` | A date time with supports for timezones, represented using RFC3339 format | `TIMESTAMP('2016-09-01T10:11:12.123456-0500')` |
| `DATE`      | A simple date, respresented using RFC3339 format                          | `DATE('2016-09-01')`                           |

### Other

| Type      | Descritpion                          | Example                                     |
|-----------|--------------------------------------|---------------------------------------------|
| `BINARY`  | A variable-length generic byte buffer | `BINARY('0xAC01CCAF5612')`                  |
| `JSON`    | A JSON object                        | `JSON('{"first_name": "John", age: 32}')`   |
| `POINT`   | A struct of coordinates              | `POINT(1.58, 29.06)`                        |
