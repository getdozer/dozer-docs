# Transforming Data using SQL

Dozer allows users to perform SQL queries and operations on streaming data in real-time. 
It supports operations such as filtering, aggregating, and joining with other data streams. 
Upon startup, Dozer converts the provided query into an execution plan for real-time processing, 
which is then used to process incoming data, produce results, and send them to a caching layer. 
Dozer's SQL adheres to standard ANSI SQL as much as possible, however some features of the language are still under development.

## Supported Constructs

DozerSQL is a specialized component within the Dozer platform that is designed specifically for preparing streaming data 
for storage in a cache. This involves extracting, transforming and filtering the data using `SELECT` statements, 
which are the only type of SQL statement supported by DozerSQL. The output of DozerSQL is a stream of data that 
is ready to be inserted into a cache, in order to increase performance and scalability of the data pipeline. 
DozerSQL works in real-time and only `SELECT` statement are supported, with the goal of providing optimized 
data preparation step prior to be inserted into cache. 

### SELECT

DozerSQL supports a quasi ANSI compatible version of `SELECT`:

```sql
SELECT [connection.][table1.]field [AS alias] [, [connection.][table2.]field [AS alias]]
INTO store_name,
FROM [table or SELECT statement | CTE] [alias] [[INNER | LEFT | RIGHT] JOIN [table2] ON [fields equality condition]]
WHERE [filter condition]
[UNION | UNION ALL]
...
```

#### Breakdown:

1. **SELECT Clause**:
   - `connection.`: Optionally specify the connection name, ensuring you can pull data from tables across various connections.
   - `table1.`: Optionally state the name of the table from which the field is being selected.
   - `field`: The specific column or field you're targeting.
   - `AS alias`: This gives you the option to rename the resulting field.

2. **INTO Clause**:
   - `store_name`: The destination where the `SELECT` query's results will be stored.

3. **FROM Clause**:
   - `table`: This is the primary source of data.
   - `SELECT statement`: A subquery that functions as a derived table, serving as an alternative to a direct table selection.
   - `CTE (Common Table Expression)`: This creates a temporary result set that can be referenced within the main SQL query.
   - `alias`: Optionally assign an alias to the table, subquery, or CTE, making it easier to refer to in other parts of the query.

4. **JOIN Clause**:
   - `INNER | LEFT | RIGHT`: These dictate the kind of join:
     - `INNER JOIN`: Fetches rows that match the join condition from both tables.
     - `LEFT JOIN`: Retrieves all rows from the left table and those from the right table that match the join condition.
     - `RIGHT JOIN`: Prioritizes all rows from the right table, along with matching rows from the left table.
   - `ON`: Establishes the joining condition.
     - `fields equality condition`: This condition is for the equi-join between fields from the primary and secondary tables. The join condition must be an equi-join, and only the `AND` operator can be used to combine conditions.

5. **WHERE Clause**:
   - `filter condition`: This sets the criteria to filter the rows resulting from the `SELECT` statement.

6. **UNION | UNION ALL Clause**:
   - `UNION`: Combines the result sets of two or more `SELECT` statements, but does not include any duplicate rows.
   - `UNION ALL`: Also combines the result sets of two or more `SELECT` statements, but it includes duplicates.

