---
sidebar_position: 7
title: Subqueries
---

# Subqueries

A subquery is a query nested inside another query.

## Subquery in WHERE

```sql
-- Employees earning above average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Employees in the 'Engineering' department
SELECT name
FROM employees
WHERE department_id = (
    SELECT id FROM departments WHERE department_name = 'Engineering'
);
```

## Subquery with IN

```sql
-- Employees in departments that have more than 10 people
SELECT name
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    HAVING COUNT(*) > 10
);
```

## Subquery in FROM (Derived Table)

```sql
-- Average of department averages
SELECT AVG(dept_avg) AS overall_avg
FROM (
    SELECT department_id, AVG(salary) AS dept_avg
    FROM employees
    GROUP BY department_id
) AS dept_averages;
```

## Subquery in SELECT

```sql
SELECT name, salary,
    (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees;
```

## EXISTS

Returns `TRUE` if the subquery returns any rows.

```sql
-- Departments that have at least one employee
SELECT department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.id
);
```
