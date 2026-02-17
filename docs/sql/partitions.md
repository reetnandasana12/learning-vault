---
sidebar_position: 24
title: Partitioning
---

# Table Partitioning

Partitioning divides a large table into smaller physical segments based on a column value (e.g., date). Queries can then skip irrelevant partitions (partition elimination), improving performance.

## Steps to Partition a Table

### Step 1: Create a Partition Function

Defines the boundary values that split data into ranges.

```sql
CREATE PARTITION FUNCTION PartitionByYear (DATE)
AS RANGE LEFT FOR VALUES ('2023-12-31', '2024-12-31', '2025-12-31');
```

This creates 4 partitions: ≤2023, 2024, 2025, and ≥2026.

### Step 2: Create Filegroups

Each partition maps to a filegroup.

```sql
ALTER DATABASE SalesDB ADD FILEGROUP FG_2023;
ALTER DATABASE SalesDB ADD FILEGROUP FG_2024;
ALTER DATABASE SalesDB ADD FILEGROUP FG_2025;
ALTER DATABASE SalesDB ADD FILEGROUP FG_2026;
```

### Step 3: Create Data Files

Map physical files to filegroups.

```sql
ALTER DATABASE SalesDB ADD FILE (
    NAME = P_2023,
    FILENAME = 'C:\...\P_2023.ndf'
) TO FILEGROUP FG_2023;
-- Repeat for each filegroup
```

### Step 4: Create a Partition Scheme

Maps the partition function to filegroups.

```sql
CREATE PARTITION SCHEME SchemePartitionByYear
AS PARTITION PartitionByYear
TO (FG_2023, FG_2024, FG_2025, FG_2026);
```

### Step 5: Create the Partitioned Table

```sql
CREATE TABLE Sales.Orders_Partitioned (
    OrderID   INT,
    OrderDate DATE,
    Sales     INT
) ON SchemePartitionByYear (OrderDate);
```

### Step 6: Insert Data

```sql
INSERT INTO Sales.Orders_Partitioned VALUES (1, '2023-05-15', 100);
INSERT INTO Sales.Orders_Partitioned VALUES (2, '2024-07-20', 50);
INSERT INTO Sales.Orders_Partitioned VALUES (3, '2025-12-31', 20);
INSERT INTO Sales.Orders_Partitioned VALUES (4, '2026-01-01', 100);
```

### Step 7: Verify

```sql
SELECT
    p.partition_number AS PartitionNumber,
    f.name AS Filegroup,
    p.rows AS RowCount
FROM sys.partitions p
JOIN sys.destination_data_spaces dds ON p.partition_number = dds.destination_id
JOIN sys.filegroups f ON dds.data_space_id = f.data_space_id
WHERE OBJECT_NAME(p.object_id) = 'Orders_Partitioned';
```

## Partition Elimination

When filtering by the partition column, SQL Server reads only the relevant partition.

```sql
-- Only scans the 2025 and 2026 partitions
SELECT *
FROM Sales.Orders_Partitioned
WHERE OrderDate IN ('2025-12-31', '2026-01-01');
```

## When to Partition

| Scenario | Partition? |
|----------|-----------|
| Table has millions+ rows | Yes |
| Frequent date-range queries | Yes |
| Small tables (under 100K rows) | No — indexes are sufficient |
| Need to archive old data | Yes — drop/switch partitions |
