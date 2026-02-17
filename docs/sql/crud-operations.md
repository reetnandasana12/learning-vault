---
sidebar_position: 3
title: CRUD Operations
---

# CRUD Operations

## INSERT — Create

```sql
-- Insert a single row
INSERT INTO employees (name, email, age, salary)
VALUES ('Alice', 'alice@example.com', 30, 75000);

-- Insert multiple rows
INSERT INTO employees (name, email, age, salary) VALUES
    ('Bob', 'bob@example.com', 25, 60000),
    ('Charlie', 'charlie@example.com', 35, 85000);
```

## SELECT — Read

```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT name, salary FROM employees;

-- With alias
SELECT name AS employee_name, salary AS annual_salary FROM employees;

-- Distinct values
SELECT DISTINCT department_id FROM employees;
```

## UPDATE — Update

```sql
-- Update specific rows
UPDATE employees
SET salary = 80000
WHERE name = 'Alice';

-- Update multiple columns
UPDATE employees
SET salary = 90000, age = 31
WHERE id = 1;
```

:::danger
Always use `WHERE` with `UPDATE` — without it, **all rows** get updated.
:::

## DELETE — Delete

```sql
-- Delete specific rows
DELETE FROM employees
WHERE id = 5;

-- Delete all rows (keeps table structure)
DELETE FROM employees;

-- Faster way to delete all rows (resets auto-increment)
TRUNCATE TABLE employees;
```

:::danger
Always use `WHERE` with `DELETE` — without it, **all rows** get deleted.
:::
