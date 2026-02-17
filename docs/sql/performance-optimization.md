---
sidebar_position: 25
title: 30 Performance Tips
---

# 30 SQL Performance Tips

A categorized guide to writing faster SQL queries.

## Fetching Data

### Tip 1: Select Only What You Need

```sql
-- Bad
SELECT * FROM Sales.Customers;

-- Good
SELECT CustomerID, FirstName, LastName FROM Sales.Customers;
```

### Tip 2: Avoid Unnecessary DISTINCT & ORDER BY

Only use them when required by business logic.

### Tip 3: Limit Rows for Exploration

```sql
SELECT TOP 10 OrderID, Sales FROM Sales.Orders;
```

## Filtering

### Tip 4: Index Frequently Filtered Columns

```sql
CREATE NONCLUSTERED INDEX idx_Orders_Status ON Sales.Orders(OrderStatus);
```

### Tip 5: Avoid Functions on WHERE Columns

Functions prevent index usage (non-sargable).

```sql
-- Bad: wraps column in function
WHERE LOWER(OrderStatus) = 'delivered'
WHERE YEAR(OrderDate) = 2025

-- Good: keeps column clean
WHERE OrderStatus = 'Delivered'
WHERE OrderDate BETWEEN '2025-01-01' AND '2025-12-31'
```

### Tip 6: Avoid Leading Wildcards

```sql
-- Bad (full scan)
WHERE LastName LIKE '%Gold%'

-- Good (uses index)
WHERE LastName LIKE 'Gold%'
```

### Tip 7: Use IN Instead of Multiple OR

```sql
-- Bad
WHERE CustomerID = 1 OR CustomerID = 2 OR CustomerID = 3

-- Good
WHERE CustomerID IN (1, 2, 3)
```

## Joins

### Tip 8: Prefer INNER JOIN

Join speed hierarchy: `INNER JOIN` > `LEFT/RIGHT JOIN` > `FULL OUTER JOIN`

### Tip 9: Use Explicit (ANSI) Joins

```sql
-- Bad (implicit join)
SELECT * FROM Customers c, Orders o WHERE c.CustomerID = o.CustomerID;

-- Good (explicit)
SELECT * FROM Customers c INNER JOIN Orders o ON c.CustomerID = o.CustomerID;
```

### Tip 10: Index JOIN Columns

```sql
CREATE NONCLUSTERED INDEX idx_Orders_CustomerID ON Sales.Orders(CustomerID);
```

### Tip 11: Filter Before Joining (Big Tables)

```sql
-- Pre-filter with subquery
SELECT c.FirstName, o.OrderID
FROM Sales.Customers AS c
INNER JOIN (
    SELECT OrderID, CustomerID FROM Sales.Orders WHERE OrderStatus = 'Delivered'
) AS o ON c.CustomerID = o.CustomerID;
```

### Tip 12: Aggregate Before Joining (Big Tables)

```sql
-- Pre-aggregate, then join
SELECT c.CustomerID, c.FirstName, o.OrderCount
FROM Sales.Customers AS c
INNER JOIN (
    SELECT CustomerID, COUNT(OrderID) AS OrderCount
    FROM Sales.Orders GROUP BY CustomerID
) AS o ON c.CustomerID = o.CustomerID;
```

### Tip 13: Use UNION Instead of OR in Joins

```sql
-- Bad
ON c.CustomerID = o.CustomerID OR c.CustomerID = o.SalesPersonID

-- Good: split into two queries with UNION
```

### Tip 14: Check Execution Plans & Use SQL Hints

```sql
SELECT * FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID
OPTION (HASH JOIN);
```

## UNION

### Tip 15: Prefer UNION ALL Over UNION

`UNION ALL` skips deduplication — faster when duplicates are acceptable.

### Tip 16: UNION ALL + DISTINCT

When you need dedup but want better performance:

```sql
SELECT DISTINCT CustomerID FROM (
    SELECT CustomerID FROM Sales.Orders
    UNION ALL
    SELECT CustomerID FROM Sales.OrdersArchive
) AS Combined;
```

## Aggregations

### Tip 17: Columnstore Index for Heavy Aggregations

```sql
CREATE CLUSTERED COLUMNSTORE INDEX idx_Orders_CS ON Sales.Orders;
```

### Tip 18: Pre-Aggregate for Reporting

Store aggregated results in a summary table.

```sql
SELECT MONTH(OrderDate) AS OrderMonth, SUM(Sales) AS TotalSales
INTO Sales.SalesSummary
FROM Sales.Orders
GROUP BY MONTH(OrderDate);
```

## Subqueries & CTEs

### Tip 19: JOIN vs EXISTS vs IN

| Method | Best For |
|--------|----------|
| `JOIN` | When performance equals EXISTS |
| `EXISTS` | Large tables (stops at first match) |
| `IN` | Avoid — loads entire subquery result |

### Tip 20: Avoid Redundant Logic

Use window functions instead of repeating subqueries.

```sql
-- Bad: two subqueries with same AVG
-- Good: single query with AVG() OVER()
SELECT EmployeeID, FirstName,
    CASE
        WHEN Salary > AVG(Salary) OVER () THEN 'Above Average'
        ELSE 'Below Average'
    END AS Status
FROM Sales.Employees;
```

## DDL Best Practices

### Tip 21–25: Table Design

```sql
-- Bad
CREATE TABLE CustomersInfo (
    CustomerID INT,
    FirstName VARCHAR(MAX),
    Country VARCHAR(255),
    Score VARCHAR(255)
);

-- Good
CREATE TABLE CustomersInfo (
    CustomerID INT PRIMARY KEY CLUSTERED,
    FirstName  VARCHAR(50) NOT NULL,
    Country    VARCHAR(50) NOT NULL,
    Score      INT,
    EmployeeID INT,
    FOREIGN KEY (EmployeeID) REFERENCES Sales.Employees(EmployeeID)
);
CREATE NONCLUSTERED INDEX IX_EmployeeID ON CustomersInfo(EmployeeID);
```

| Tip | Rule |
|-----|------|
| 21 | Use precise data types (`INT`, `DATE`, not `VARCHAR`) |
| 22 | Avoid `VARCHAR(MAX)` — use appropriate lengths |
| 23 | Use `NOT NULL` when possible |
| 24 | Always have a clustered primary key |
| 25 | Index foreign keys used in joins |

## Indexing Best Practices

| Tip | Rule |
|-----|------|
| 26 | Avoid over-indexing — slows INSERT/UPDATE/DELETE |
| 27 | Drop unused indexes |
| 28 | Update statistics weekly |
| 29 | Reorganize/rebuild fragmented indexes |
| 30 | For large fact tables: partition + columnstore index |
