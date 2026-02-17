---
sidebar_position: 11
title: Handling NULLs
---

# Handling NULL Values

NULL represents missing or unknown data. It is not the same as zero or an empty string. Proper NULL handling is essential for data integrity.

## COALESCE — Replace NULLs

Returns the first non-NULL value from a list.

```sql
-- Replace NULL scores with 0
SELECT
    CustomerID,
    Score,
    COALESCE(Score, 0) AS ScoreClean
FROM Sales.Customers;
```

### NULL in Aggregation

NULLs are ignored by aggregate functions. Use `COALESCE` to include them.

```sql
SELECT
    AVG(Score) OVER ()              AS AvgScores,       -- ignores NULLs
    AVG(COALESCE(Score, 0)) OVER () AS AvgScoresWithZero -- treats NULLs as 0
FROM Sales.Customers;
```

### NULL in Math Operations

Any math with NULL returns NULL.

```sql
SELECT
    FirstName + ' ' + COALESCE(LastName, '') AS FullName,
    COALESCE(Score, 0) + 10 AS ScoreWithBonus
FROM Sales.Customers;
```

## Sorting with NULLs

NULLs can appear first or last depending on your needs.

```sql
-- NULLs last
SELECT CustomerID, Score
FROM Sales.Customers
ORDER BY CASE WHEN Score IS NULL THEN 1 ELSE 0 END, Score;
```

## NULLIF — Prevent Division by Zero

Returns NULL if two values are equal — useful for avoiding divide-by-zero errors.

```sql
SELECT
    OrderID,
    Sales,
    Quantity,
    Sales / NULLIF(Quantity, 0) AS Price
FROM Sales.Orders;
```

## IS NULL & IS NOT NULL

```sql
-- Customers without scores
SELECT * FROM Sales.Customers WHERE Score IS NULL;

-- Customers with scores
SELECT * FROM Sales.Customers WHERE Score IS NOT NULL;
```

## LEFT ANTI JOIN — Find Missing Data

Find customers who never placed an order.

```sql
SELECT c.*, o.OrderID
FROM Sales.Customers AS c
LEFT JOIN Sales.Orders AS o
    ON c.CustomerID = o.CustomerID
WHERE o.CustomerID IS NULL;
```

## NULL vs Empty String vs Blank Spaces

These are three different things in SQL.

```sql
WITH TestData AS (
    SELECT 1 AS Id, 'A'  AS Category UNION
    SELECT 2, NULL                    UNION
    SELECT 3, ''                      UNION
    SELECT 4, '  '
)
SELECT
    *,
    DATALENGTH(Category)                          AS LenCategory,
    TRIM(Category)                                AS Trimmed,
    NULLIF(TRIM(Category), '')                    AS NullIfEmpty,
    COALESCE(NULLIF(TRIM(Category), ''), 'unknown') AS CleanValue
FROM TestData;
```

| Value | `DATALENGTH` | `IS NULL` | After Cleanup |
|-------|-------------|-----------|--------------|
| `'A'` | 1 | No | `'A'` |
| `NULL` | NULL | Yes | `'unknown'` |
| `''` | 0 | No | `'unknown'` |
| `'  '` | 2 | No | `'unknown'` |

:::tip Best Practice
Use `COALESCE(NULLIF(TRIM(column), ''), 'default')` to handle NULL, empty strings, and blank spaces in one expression.
:::
