---
sidebar_position: 23
title: Indexes
---

# Indexes

Indexes speed up data retrieval by creating an organized lookup structure, similar to an index in a book.

## Clustered Index

- Physically sorts table data by the index key
- **Only one** per table (typically the primary key)

```sql
CREATE CLUSTERED INDEX idx_Customers_ID
ON Sales.DBCustomers (CustomerID);
```

## Non-Clustered Index

- Creates a separate structure pointing back to the table
- **Multiple** allowed per table

```sql
CREATE NONCLUSTERED INDEX idx_Customers_LastName
ON Sales.DBCustomers (LastName);
```

## Composite Index

Index on multiple columns. Follows the **leftmost prefix rule**.

```sql
CREATE INDEX idx_Customers_CountryScore
ON Sales.DBCustomers (Country, Score);

-- Uses the index (starts with Country)
SELECT * FROM Sales.DBCustomers
WHERE Country = 'USA' AND Score > 500;
```

### Leftmost Prefix Rule

For a composite index on `(A, B, C, D)`:

| Filter | Uses Index? |
|--------|-------------|
| `A` | Yes |
| `A, B` | Yes |
| `A, B, C` | Yes |
| `B` only | No |
| `A, C` (skipping B) | Partial |

## Columnstore Index

Optimized for analytical queries with heavy aggregations on large tables.

```sql
-- Clustered columnstore (replaces row storage)
CREATE CLUSTERED COLUMNSTORE INDEX idx_Orders_CS
ON Sales.DBCustomers;

-- Non-clustered columnstore (on specific columns)
CREATE NONCLUSTERED COLUMNSTORE INDEX idx_Customers_CS_Name
ON Sales.DBCustomers (FirstName);
```

## Unique Index

Enforces uniqueness — rejects duplicate values.

```sql
CREATE UNIQUE INDEX idx_Products_Product
ON Sales.Products (Product);
```

## Filtered Index

Indexes only a subset of rows matching a condition.

```sql
CREATE NONCLUSTERED INDEX idx_Customers_USA
ON Sales.Customers (Country)
WHERE Country = 'USA';
```

## Index Monitoring

### List Indexes on a Table

```sql
sp_helpindex 'Sales.DBCustomers';
```

### Monitor Index Usage

```sql
SELECT
    tbl.name AS TableName,
    idx.name AS IndexName,
    idx.type_desc AS IndexType,
    s.user_seeks, s.user_scans, s.user_lookups, s.user_updates
FROM sys.indexes idx
JOIN sys.tables tbl ON idx.object_id = tbl.object_id
LEFT JOIN sys.dm_db_index_usage_stats s
    ON s.object_id = idx.object_id AND s.index_id = idx.index_id
ORDER BY tbl.name;
```

### Find Missing Indexes

```sql
SELECT * FROM sys.dm_db_missing_index_details;
```

## Index Maintenance

### Update Statistics

```sql
-- Single table
UPDATE STATISTICS Sales.DBCustomers;

-- All tables
EXEC sp_updatestats;
```

### Check Fragmentation

```sql
SELECT
    tbl.name AS TableName,
    idx.name AS IndexName,
    s.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS s
JOIN sys.tables tbl ON s.object_id = tbl.object_id
JOIN sys.indexes idx ON idx.object_id = s.object_id AND idx.index_id = s.index_id
ORDER BY s.avg_fragmentation_in_percent DESC;
```

### Reorganize vs Rebuild

```sql
-- Reorganize (lightweight, online)
ALTER INDEX idx_Name ON Sales.Customers REORGANIZE;

-- Rebuild (full, more resource-intensive)
ALTER INDEX idx_Name ON Sales.Customers REBUILD;
```

| Fragmentation | Action |
|--------------|--------|
| 5–30% | `REORGANIZE` |
| > 30% | `REBUILD` |

## Summary

| Index Type | Qty per Table | Best For |
|-----------|--------------|----------|
| Clustered | 1 | Primary key, range scans |
| Non-Clustered | Many | WHERE, JOIN columns |
| Composite | Many | Multi-column filters |
| Columnstore | 1 clustered | Analytical aggregations |
| Unique | Many | Enforcing uniqueness |
| Filtered | Many | Subset of rows |
