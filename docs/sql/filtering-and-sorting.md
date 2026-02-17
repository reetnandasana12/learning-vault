---
sidebar_position: 4
title: Filtering & Sorting
---

# Filtering & Sorting

## WHERE Clause

```sql
-- Comparison operators
SELECT * FROM employees WHERE age > 30;
SELECT * FROM employees WHERE salary >= 70000;
SELECT * FROM employees WHERE name = 'Alice';
SELECT * FROM employees WHERE name != 'Bob';
```

## Logical Operators

```sql
-- AND
SELECT * FROM employees WHERE age > 25 AND salary > 60000;

-- OR
SELECT * FROM employees WHERE department_id = 1 OR department_id = 2;

-- NOT
SELECT * FROM employees WHERE NOT age > 30;
```

## IN, BETWEEN, LIKE

```sql
-- IN — match any value in a list
SELECT * FROM employees WHERE department_id IN (1, 2, 3);

-- BETWEEN — range (inclusive)
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 80000;

-- LIKE — pattern matching
SELECT * FROM employees WHERE name LIKE 'A%';     -- starts with A
SELECT * FROM employees WHERE name LIKE '%son';    -- ends with son
SELECT * FROM employees WHERE email LIKE '%@gmail%'; -- contains @gmail
SELECT * FROM employees WHERE name LIKE '_o%';     -- second char is 'o'
```

| Wildcard | Meaning |
|----------|---------|
| `%` | Zero or more characters |
| `_` | Exactly one character |

## IS NULL

```sql
SELECT * FROM employees WHERE email IS NULL;
SELECT * FROM employees WHERE email IS NOT NULL;
```

## ORDER BY

```sql
-- Ascending (default)
SELECT * FROM employees ORDER BY salary;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees ORDER BY department_id ASC, salary DESC;
```

## LIMIT

```sql
-- Get first 10 rows
SELECT * FROM employees LIMIT 10;

-- Skip 5, get next 10 (pagination)
SELECT * FROM employees LIMIT 10 OFFSET 5;
```
