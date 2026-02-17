---
sidebar_position: 13
title: SET Operations
---

# SET Operations

SET operations combine results from multiple queries into a single result set.

## Rules

1. **Column count** must match in all queries
2. **Data types** of corresponding columns must be compatible
3. **Column names** come from the first SELECT
4. **Column order** must be the same across queries

## UNION — Combine Without Duplicates

Removes duplicate rows from the combined result.

```sql
SELECT FirstName, LastName FROM Sales.Customers
UNION
SELECT FirstName, LastName FROM Sales.Employees;
```

## UNION ALL — Combine With Duplicates

Keeps all rows, including duplicates. Faster than `UNION`.

```sql
SELECT FirstName, LastName FROM Sales.Customers
UNION ALL
SELECT FirstName, LastName FROM Sales.Employees;
```

## EXCEPT — Set Difference

Returns rows from the first query that do **not** appear in the second.

```sql
-- Employees who are NOT customers
SELECT FirstName, LastName FROM Sales.Employees
EXCEPT
SELECT FirstName, LastName FROM Sales.Customers;
```

## INTERSECT — Common Rows

Returns only rows that appear in **both** queries.

```sql
-- Employees who are also customers
SELECT FirstName, LastName FROM Sales.Employees
INTERSECT
SELECT FirstName, LastName FROM Sales.Customers;
```

## Combining Tables with Source Labels

```sql
SELECT 'Orders' AS SourceTable, OrderID, Sales FROM Sales.Orders
UNION
SELECT 'Archive' AS SourceTable, OrderID, Sales FROM Sales.OrdersArchive
ORDER BY OrderID;
```

## SET Operations Summary

| Operation | Duplicates | Use Case |
|-----------|------------|----------|
| `UNION` | Removed | Combine unique rows |
| `UNION ALL` | Kept | Combine all rows (faster) |
| `EXCEPT` | N/A | Find rows only in first set |
| `INTERSECT` | N/A | Find common rows |

:::tip Performance
Prefer `UNION ALL` over `UNION` when duplicates are acceptable — it avoids the cost of deduplication.
:::
