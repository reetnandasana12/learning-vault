---
sidebar_position: 16
title: Window Ranking
---

# Window Ranking Functions

Ranking functions assign positions to rows based on ordering, enabling top-N analysis, deduplication, and segmentation.

## ROW_NUMBER, RANK, DENSE_RANK

```sql
SELECT
    OrderID, Sales,
    ROW_NUMBER() OVER (ORDER BY Sales DESC) AS RowNum,
    RANK()       OVER (ORDER BY Sales DESC) AS Rank,
    DENSE_RANK() OVER (ORDER BY Sales DESC) AS DenseRank
FROM Sales.Orders;
```

| Sales | ROW_NUMBER | RANK | DENSE_RANK |
|-------|-----------|------|------------|
| 100 | 1 | 1 | 1 |
| 100 | 2 | 1 | 1 |
| 90 | 3 | 3 | 2 |
| 80 | 4 | 4 | 3 |

- **ROW_NUMBER**: Always unique, no ties
- **RANK**: Same rank for ties, skips next
- **DENSE_RANK**: Same rank for ties, no gaps

## Top-N Analysis

Find the highest sale per product.

```sql
SELECT *
FROM (
    SELECT
        OrderID, ProductID, Sales,
        ROW_NUMBER() OVER (PARTITION BY ProductID ORDER BY Sales DESC) AS Rank
    FROM Sales.Orders
) t
WHERE Rank = 1;
```

## Bottom-N Analysis

Find the 2 lowest customers by total sales.

```sql
SELECT *
FROM (
    SELECT
        CustomerID,
        SUM(Sales) AS TotalSales,
        ROW_NUMBER() OVER (ORDER BY SUM(Sales)) AS Rank
    FROM Sales.Orders
    GROUP BY CustomerID
) t
WHERE Rank <= 2;
```

## Assign Unique IDs

```sql
SELECT
    ROW_NUMBER() OVER (ORDER BY OrderID, OrderDate) AS UniqueID,
    *
FROM Sales.OrdersArchive;
```

## Remove Duplicates

Keep only the latest version of each duplicate row.

```sql
SELECT *
FROM (
    SELECT
        ROW_NUMBER() OVER (PARTITION BY OrderID ORDER BY CreationTime DESC) AS rn,
        *
    FROM Sales.OrdersArchive
) t
WHERE rn = 1;
```

## NTILE — Divide Into Buckets

Distributes rows into a specified number of equal groups.

```sql
SELECT
    OrderID, Sales,
    NTILE(2) OVER (ORDER BY Sales) AS TwoBuckets,
    NTILE(3) OVER (ORDER BY Sales) AS ThreeBuckets,
    NTILE(4) OVER (ORDER BY Sales) AS FourBuckets
FROM Sales.Orders;
```

### Segmentation with NTILE

```sql
SELECT
    OrderID, Sales,
    CASE
        WHEN Buckets = 1 THEN 'High'
        WHEN Buckets = 2 THEN 'Medium'
        WHEN Buckets = 3 THEN 'Low'
    END AS Segment
FROM (
    SELECT OrderID, Sales,
        NTILE(3) OVER (ORDER BY Sales DESC) AS Buckets
    FROM Sales.Orders
) t;
```

## CUME_DIST — Cumulative Distribution

Returns the relative position of a value (0 to 1).

```sql
-- Products in the top 40% by price
SELECT Product, Price, DistRank
FROM (
    SELECT
        Product, Price,
        CUME_DIST() OVER (ORDER BY Price DESC) AS DistRank
    FROM Sales.Products
) t
WHERE DistRank <= 0.4;
```

## Summary

| Function | Ties | Gaps | Use Case |
|----------|------|------|----------|
| `ROW_NUMBER` | No ties | N/A | Unique IDs, deduplication |
| `RANK` | Same rank | Skips | Competition-style ranking |
| `DENSE_RANK` | Same rank | No gaps | Consecutive ranking |
| `NTILE(n)` | N/A | N/A | Bucketing, segmentation |
| `CUME_DIST` | N/A | N/A | Percentile analysis |
