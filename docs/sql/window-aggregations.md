---
sidebar_position: 15
title: Window Aggregations
---

# Window Aggregate Functions

Use aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) as window functions to retain row-level detail alongside aggregated values.

## COUNT

```sql
-- Total orders and orders per customer
SELECT
    OrderID, CustomerID,
    COUNT(*) OVER ()                        AS TotalOrders,
    COUNT(*) OVER (PARTITION BY CustomerID) AS OrdersByCustomer
FROM Sales.Orders;
```

### Detect Duplicates

```sql
SELECT *
FROM (
    SELECT
        *,
        COUNT(*) OVER (PARTITION BY OrderID) AS DuplicateCount
    FROM Sales.OrdersArchive
) t
WHERE DuplicateCount > 1;
```

## SUM

```sql
-- Total sales and sales per product
SELECT
    OrderID, ProductID, Sales,
    SUM(Sales) OVER ()                      AS TotalSales,
    SUM(Sales) OVER (PARTITION BY ProductID) AS SalesByProduct
FROM Sales.Orders;
```

### Percentage Contribution

```sql
SELECT
    OrderID, ProductID, Sales,
    SUM(Sales) OVER () AS TotalSales,
    ROUND(CAST(Sales AS FLOAT) / SUM(Sales) OVER () * 100, 2) AS PctOfTotal
FROM Sales.Orders;
```

## AVG

```sql
SELECT
    OrderID, ProductID, Sales,
    AVG(Sales) OVER ()                      AS AvgSales,
    AVG(Sales) OVER (PARTITION BY ProductID) AS AvgByProduct
FROM Sales.Orders;
```

### Filter by Average

```sql
SELECT *
FROM (
    SELECT
        OrderID, Sales,
        AVG(Sales) OVER () AS AvgSales
    FROM Sales.Orders
) t
WHERE Sales > AvgSales;
```

## MIN & MAX

```sql
SELECT
    OrderID, ProductID, Sales,
    MIN(Sales) OVER () AS LowestSales,
    MAX(Sales) OVER () AS HighestSales,
    Sales - MIN(Sales) OVER () AS DeviationFromMin,
    MAX(Sales) OVER () - Sales AS DeviationFromMax
FROM Sales.Orders;
```

### Find Rows Matching Max

```sql
SELECT *
FROM (
    SELECT *, MAX(Salary) OVER () AS HighestSalary
    FROM Sales.Employees
) t
WHERE Salary = HighestSalary;
```

## Rolling Sum & Moving Average

```sql
-- Moving average per product over time
SELECT
    OrderID, ProductID, OrderDate, Sales,
    AVG(Sales) OVER (PARTITION BY ProductID ORDER BY OrderDate) AS MovingAvg
FROM Sales.Orders;

-- Rolling average: current + next row
SELECT
    OrderID, ProductID, OrderDate, Sales,
    AVG(Sales) OVER (
        PARTITION BY ProductID
        ORDER BY OrderDate
        ROWS BETWEEN CURRENT ROW AND 1 FOLLOWING
    ) AS RollingAvg
FROM Sales.Orders;
```
