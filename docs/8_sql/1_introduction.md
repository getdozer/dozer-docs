---
id: introduction
---
# Introduction

Dozer allows users to perform SQL queries and operations on streaming data in real-time. 
It supports operations such as filtering, aggregating, and (experimentally) joining with other data streams. 
Upon startup, Dozer converts the provided query into an execution plan for real-time processing, 
which is then used to process incoming data, produce results, and send them to a caching layer. 
Dozer's SQL adheres to standard ANSI SQL as much as possible, however some features of the language are still 
under development. Users can refer to the [Supported constructs](#supported-constructs) section for more information on what is currently available.

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
FROM [table] [INNER JOIN [table2] ON [equality condition]]
WHERE [filter condition];
```


The following exceptions:

### Wildcards
Wildcard `*` is supported in the SELECT clause, but not as a function argument. However, given that the extracted data will be used to populate the caching layer,
  in order to avoid the extraction of unnecessary data, it's suggested to specify every field individually specified.

:::tip VALID FIELD SELECTION
```sql
SELECT * FROM USERS;
SELECT first_name, last_name FROM USERS;
```
:::

:::warning INVALID FIELD SELECTION
```sql
SELECT COUNT(*) FROM USERS;
SELECT USERS.* FROM USERS;
```
:::

### INTO
DozerSQL uses INTO to create a virtual table that can be used as a relation in another SQL Query or as a source for an [Api Endpoint](/docs/configuration/endpoints#apiendpoint).

:::tip VALID SOURCE CREATION USING INTO
```sql
SELECT id, AVG(open), AVG(close), low, volume 
  INTO stocks_data
  FROM stocks
  GROUP BY id;
```
:::

### JOIN
DozerSQL supports INNER JOIN, LEFT and RIGHT OUTER JOIN. In the ON constraint is possible to define equality along with 'AND' conditions to compare columns. 
JOIN is currently an experimental feature. 

:::tip VALID JOIN
```sql
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

SELECT Customers.CustomerName, Orders.OrderID Orders.OrderDate
FROM Customers
LEFT JOIN Orders ON Orders.CustomerID = Customers.CustomerID;
```
:::

:::warning INVALID NON EQUI-JOIN
```sql
SELECT d1.date, d1.agent_fee
FROM deals d1
INNER JOIN deals d2
ON d1.date >= d2.date
```
:::

### UNION

| Operator    | Usage                     | Description                                                                                                                                                                                                               |
| ----------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNION`     | query1 `UNION` query2     | `UNION` effectively appends the result of query2 to the result of query1 (although there is no guarantee that this is the order in which the rows are actually returned). This eliminates duplicate rows from its result. |
| `UNION ALL` | query1 `UNION ALL` query2 | `UNION ALL` appends the result of query2 to the result of query1, no guarantee about the order in which the rows are actually returned. This does NOT eliminate duplicate rows from its result.                           |

:::tip VALID UNION
```sql
SELECT supplier_id
FROM suppliers
UNION
SELECT supplier_id
FROM orders
ORDER BY supplier_id;
```
:::
