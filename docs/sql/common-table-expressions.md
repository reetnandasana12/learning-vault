---
sidebar_position: 18
title: Common Table Expressions (CTEs)
---

# Common Table Expressions (CTEs)

CTEs provide a way to write modular, readable queries using the `WITH` clause. They act as named temporary result sets that exist only for the duration of the query.

## Non-Recursive CTEs

### Standalone CTE

```sql
WITH CTE_Total_Sales AS (
    SELECT CustomerID, SUM(Sales) AS TotalSales
    FROM Sales.Orders
    GROUP BY CustomerID
)
SELECT * FROM CTE_Total_Sales;
```

### Multiple CTEs

Define multiple independent CTEs separated by commas.

```sql
WITH CTE_Total_Sales AS (
    SELECT CustomerID, SUM(Sales) AS TotalSales
    FROM Sales.Orders
    GROUP BY CustomerID
),
CTE_Last_Order AS (
    SELECT CustomerID, MAX(OrderDate) AS LastOrder
    FROM Sales.Orders
    GROUP BY CustomerID
)
SELECT
    c.CustomerID, c.FirstName,
    cts.TotalSales,
    clo.LastOrder
FROM Sales.Customers AS c
LEFT JOIN CTE_Total_Sales AS cts ON cts.CustomerID = c.CustomerID
LEFT JOIN CTE_Last_Order AS clo ON clo.CustomerID = c.CustomerID;
```

### Nested CTEs

A CTE can reference another CTE defined before it.

```sql
WITH CTE_Total_Sales AS (
    SELECT CustomerID, SUM(Sales) AS TotalSales
    FROM Sales.Orders
    GROUP BY CustomerID
),
CTE_Customer_Rank AS (
    SELECT
        CustomerID, TotalSales,
        RANK() OVER (ORDER BY TotalSales DESC) AS CustomerRank
    FROM CTE_Total_Sales  -- references previous CTE
),
CTE_Segments AS (
    SELECT
        CustomerID,
        CASE
            WHEN TotalSales > 100 THEN 'High'
            WHEN TotalSales > 80  THEN 'Medium'
            ELSE 'Low'
        END AS Segment
    FROM CTE_Total_Sales  -- references previous CTE
)
SELECT
    c.CustomerID, c.FirstName,
    cr.TotalSales, cr.CustomerRank,
    cs.Segment
FROM Sales.Customers AS c
LEFT JOIN CTE_Customer_Rank AS cr ON cr.CustomerID = c.CustomerID
LEFT JOIN CTE_Segments AS cs ON cs.CustomerID = c.CustomerID;
```

## Recursive CTEs

Recursive CTEs reference themselves to build hierarchies or generate sequences.

### Generate a Number Sequence

```sql
WITH Series AS (
    -- Anchor: starting point
    SELECT 1 AS MyNumber
    UNION ALL
    -- Recursive: increment until condition is false
    SELECT MyNumber + 1
    FROM Series
    WHERE MyNumber < 20
)
SELECT * FROM Series;
```

:::note
The default recursion limit is 100. For larger sequences, add `OPTION (MAXRECURSION n)` at the end.
```sql
SELECT * FROM Series OPTION (MAXRECURSION 5000);
```
:::

### Build Employee Hierarchy

```sql
WITH CTE_Hierarchy AS (
    -- Anchor: top-level employees (no manager)
    SELECT EmployeeID, FirstName, ManagerID, 1 AS Level
    FROM Sales.Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Recursive: find subordinates
    SELECT e.EmployeeID, e.FirstName, e.ManagerID, Level + 1
    FROM Sales.Employees AS e
    INNER JOIN CTE_Hierarchy AS h ON e.ManagerID = h.EmployeeID
)
SELECT * FROM CTE_Hierarchy;
```

## CTE vs Subquery

| Feature | CTE | Subquery |
|---------|-----|----------|
| Readability | Better for complex queries | Can get deeply nested |
| Reusability | Can be referenced multiple times | Must repeat the query |
| Recursion | Supported | Not supported |
| Performance | Same as subquery (not materialized) | Same as CTE |
