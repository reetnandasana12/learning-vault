---
sidebar_position: 19
title: Views
---

# Views

A view is a virtual table defined by a query. It does not store data — it runs the underlying query each time it is accessed.

## Create, Query, Drop

```sql
-- Create a view
CREATE VIEW Sales.V_Monthly_Summary AS
SELECT
    DATETRUNC(month, OrderDate) AS OrderMonth,
    SUM(Sales)      AS TotalSales,
    COUNT(OrderID)  AS TotalOrders,
    SUM(Quantity)   AS TotalQuantities
FROM Sales.Orders
GROUP BY DATETRUNC(month, OrderDate);
GO

-- Query the view (just like a table)
SELECT * FROM Sales.V_Monthly_Summary;

-- Drop the view
DROP VIEW Sales.V_Monthly_Summary;
```

## Use Case: Hide Complexity

Abstract multi-table joins behind a simple view.

```sql
CREATE VIEW Sales.V_Order_Details AS
SELECT
    o.OrderID,
    o.OrderDate,
    p.Product,
    p.Category,
    COALESCE(c.FirstName, '') + ' ' + COALESCE(c.LastName, '') AS CustomerName,
    c.Country AS CustomerCountry,
    COALESCE(e.FirstName, '') + ' ' + COALESCE(e.LastName, '') AS SalesName,
    e.Department,
    o.Sales,
    o.Quantity
FROM Sales.Orders AS o
LEFT JOIN Sales.Products   AS p ON p.ProductID   = o.ProductID
LEFT JOIN Sales.Customers  AS c ON c.CustomerID  = o.CustomerID
LEFT JOIN Sales.Employees  AS e ON e.EmployeeID  = o.SalesPersonID;
GO
```

Now anyone can query order details without knowing the join logic:

```sql
SELECT * FROM Sales.V_Order_Details WHERE CustomerCountry = 'Germany';
```

## Use Case: Data Security

Restrict data access by filtering rows in the view.

```sql
-- EU team can only see non-USA data
CREATE VIEW Sales.V_Order_Details_EU AS
SELECT *
FROM Sales.V_Order_Details
WHERE CustomerCountry != 'USA';
GO
```

## Views vs Tables

| Feature | View | Table |
|---------|------|-------|
| Stores data | No (virtual) | Yes (physical) |
| Always up-to-date | Yes | Manual refresh |
| Performance | Runs query each time | Direct read |
| Use case | Abstraction, security | Permanent storage |
