---
sidebar_position: 12
title: CASE Statements
---

# CASE Statements

The CASE statement adds conditional logic to SQL queries — similar to IF/ELSE in other languages.

## Categorize Data

```sql
-- Categorize orders by sales amount
SELECT
    Category,
    SUM(Sales) AS TotalSales
FROM (
    SELECT
        Sales,
        CASE
            WHEN Sales > 50 THEN 'High'
            WHEN Sales > 20 THEN 'Medium'
            ELSE 'Low'
        END AS Category
    FROM Sales.Orders
) AS t
GROUP BY Category
ORDER BY TotalSales DESC;
```

## Mapping Values

```sql
-- Map countries to abbreviations
SELECT
    CustomerID,
    Country,
    CASE
        WHEN Country = 'Germany' THEN 'DE'
        WHEN Country = 'USA'     THEN 'US'
        ELSE 'n/a'
    END AS CountryCode
FROM Sales.Customers;
```

## Quick Form (Simple CASE)

When comparing a single column to multiple values, use the short syntax.

```sql
-- Searched form (full)
CASE
    WHEN Country = 'Germany' THEN 'DE'
    WHEN Country = 'USA'     THEN 'US'
    ELSE 'n/a'
END

-- Simple form (quick)
CASE Country
    WHEN 'Germany' THEN 'DE'
    WHEN 'USA'     THEN 'US'
    ELSE 'n/a'
END
```

## Handling NULLs with CASE

```sql
SELECT
    CustomerID,
    Score,
    CASE
        WHEN Score IS NULL THEN 0
        ELSE Score
    END AS ScoreClean,
    AVG(
        CASE WHEN Score IS NULL THEN 0 ELSE Score END
    ) OVER () AS AvgClean
FROM Sales.Customers;
```

## Conditional Aggregation

Count or sum based on conditions without multiple queries.

```sql
-- Count high-sales orders per customer
SELECT
    CustomerID,
    SUM(CASE WHEN Sales > 30 THEN 1 ELSE 0 END) AS HighSalesOrders,
    COUNT(*) AS TotalOrders
FROM Sales.Orders
GROUP BY CustomerID;
```

## CASE vs COALESCE / NULLIF

| Use Case | Preferred |
|----------|-----------|
| Replace NULL with a default | `COALESCE(col, default)` |
| Prevent divide by zero | `NULLIF(col, 0)` |
| Multiple conditions / categories | `CASE` |
| Map values | `CASE` |
