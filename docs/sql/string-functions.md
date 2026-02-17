---
sidebar_position: 8
title: String Functions
---

# String Functions

SQL string functions allow manipulation, transformation, and extraction of text data.

## CONCAT — Concatenation

Combine multiple strings into one.

```sql
-- Concatenate first name and country
SELECT
    CONCAT(first_name, '-', country) AS full_info
FROM customers;
```

## LOWER & UPPER — Case Transformation

```sql
-- Convert to lowercase
SELECT LOWER(first_name) AS lower_name FROM customers;

-- Convert to uppercase
SELECT UPPER(first_name) AS upper_name FROM customers;
```

## TRIM — Remove Whitespace

```sql
-- Find names with leading or trailing spaces
SELECT
    first_name,
    LEN(first_name) AS len_name,
    LEN(TRIM(first_name)) AS len_trim_name
FROM customers
WHERE LEN(first_name) != LEN(TRIM(first_name));
```

## REPLACE — Substitute Characters

```sql
-- Remove dashes from a phone number
SELECT
    '123-456-7890' AS phone,
    REPLACE('123-456-7890', '-', '/') AS clean_phone;

-- Change file extension
SELECT
    'report.txt' AS old_filename,
    REPLACE('report.txt', '.txt', '.csv') AS new_filename;
```

## LEN — String Length

```sql
-- Calculate the length of each name
SELECT
    first_name,
    LEN(first_name) AS name_length
FROM customers;
```

## LEFT & RIGHT — Extract Characters

```sql
-- First two characters
SELECT
    first_name,
    LEFT(TRIM(first_name), 2) AS first_2_chars
FROM customers;

-- Last two characters
SELECT
    first_name,
    RIGHT(first_name, 2) AS last_2_chars
FROM customers;
```

## SUBSTRING — Extract Substrings

```sql
-- Remove the first character from each name
SELECT
    first_name,
    SUBSTRING(TRIM(first_name), 2, LEN(first_name)) AS trimmed_name
FROM customers;
```

## Nesting Functions

String functions can be nested inside each other.

```sql
SELECT
    first_name,
    UPPER(TRIM(first_name)) AS cleaned_upper_name
FROM customers;
```

## Summary

| Function | Purpose | Example |
|----------|---------|---------|
| `CONCAT` | Join strings | `CONCAT('A', '-', 'B')` → `A-B` |
| `LOWER` | Lowercase | `LOWER('HELLO')` → `hello` |
| `UPPER` | Uppercase | `UPPER('hello')` → `HELLO` |
| `TRIM` | Remove spaces | `TRIM('  hi  ')` → `hi` |
| `REPLACE` | Substitute | `REPLACE('a-b', '-', '_')` → `a_b` |
| `LEN` | Length | `LEN('hello')` → `5` |
| `LEFT` | Left chars | `LEFT('hello', 2)` → `he` |
| `RIGHT` | Right chars | `RIGHT('hello', 2)` → `lo` |
| `SUBSTRING` | Extract part | `SUBSTRING('hello', 2, 3)` → `ell` |
