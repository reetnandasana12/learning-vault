---
sidebar_position: 14
title: Window Functions — Basics
---

# Window Functions — Basics

Window functions perform calculations across a set of rows related to the current row — without collapsing them into groups like `GROUP BY`.

## GROUP BY vs Window Functions

```sql
-- GROUP BY: one row per product
SELECT ProductID, SUM(Sales) AS TotalSales
FROM Sales.Orders
GROUP BY ProductID;

-- Window function: every row + total
SELECT
    OrderID, ProductID, Sales,
    SUM(Sales) OVER () AS TotalSales
FROM Sales.Orders;
```

## OVER Clause

The `OVER()` clause defines the window. An empty `OVER()` applies to all rows.

```sql
SELECT
    OrderID, Sales,
    SUM(Sales) OVER () AS TotalSales
FROM Sales.Orders;
```

## PARTITION BY — Divide Into Groups

```sql
SELECT
    OrderID, ProductID, Sales,
    SUM(Sales) OVER ()                          AS TotalSales,
    SUM(Sales) OVER (PARTITION BY ProductID)    AS SalesByProduct
FROM Sales.Orders;
```

Multiple partition columns:

```sql
SELECT
    OrderID, ProductID, OrderStatus, Sales,
    SUM(Sales) OVER (PARTITION BY ProductID, OrderStatus) AS SalesByProductStatus
FROM Sales.Orders;
```

## ORDER BY — Define Row Order

```sql
SELECT
    OrderID, Sales,
    RANK() OVER (ORDER BY Sales DESC) AS SalesRank
FROM Sales.Orders;
```

## FRAME Clause — Control Row Range

The frame defines which rows within the partition are included in the calculation.

### Current + Next 2 Rows

```sql
SUM(Sales) OVER (
    PARTITION BY OrderStatus
    ORDER BY OrderDate
    ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING
)
```

### Previous 2 Rows + Current

```sql
SUM(Sales) OVER (
    ORDER BY OrderDate
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
```

### Cumulative (Running Total)

```sql
SUM(Sales) OVER (
    ORDER BY OrderDate
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

### Shorthand for Cumulative

```sql
SUM(Sales) OVER (
    ORDER BY OrderDate
    ROWS UNBOUNDED PRECEDING
)
```

## Frame Options Reference

| Boundary | Meaning |
|----------|---------|
| `UNBOUNDED PRECEDING` | First row of partition |
| `n PRECEDING` | n rows before current |
| `CURRENT ROW` | Current row |
| `n FOLLOWING` | n rows after current |
| `UNBOUNDED FOLLOWING` | Last row of partition |

## Rules

:::warning Important Rules
1. Window functions can only appear in `SELECT` or `ORDER BY` — **not** in `WHERE`, `GROUP BY`, or `HAVING`.
2. Window functions **cannot be nested** inside other window functions.
:::

## Window Functions with GROUP BY

You can use window functions on aggregated results.

```sql
SELECT
    CustomerID,
    SUM(Sales) AS TotalSales,
    RANK() OVER (ORDER BY SUM(Sales) DESC) AS CustomerRank
FROM Sales.Orders
GROUP BY CustomerID;
```
