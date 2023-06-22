# Data Types Handling
Dozer natively supports these [data types](../data_types).

## Explicit and Implicit Casting

It is possible to explicitly cast between primitive types using the `CAST()` function. 

```
CAST(value AS [UINT | INT | FLOAT | DECIMAL | BOOLEAN | STRING | TEXT | TIMESTAMP | DATE)
```

However, DozerSQL automatically tries to cast between data types when a function is invoked with
incompatible argument types. The following tables explains how types can be casted between each other


| Target Type | Can be casted from type                                                                                                   | 
|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `UINT`      | `INT`, `STRING`, `NULL` (defaults to `0`)                                                                                 |
| `INT`       | `UINT`, `STRING`, `NULL` (defaults to `0`)                                                                                |
| `FLOAT`     | `DECIMAL`, `UINT`, `INT`, `NULL` (defaults to `0.0`)                                                                      |
| `DECIMAL`   | `FLOAT`, `UINT`, `INT`, `NULL` (defaults to `0.0`)                                                                        |
| `BOOLEAN`   | `INT`, `UINT`, `FLOAT`, `DECIAML`, `NULL` <br/> For all values `0` defaults to `FALSE`, any other number defaults to `TRUE` |
| `STRING`    | `TEXT`, `UINT`, `INT`, `FLOAT`, `DECIMAL`, `BOOLEAN`, `DATE`, `TIMESTAMP`, `BINARY`, `NULL`                               |
| `TEXT`      | `STRING`, `UINT`, `INT`, `FLOAT`, `DECIMAL`, `BOOLEAN`, `DATE`, `TIMESTAMP`, `BINARY`, `NULL`                             |
| `TIMESTAMP` | `STRING` (using RFC3339 format)                                                                                           |
| `DATE`      | `STRING` (using RFC3339 format)                                                                                           |



