---
id: big-o-complexity
title: Big-O & Complexity Analysis
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Big-O & Complexity Analysis

Understanding complexity is the **first skill** you need. Every solution must be analyzed for time and space usage.

---

## Time Complexity

How runtime grows as input size `n` increases.

| Notation | Name | Doubles when n doubles? |
|---|---|---|
| O(1) | Constant | No change |
| O(log n) | Logarithmic | +1 step |
| O(n) | Linear | 2× slower |
| O(n log n) | Linearithmic | ~2× slower |
| O(n²) | Quadratic | 4× slower |
| O(2ⁿ) | Exponential | Doubles |
| O(n!) | Factorial | Explodes |

### Complexity Hierarchy (fastest → slowest)

```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
```

---

## Space Complexity

Extra memory used **beyond** the input.

- **In-place algorithm** — O(1) extra space (e.g., Bubble Sort)
- **Recursive algorithms** — O(depth) stack space (e.g., DFS = O(h))
- **Merge Sort** — O(n) extra for merging

---

## Asymptotic Notations

| Notation | Meaning | Analogy |
|---|---|---|
| Big-O (O) | Upper bound (worst case) | "At most" |
| Omega (Ω) | Lower bound (best case) | "At least" |
| Theta (Θ) | Tight bound (average) | "Exactly" |

---

## Drop Constants & Non-Dominant Terms

```
O(2n)       → O(n)
O(n² + n)   → O(n²)
O(500)      → O(1)
O(n + log n)→ O(n)
```

---

## Examples

### O(1) — Constant

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int getFirst(vector<int>& arr) {
    return arr[0];  // Always 1 operation
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int getFirst(int[] arr) {
    return arr[0];  // Always 1 operation
}
```

</TabItem>
</Tabs>

---

### O(log n) — Binary Search

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

</TabItem>
</Tabs>

**Why O(log n)?** Each step cuts the search space in half.

---

### O(n) — Linear Scan

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int findMax(vector<int>& arr) {
    int maxVal = arr[0];
    for (int x : arr) maxVal = max(maxVal, x);
    return maxVal;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int findMax(int[] arr) {
    int maxVal = arr[0];
    for (int x : arr) maxVal = Math.max(maxVal, x);
    return maxVal;
}
```

</TabItem>
</Tabs>

---

### O(n²) — Nested Loop

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Check all pairs
bool hasDuplicate(vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++)
        for (int j = i + 1; j < arr.size(); j++)
            if (arr[i] == arr[j]) return true;
    return false;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
boolean hasDuplicate(int[] arr) {
    for (int i = 0; i < arr.length; i++)
        for (int j = i + 1; j < arr.length; j++)
            if (arr[i] == arr[j]) return true;
    return false;
}
```

</TabItem>
</Tabs>

---

### O(n log n) — Merge Sort

Sorting n elements, each merge step is O(n), and there are O(log n) levels → **O(n log n)**.

---

## Common Mistakes

| Mistake | Correct Thinking |
|---|---|
| "My loop runs n/2 times" | Still O(n) — drop constants |
| Two separate loops O(n)+O(n) | O(n), not O(n²) |
| Nested loops always O(n²) | Only if both go to n |
| Recursion = expensive | Depends on call tree structure |

---

## Practical Input Size Guide

| n | Max Complexity |
|---|---|
| n ≤ 10 | O(n!) |
| n ≤ 20 | O(2ⁿ) |
| n ≤ 500 | O(n³) |
| n ≤ 5000 | O(n²) |
| n ≤ 10⁶ | O(n log n) |
| n ≤ 10⁸ | O(n) |
| Any | O(log n) or O(1) |

Use this table to **choose your algorithm** during interviews.
