---
sidebar_position: 6
title: Joins
---

# Joins

Joins combine rows from two or more tables based on a related column.

## INNER JOIN

Returns only rows that have matching values in **both** tables.

```sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

## LEFT JOIN (LEFT OUTER JOIN)

Returns **all rows from the left table**, and matched rows from the right. Unmatched right rows are `NULL`.

```sql
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

## RIGHT JOIN (RIGHT OUTER JOIN)

Returns **all rows from the right table**, and matched rows from the left. Unmatched left rows are `NULL`.

```sql
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

## FULL OUTER JOIN

Returns all rows from **both** tables. Unmatched rows on either side are `NULL`.

```sql
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

:::note
MySQL does not support `FULL OUTER JOIN` directly. Use `UNION` of `LEFT JOIN` and `RIGHT JOIN` instead.
:::

## CROSS JOIN

Returns the **cartesian product** — every row from the first table paired with every row from the second.

```sql
SELECT e.name, d.department_name
FROM employees e
CROSS JOIN departments d;
```

## SELF JOIN

A table joined with itself.

```sql
-- Find employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

## Anti Joins

Find rows that do **not** have a match in the other table.

### LEFT ANTI JOIN

Rows in the left table with no match in the right.

```sql
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.customer_id IS NULL;
```

### RIGHT ANTI JOIN

Rows in the right table with no match in the left.

```sql
SELECT o.*
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id
WHERE c.id IS NULL;
```

## Joining Multiple Tables

```sql
SELECT
    o.OrderID,
    p.Product,
    c.FirstName AS Customer,
    e.FirstName AS SalesPerson
FROM Sales.Orders AS o
LEFT JOIN Sales.Products  AS p ON p.ProductID  = o.ProductID
LEFT JOIN Sales.Customers AS c ON c.CustomerID = o.CustomerID
LEFT JOIN Sales.Employees AS e ON e.EmployeeID = o.SalesPersonID;
```

## Join Summary

| Join | Returns |
|------|---------|
| `INNER JOIN` | Only matching rows |
| `LEFT JOIN` | All left + matching right |
| `RIGHT JOIN` | All right + matching left |
| `FULL OUTER JOIN` | All rows from both |
| `CROSS JOIN` | Cartesian product |
| `SELF JOIN` | Table with itself |
