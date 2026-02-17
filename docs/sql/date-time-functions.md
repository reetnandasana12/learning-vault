---
sidebar_position: 10
title: Date & Time Functions
---

# Date & Time Functions

SQL provides extensive functions for extracting, formatting, and calculating date and time values.

## GETDATE — Current Date & Time

```sql
SELECT
    OrderID,
    CreationTime,
    GETDATE() AS Today
FROM Sales.Orders;
```

## Date Part Extraction

### DATETRUNC — Truncate to a Specific Part

```sql
SELECT
    CreationTime,
    DATETRUNC(year, CreationTime)   AS Year_Trunc,
    DATETRUNC(month, CreationTime)  AS Month_Trunc,
    DATETRUNC(day, CreationTime)    AS Day_Trunc
FROM Sales.Orders;
```

### DATENAME — Get Name of Date Part

Returns a string (e.g., `'January'`, `'Monday'`).

```sql
SELECT
    DATENAME(month, CreationTime)   AS MonthName,
    DATENAME(weekday, CreationTime) AS WeekdayName
FROM Sales.Orders;
```

### DATEPART — Get Numeric Date Part

Returns an integer.

```sql
SELECT
    DATEPART(year, CreationTime)    AS Year,
    DATEPART(month, CreationTime)   AS Month,
    DATEPART(quarter, CreationTime) AS Quarter,
    DATEPART(week, CreationTime)    AS Week
FROM Sales.Orders;
```

### YEAR, MONTH, DAY — Shorthand

```sql
SELECT
    YEAR(CreationTime)  AS Year,
    MONTH(CreationTime) AS Month,
    DAY(CreationTime)   AS Day
FROM Sales.Orders;
```

## EOMONTH — End of Month

```sql
SELECT
    CreationTime,
    EOMONTH(CreationTime) AS EndOfMonth
FROM Sales.Orders;
```

## Aggregation with Date Parts

```sql
-- Orders per year
SELECT YEAR(OrderDate) AS OrderYear, COUNT(*) AS TotalOrders
FROM Sales.Orders
GROUP BY YEAR(OrderDate);

-- Orders per month (friendly names)
SELECT DATENAME(month, OrderDate) AS OrderMonth, COUNT(*) AS TotalOrders
FROM Sales.Orders
GROUP BY DATENAME(month, OrderDate);
```

## FORMAT — Custom Date Formatting

```sql
SELECT
    CreationTime,
    FORMAT(CreationTime, 'MM-dd-yyyy') AS USA_Format,
    FORMAT(CreationTime, 'dd-MM-yyyy') AS EURO_Format,
    FORMAT(CreationTime, 'MMM yy')     AS Short_Format
FROM Sales.Orders;
```

### Common Format Specifiers

| Specifier | Output | Example |
|-----------|--------|---------|
| `dd` | Day (2 digits) | `05` |
| `ddd` | Day abbreviation | `Mon` |
| `dddd` | Full day name | `Monday` |
| `MM` | Month (2 digits) | `01` |
| `MMM` | Month abbreviation | `Jan` |
| `MMMM` | Full month name | `January` |
| `yy` | 2-digit year | `25` |
| `yyyy` | 4-digit year | `2025` |
| `hh` | 12-hour | `02` |
| `HH` | 24-hour | `14` |
| `mm` | Minutes | `30` |
| `ss` | Seconds | `45` |
| `tt` | AM/PM | `PM` |

## CONVERT & CAST — Type Conversion

```sql
-- CONVERT with style codes
SELECT
    CONVERT(DATE, '2025-08-20')         AS StringToDate,
    CONVERT(VARCHAR, CreationTime, 32)  AS USA_Style,
    CONVERT(VARCHAR, CreationTime, 34)  AS EURO_Style
FROM Sales.Orders;

-- CAST
SELECT
    CAST('123' AS INT)              AS StringToInt,
    CAST('2025-08-20' AS DATE)      AS StringToDate,
    CAST(CreationTime AS DATE)      AS DatetimeToDate
FROM Sales.Orders;
```

## DATEADD & DATEDIFF — Date Arithmetic

```sql
-- Add or subtract from a date
SELECT
    OrderDate,
    DATEADD(day, -10, OrderDate)   AS TenDaysBefore,
    DATEADD(month, 3, OrderDate)   AS ThreeMonthsLater,
    DATEADD(year, 2, OrderDate)    AS TwoYearsLater
FROM Sales.Orders;

-- Calculate differences between dates
SELECT
    EmployeeID,
    BirthDate,
    DATEDIFF(year, BirthDate, GETDATE()) AS Age
FROM Sales.Employees;

-- Average shipping duration per month
SELECT
    MONTH(OrderDate) AS OrderMonth,
    AVG(DATEDIFF(day, OrderDate, ShipDate)) AS AvgShipDays
FROM Sales.Orders
GROUP BY MONTH(OrderDate);
```

## ISDATE — Validate Dates

```sql
SELECT
    OrderDate,
    ISDATE(OrderDate) AS IsValidDate,
    CASE
        WHEN ISDATE(OrderDate) = 1 THEN CAST(OrderDate AS DATE)
        ELSE '9999-01-01'
    END AS SafeDate
FROM (
    SELECT '2025-08-20' AS OrderDate UNION
    SELECT '2025-08'
) AS t;
```

## Time Gap Analysis

Use `LAG` with `DATEDIFF` to find days between consecutive orders.

```sql
SELECT
    OrderID,
    OrderDate,
    LAG(OrderDate) OVER (ORDER BY OrderDate) AS PreviousOrderDate,
    DATEDIFF(day, LAG(OrderDate) OVER (ORDER BY OrderDate), OrderDate) AS DaysBetween
FROM Sales.Orders;
```
