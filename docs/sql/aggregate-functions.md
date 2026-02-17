---
sidebar_position: 5
title: Aggregate Functions
---

# Aggregate Functions

## Common Aggregates

```sql
SELECT COUNT(*) FROM employees;                -- total rows
SELECT COUNT(email) FROM employees;            -- non-null emails
SELECT SUM(salary) FROM employees;             -- total salary
SELECT AVG(salary) FROM employees;             -- average salary
SELECT MIN(salary) FROM employees;             -- lowest salary
SELECT MAX(salary) FROM employees;             -- highest salary
```

## GROUP BY

Group rows that share a value, then apply aggregate functions per group.

```sql
-- Count employees per department
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- Average salary per department
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;
```

## HAVING

Filter groups **after** aggregation (like `WHERE`, but for groups).

```sql
-- Departments with more than 5 employees
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;

-- Departments where average salary exceeds 70k
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 70000;
```

## WHERE vs HAVING

| | `WHERE` | `HAVING` |
|---|---------|----------|
| Filters | Individual rows | Groups |
| Runs | Before `GROUP BY` | After `GROUP BY` |
| Can use aggregates? | No | Yes |

## Query Execution Order

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```
