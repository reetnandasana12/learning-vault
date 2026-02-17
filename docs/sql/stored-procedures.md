---
sidebar_position: 21
title: Stored Procedures
---

# Stored Procedures

Stored procedures are reusable blocks of SQL logic saved in the database. They accept parameters, support control flow, and handle errors.

## Basic Procedure

```sql
CREATE PROCEDURE GetCustomerSummary AS
BEGIN
    SELECT
        COUNT(*) AS TotalCustomers,
        AVG(Score) AS AvgScore
    FROM Sales.Customers
    WHERE Country = 'USA';
END
GO

-- Execute
EXEC GetCustomerSummary;
```

## Parameters with Defaults

```sql
ALTER PROCEDURE GetCustomerSummary
    @Country NVARCHAR(50) = 'USA'  -- default value
AS
BEGIN
    SELECT
        COUNT(*) AS TotalCustomers,
        AVG(Score) AS AvgScore
    FROM Sales.Customers
    WHERE Country = @Country;
END
GO

-- Call with different values
EXEC GetCustomerSummary @Country = 'Germany';
EXEC GetCustomerSummary;  -- uses default 'USA'
```

## Multiple Queries

A procedure can return multiple result sets.

```sql
ALTER PROCEDURE GetCustomerSummary @Country NVARCHAR(50) = 'USA' AS
BEGIN
    -- Result Set 1: Customer stats
    SELECT COUNT(*) AS TotalCustomers, AVG(Score) AS AvgScore
    FROM Sales.Customers
    WHERE Country = @Country;

    -- Result Set 2: Order stats
    SELECT COUNT(OrderID) AS TotalOrders, SUM(Sales) AS TotalSales
    FROM Sales.Orders AS o
    JOIN Sales.Customers AS c ON c.CustomerID = o.CustomerID
    WHERE c.Country = @Country;
END
GO
```

## Variables

```sql
ALTER PROCEDURE GetCustomerSummary @Country NVARCHAR(50) = 'USA' AS
BEGIN
    DECLARE @TotalCustomers INT, @AvgScore FLOAT;

    SELECT
        @TotalCustomers = COUNT(*),
        @AvgScore = AVG(Score)
    FROM Sales.Customers
    WHERE Country = @Country;

    PRINT('Total Customers: ' + CAST(@TotalCustomers AS NVARCHAR));
    PRINT('Average Score: ' + CAST(@AvgScore AS NVARCHAR));
END
GO
```

## IF/ELSE Control Flow

```sql
ALTER PROCEDURE GetCustomerSummary @Country NVARCHAR(50) = 'USA' AS
BEGIN
    IF EXISTS (SELECT 1 FROM Sales.Customers WHERE Score IS NULL AND Country = @Country)
    BEGIN
        PRINT('Updating NULL Scores to 0');
        UPDATE Sales.Customers
        SET Score = 0
        WHERE Score IS NULL AND Country = @Country;
    END
    ELSE
    BEGIN
        PRINT('No NULL Scores found');
    END;

    -- Generate report
    SELECT COUNT(*) AS TotalCustomers, AVG(Score) AS AvgScore
    FROM Sales.Customers
    WHERE Country = @Country;
END
GO
```

## TRY/CATCH Error Handling

```sql
ALTER PROCEDURE GetCustomerSummary @Country NVARCHAR(50) = 'USA' AS
BEGIN
    BEGIN TRY
        SELECT COUNT(OrderID) AS TotalOrders, SUM(Sales) AS TotalSales
        FROM Sales.Orders AS o
        JOIN Sales.Customers AS c ON c.CustomerID = o.CustomerID
        WHERE c.Country = @Country;
    END TRY
    BEGIN CATCH
        PRINT('Error Message: ' + ERROR_MESSAGE());
        PRINT('Error Number: '  + CAST(ERROR_NUMBER() AS NVARCHAR));
        PRINT('Error Line: '    + CAST(ERROR_LINE() AS NVARCHAR));
    END CATCH;
END
GO
```

## Error Functions Reference

| Function | Returns |
|----------|---------|
| `ERROR_MESSAGE()` | Error description |
| `ERROR_NUMBER()` | Error ID |
| `ERROR_SEVERITY()` | Severity level |
| `ERROR_STATE()` | Error state |
| `ERROR_LINE()` | Line number where error occurred |
| `ERROR_PROCEDURE()` | Procedure name (or NULL) |
