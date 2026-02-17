---
sidebar_position: 20
title: Temporary Tables
---

# Temporary Tables

Temporary tables are used to stage, transform, and clean data before loading it into permanent tables. They exist only for the duration of the session.

## Create with SELECT INTO

```sql
-- Copy all data into a temp table
SELECT *
INTO #Orders
FROM Sales.Orders;
```

:::note
Temp table names start with `#` (session-scoped) or `##` (global).
:::

## Data Migration Workflow

A common pattern: copy → clean → load.

### Step 1: Create Temp Table

```sql
SELECT *
INTO #Orders
FROM Sales.Orders;
```

### Step 2: Clean Data

```sql
DELETE FROM #Orders
WHERE OrderStatus = 'Delivered';
```

### Step 3: Load into Permanent Table

```sql
SELECT *
INTO Sales.OrdersTest
FROM #Orders;
```

## Temp Tables vs CTEs vs Views

| Feature | Temp Table | CTE | View |
|---------|-----------|-----|------|
| Stores data | Yes (physically) | No | No |
| Survives session | No | No (query only) | Yes |
| Can be indexed | Yes | No | No |
| Reusable in query | Yes | Within same query | Yes |
| Use case | ETL, staging | Query readability | Abstraction |
