# Time Windowing Functionalities

## Introduction

Streaming data systems allow users to perform real-time analytics on vast streams of incoming data. One of the fundamental concepts in streaming analytics is the idea of "windowing" – processing the incoming data within certain time-based (or count-based) segments.

Unlike other streaming systems that only compute aggregated values when a window closes, Dozer provides near-instantaneous insights by continuously updating these values as new data arrives.

However, there's a challenge. We cannot allow windows to stay open indefinitely, especially in scenarios like window joins where matching records from different streams might come at different times. If left unchecked, this could lead to unmanageable memory consumption. This is where the Time-To-Live (TTL) setting comes into play. 

The TTL serves dual purposes in Dozer:

1. **Continuous Aggregation**: Once a window is established, each subsequent record that matches the window criteria will refresh the state's TTL. This ensures that the aggregated data remains in memory and gets continuously updated, but not indefinitely. For instance, with a TTL of 2 minutes, the windowed aggregation will remain active and mutable for 2 minutes after the most recent matching record is received.

2. **Efficient Window Joins**: In windowed joins, records from one stream might arrive later than their matching counterparts in another stream. TTL ensures we retain these records for a set duration, enabling successful joins. At the same time, it limits the number of records kept in memory, ensuring the system remains efficient and responsive.

In essence, TTL strikes a balance between real-time data responsiveness and efficient resource management.

## Scenario
To better isllustrate the above, let's consider the following:

Imagine we are working with a stream of real-time sales transactions for an online store. We want to calculate the rolling sum of sales every 5 minutes. To maintain real-time responsiveness, we decide to use Dozer's windowing function with a TTL of 2 minutes.

#### SQL Statement

```sql
SELECT t.product_id, SUM(t.amount) as total_sales, t.window_start as start, t.window_end AS end
INTO sales_summary
FROM TUMBLE(transactions, transaction_time, '5 MINUTES', '2 MINUTES') t;
```

#### Windowed Aggregation Behavior

When the windowed aggregation state is established, any incoming record will refresh its TTL. If the TTL is set to 2 minutes, this means the state will persist for another 2 minutes following the reception of the most recent record. 

#### Illustrative Timeline

1. **00:00** - Window opens (Start time: 00:00, End time: 00:05)
2. **00:01** - A sales record for Product A arrives, totaling $50. The TTL resets.
3. **00:02** - Another sales record for Product A arrives, totaling $30. The TTL resets. The aggregated sum now is $80.
4. **00:03** - No record arrives. TTL continues its countdown.
5. **00:04** - A sales record for Product A arrives, totaling $20. The TTL resets. The aggregated sum now is $100.
6. **00:06** - No sales record for Product A arrives within the next 2 minutes, so the aggregation state for the window (00:00 - 00:05) is closed.

This behavior ensures that the system remains responsive to incoming data while efficiently managing resources by evicting windowed aggregation states that have not been refreshed within the TTL.

## Window Functions

### TUMBLE()
The `TUMBLE()` function in Dozer is used to establish fixed, non-overlapping time windows over streaming data. Each window covers a specified duration, and the data that falls within this duration is aggregated. These windows are beneficial for operations where aggregations or computations need to be performed on a regular, recurring basis over the data stream.

#### Syntax
```sql
TUMBLE(source, timestamp_exp, window_size, TTL)
```

#### Arguments

| Name     | Type           | Description                                                                                                                                                         |
|-------------------|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `source`          | Table/Statement| The source table or statement from which the streaming data is read.                                                                                                |
| `timestamp_exp` | `TIMESTAMP`         | The expression representing the timestamp in the data which helps in determining the placement of records within windows.                                                |
| `window_size`     | Duration       | The duration of each tumbling window.                                                                                                                               |
| `TTL`             | Duration       | Time-To-Live: The duration post which the aggregated data of the window is evicted from memory. Each incoming record refreshes this duration for the particular window.|

#### Returns
A set of records, each associated with a specific window. Every record will have a `window_start` and `window_end` timestamp that defines its window boundaries.

Of course, here's the documentation for the `HOP()` function in Dozer:


### HOP()
The `HOP()` function in Dozer facilitates windowing operations over streaming data by creating overlapping time windows. These "hopping" windows have a fixed length but are defined by two parameters: window size (the length of the window) and the hop size (the interval at which new windows start). This function is especially valuable for scenarios where there's a need to continuously monitor a stream with some overlap in aggregations.

#### Syntax
```sql
HOP(source, timestamp_exp, window_size, hop_size, TTL)
```

#### Arguments

| Name     | Type           | Description                                                                                                     |
|-------------------|----------------|-----------------------------------------------------------------------------------------------------------------|
| `source`          | Table/Statement| The source table or statement from which the streaming data is read.                                            |
| `timestamp_exp` | `TIMESTAMP`         | The expression representing the timestamp in the data, used to determine the placement of records within windows.     |
| `window_size`     | Duration       | The duration of each hopping window.                                                                            |
| `hop_size`        | Duration       | The interval at which a new hopping window starts. It determines the overlap between windows.                    |
| `TTL`             | Duration       | Time-To-Live: Duration after which the aggregated data of the window is evicted from memory. Each incoming record that fits within a window's boundaries resets this duration for that window.|

#### Returns
A set of records, each linked with a specific window. Every record will include a `window_start` and `window_end` timestamp that marks its window's boundaries.

### TTL()
The `TTL()` function in Dozer is specifically designed to set a Time-To-Live (TTL) for individual records in the streaming data. After the specified TTL duration, the record is evicted from Dozer's internal state. This function is vital in situations where there's a need to manage the amount of data held in memory over time, especially when working with endless streams of data.

#### Syntax
```sql
TTL(source, timestamp_exp, TTL_duration)
```

#### Arguments

| Name     | Type           | Description                                                                                         |
|-------------------|----------------|-----------------------------------------------------------------------------------------------------|
| `source`          | Table/Statement| The source table or statement from which the streaming data is read.                                |
| `timestamp_exp` | `TIMESTAMP`         | The expression representing the timestamp in the data. It's used to track when the record should expire. |
| `TTL_duration`    | Duration       | The time duration after which the record is evicted from the internal state.                        |

#### Returns
A stream of records, each with an associated TTL. Once the TTL expires for a record, it's removed from Dozer's internal state.

#### Example
Given this SQL statement:

```sql
SELECT t.PULocationID as location, t.tpep_pickup_datetime as pickup_time
INTO ttl_result
FROM TTL(trips, tpep_pickup_datetime, '5 MINUTES') t;
```

This command will ensure that records from the `trips` table have a 5-minute lifespan in Dozer's internal state based on their `tpep_pickup_datetime`. After 5 minutes from the `tpep_pickup_datetime`, they are automatically evicted.

The `TTL()` function provides a way to manage the memory usage in Dozer, particularly when dealing with vast streams of data. By setting a TTL, it ensures that only relevant (or recent) data is held in memory, providing a balance between data retention and memory efficiency. The TTL is based on the record's timestamp, ensuring that data eviction is contextually relevant.