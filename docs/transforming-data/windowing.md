# Windowing Functionalities

Streaming data systems allow users to perform real-time analytics on vast streams of incoming data. One of the fundamental concepts in streaming analytics is the idea of "windowing" – processing the incoming data within certain time-based (or count-based) segments.

Unlike other streaming systems that only compute aggregated values when a window closes, Dozer provides near-instantaneous insights by continuously updating these values as new data arrives.

However, there's a challenge. We cannot allow windows to stay open indefinitely, especially in scenarios like window joins where matching records from different streams might come at different times. If left unchecked, this could lead to unmanageable memory consumption. This is where the Time-To-Live (TTL) setting comes into play. 

The TTL serves dual purposes in Dozer:

1. **Continuous Aggregation**: Once a window is established, each subsequent record that matches the window criteria will refresh the state's TTL. This ensures that the aggregated data remains in memory and gets continuously updated, but not indefinitely. For instance, with a TTL of 2 minutes, the windowed aggregation will remain active and mutable for 2 minutes after the most recent matching record is received.

2. **Efficient Window Joins**: In windowed joins, records from one stream might arrive later than their matching counterparts in another stream. TTL ensures we retain these records for a set duration, enabling successful joins. At the same time, it limits the number of records kept in memory, ensuring the system remains efficient and responsive.

In essence, TTL strikes a balance between real-time data responsiveness and efficient resource management.

### Scenario
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

#### Resultant Data Table

| product_id | total_sales | start   | end     |
|------------|-------------|---------|---------|
| A          | $100        | 00:00   | 00:05   |

This behavior ensures that the system remains responsive to incoming data while efficiently managing resources by evicting windowed aggregation states that have not been refreshed within the TTL.

This approach guarantees that the aggregated values are always up-to-date with the most recent data, ensuring timely insights while also efficiently managing system resources.

