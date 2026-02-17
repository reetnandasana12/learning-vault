---
sidebar_position: 1
title: Introduction
---

# Introduction to SQL

SQL (Structured Query Language) is a standard language for storing, manipulating, and retrieving data in relational databases.

## What is SQL?

- SQL stands for **Structured Query Language**
- Used to communicate with relational databases (MySQL, PostgreSQL, SQL Server, SQLite, Oracle, etc.)
- SQL is an **ANSI/ISO standard**, but different databases may have their own extensions

## What Can SQL Do?

- Create databases and tables
- Insert, update, and delete data
- Query and retrieve data
- Create views, stored procedures, and functions
- Manage permissions and access control

## Types of SQL Commands

| Category | Full Form | Commands | Purpose |
|----------|-----------|----------|---------|
| **DDL** | Data Definition Language | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` | Define/modify database structure |
| **DML** | Data Manipulation Language | `INSERT`, `UPDATE`, `DELETE` | Manipulate data |
| **DQL** | Data Query Language | `SELECT` | Query/retrieve data |
| **DCL** | Data Control Language | `GRANT`, `REVOKE` | Control access |
| **TCL** | Transaction Control Language | `COMMIT`, `ROLLBACK`, `SAVEPOINT` | Manage transactions |

## SQL Execution Order

Understanding the logical order in which SQL processes a query:

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT/TOP
```

## Why Learn SQL?

- **Universal**: Works across all relational databases
- **In demand**: Required for data analysts, engineers, backend developers, and data scientists
- **Declarative**: You describe *what* you want, not *how* to get it
- **Powerful**: Handles everything from simple lookups to complex analytics
