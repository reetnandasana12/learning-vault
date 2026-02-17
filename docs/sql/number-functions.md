---
sidebar_position: 9
title: Number Functions
---

# Number Functions

SQL number functions allow performing mathematical operations and formatting numerical values.

## ROUND — Rounding Numbers

Control the number of decimal places.

```sql
SELECT
    3.516 AS original_number,
    ROUND(3.516, 2) AS round_2,   -- 3.520
    ROUND(3.516, 1) AS round_1,   -- 3.500
    ROUND(3.516, 0) AS round_0;   -- 4.000
```

## ABS — Absolute Value

Returns the positive value of a number.

```sql
SELECT
    -10 AS original_number,
    ABS(-10) AS absolute_value_negative,  -- 10
    ABS(10) AS absolute_value_positive;   -- 10
```

## Summary

| Function | Purpose | Example |
|----------|---------|---------|
| `ROUND(n, d)` | Round to `d` decimal places | `ROUND(3.516, 1)` → `3.5` |
| `ABS(n)` | Absolute value | `ABS(-10)` → `10` |
