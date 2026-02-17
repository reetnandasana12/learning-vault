---
sidebar_position: 22
title: Triggers
---

# Triggers

Triggers are automated actions that fire in response to data changes (INSERT, UPDATE, DELETE) on a table.

## Creating an Audit Log

### Step 1: Create the Log Table

```sql
CREATE TABLE Sales.EmployeeLogs (
    LogID      INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID INT,
    LogMessage VARCHAR(255),
    LogDate    DATE
);
```

### Step 2: Create the Trigger

```sql
CREATE TRIGGER trg_AfterInsertEmployee
ON Sales.Employees
AFTER INSERT
AS
BEGIN
    INSERT INTO Sales.EmployeeLogs (EmployeeID, LogMessage, LogDate)
    SELECT
        EmployeeID,
        'New Employee Added = ' + CAST(EmployeeID AS VARCHAR),
        GETDATE()
    FROM INSERTED;  -- pseudo-table containing new rows
END;
GO
```

### Step 3: Test It

```sql
-- Insert triggers the log automatically
INSERT INTO Sales.Employees
VALUES (6, 'Maria', 'Doe', 'HR', '1988-01-12', 'F', 80000, 3);

-- Check the audit log
SELECT * FROM Sales.EmployeeLogs;
```

## Trigger Types

| Timing | Fires |
|--------|-------|
| `AFTER INSERT` | After a new row is inserted |
| `AFTER UPDATE` | After a row is updated |
| `AFTER DELETE` | After a row is deleted |
| `INSTEAD OF` | Replaces the original action |

## Pseudo-Tables

| Table | Contains |
|-------|----------|
| `INSERTED` | New rows (available in INSERT and UPDATE triggers) |
| `DELETED` | Old rows (available in DELETE and UPDATE triggers) |

:::tip Use Cases
- **Audit trails**: Log who changed what and when
- **Data integrity**: Enforce business rules beyond constraints
- **Cascading actions**: Automatically update related tables
:::
