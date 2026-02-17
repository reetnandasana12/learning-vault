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

## Correlated Subqueries

A correlated subquery references the outer query — it runs once per outer row.

```sql
-- Employees earning more than their department's average
SELECT name, salary, department_id
FROM employees e1
WHERE salary > (
    SELECT AVG(salary) FROM employees e2
    WHERE e2.department_id = e1.department_id
);
```

## EXISTS & NOT EXISTS

Returns `TRUE` if the subquery returns any rows.

```sql
-- Departments that have at least one employee
SELECT department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.id
);

-- Departments with NO employees
SELECT department_name
FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.id
);
```

## Subquery Result Types

| Type | Returns | Example Use |
|------|---------|-------------|
| Scalar | Single value | `WHERE salary > (SELECT AVG(salary) ...)` |
| Row | Single row | `WHERE (a, b) = (SELECT ...)` |
| Table | Multiple rows/columns | `FROM (SELECT ...) AS t` |
