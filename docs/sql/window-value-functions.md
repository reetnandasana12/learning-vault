---
sidebar_position: 17
title: Window Value Functions
---

# Window Value Functions

Value functions let you access data from other rows in the result set without self-joins, enabling time series analysis and comparisons.

## LAG — Previous Row Value

Access a value from the **previous** row.

```sql
LAG(column, offset, default) OVER (ORDER BY ...)
```

## LEAD — Next Row Value

Access a value from the **next** row.

```sql
LEAD(column, offset, default) OVER (ORDER BY ...)
```

## Month-over-Month Analysis

```sql
SELECT
    *,
    CurrentMonthSales - PreviousMonthSales AS MoM_Change,
    ROUND(
        CAST((CurrentMonthSales - PreviousMonthSales) AS FLOAT)
        / PreviousMonthSales * 100, 1
    ) AS MoM_Pct
FROM (
    SELECT
        MONTH(OrderDate) AS OrderMonth,
        SUM(Sales) AS CurrentMonthSales,
        LAG(SUM(Sales)) OVER (ORDER BY MONTH(OrderDate)) AS PreviousMonthSales
    FROM Sales.Orders
    GROUP BY MONTH(OrderDate)
) AS MonthlySales;
```

## Customer Loyalty — Days Between Orders

```sql
SELECT
    CustomerID,
    AVG(DaysUntilNextOrder) AS AvgDays,
    RANK() OVER (ORDER BY COALESCE(AVG(DaysUntilNextOrder), 999999)) AS LoyaltyRank
FROM (
    SELECT
        CustomerID,
        OrderDate,
        LEAD(OrderDate) OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS NextOrder,
        DATEDIFF(day, OrderDate,
            LEAD(OrderDate) OVER (PARTITION BY CustomerID ORDER BY OrderDate)
        ) AS DaysUntilNextOrder
    FROM Sales.Orders
) t
GROUP BY CustomerID;
```

## FIRST_VALUE & LAST_VALUE

```sql
SELECT
    OrderID, ProductID, Sales,
    FIRST_VALUE(Sales) OVER (
        PARTITION BY ProductID ORDER BY Sales
    ) AS LowestSales,
    LAST_VALUE(Sales) OVER (
        PARTITION BY ProductID ORDER BY Sales
        ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
    ) AS HighestSales,
    Sales - FIRST_VALUE(Sales) OVER (
        PARTITION BY ProductID ORDER BY Sales
    ) AS DiffFromLowest
FROM Sales.Orders;
```

:::warning LAST_VALUE requires a frame clause
By default, the frame ends at the current row, so `LAST_VALUE` returns the current row's value. Always specify `ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING` to get the actual last value.
:::

## Summary

| Function | Returns | Default Frame |
|----------|---------|---------------|
| `LAG(col, n)` | Value from `n` rows before | N/A |
| `LEAD(col, n)` | Value from `n` rows after | N/A |
| `FIRST_VALUE(col)` | First value in window | Uses frame |
| `LAST_VALUE(col)` | Last value in window | Needs explicit frame |
