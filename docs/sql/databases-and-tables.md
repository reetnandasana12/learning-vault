---
sidebar_position: 2
title: Databases & Tables
---

# Databases & Tables

## Database Operations

```sql
-- Create a database
CREATE DATABASE my_database;

-- Use a database
USE my_database;

-- Drop a database
DROP DATABASE my_database;

-- Show all databases
SHOW DATABASES;
```

## Creating Tables

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INT,
    salary DECIMAL(10, 2),
    hire_date DATE DEFAULT CURRENT_DATE,
    department_id INT
);
```

## Common Data Types

| Type | Description | Example |
|------|-------------|---------|
| `INT` | Integer | `42` |
| `VARCHAR(n)` | Variable-length string | `'hello'` |
| `TEXT` | Long text | Large paragraphs |
| `DECIMAL(p,s)` | Exact numeric | `99.99` |
| `DATE` | Date | `'2025-01-15'` |
| `DATETIME` | Date and time | `'2025-01-15 10:30:00'` |
| `BOOLEAN` | True/False | `TRUE` / `FALSE` |

## Altering Tables

```sql
-- Add a column
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);

-- Modify a column
ALTER TABLE employees MODIFY COLUMN name VARCHAR(150);

-- Drop a column
ALTER TABLE employees DROP COLUMN phone;

-- Rename a table
ALTER TABLE employees RENAME TO staff;
```

## Constraints

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    quantity INT CHECK (quantity > 0),
    customer_email VARCHAR(255),
    employee_id INT,
    UNIQUE (product_name, customer_email),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

| Constraint | Purpose |
|------------|---------|
| `PRIMARY KEY` | Uniquely identifies each row |
| `NOT NULL` | Column cannot be empty |
| `UNIQUE` | All values must be different |
| `CHECK` | Values must meet a condition |
| `DEFAULT` | Sets a default value |
| `FOREIGN KEY` | Links to another table's primary key |
