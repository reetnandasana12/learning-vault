---
id: bit-manipulation-advanced
title: Bit Manipulation & Advanced Topics
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Bit Manipulation & Advanced Topics

---

## Bit Manipulation

Work directly with binary representations for ultra-fast, space-efficient solutions.

### Bitwise Operators

| Operator | Symbol | Effect | Example |
|---|---|---|---|
| AND | `&` | 1 only if both 1 | `5 & 3 = 1` (101 & 011 = 001) |
| OR | `\|` | 1 if either 1 | `5 \| 3 = 7` (101 \| 011 = 111) |
| XOR | `^` | 1 if different | `5 ^ 3 = 6` (101 ^ 011 = 110) |
| NOT | `~` | Flip all bits | `~5 = -6` |
| Left Shift | `<<` | Multiply by 2ⁿ | `5 << 1 = 10` |
| Right Shift | `>>` | Divide by 2ⁿ | `20 >> 2 = 5` |

---

### Essential Bit Tricks

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int n = 13; // binary: 1101

// Check if bit i is set
bool isBitSet(int n, int i) { return (n >> i) & 1; }

// Set bit i
int setBit(int n, int i)   { return n | (1 << i); }

// Clear bit i
int clearBit(int n, int i) { return n & ~(1 << i); }

// Toggle bit i
int toggleBit(int n, int i){ return n ^ (1 << i); }

// Check even/odd
bool isOdd(int n) { return n & 1; }

// Check power of 2
bool isPowerOf2(int n) { return n > 0 && (n & (n - 1)) == 0; }
// n=8 (1000), n-1=7 (0111), 8&7 = 0 → true

// Count set bits (popcount)
int countSetBits(int n) {
    int count = 0;
    while (n) { count += n & 1; n >>= 1; }
    return count;
}
// Built-in C++: __builtin_popcount(n)

// Turn off rightmost set bit
int turnOffRight(int n) { return n & (n - 1); }

// Lowest set bit
int lowestSetBit(int n) { return n & (-n); }
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int n = 13;
boolean isBitSet = ((n >> 2) & 1) == 1; // check bit 2
int setBit = n | (1 << 2);
int clearBit = n & ~(1 << 2);
boolean isPowerOf2 = n > 0 && (n & (n - 1)) == 0;
int countBits = Integer.bitCount(n); // built-in
```

</TabItem>
</Tabs>

---

### Single Number — XOR Magic

XOR of a number with itself = 0. XOR of 0 with x = x.

**Pattern trigger:** "Single number", "find unique", "all others appear twice"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Find the one number appearing once
int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int n : nums) result ^= n; // all pairs cancel out
    return result;
}
// Input: [4,1,2,1,2] → Output: 4
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int singleNumber(int[] nums) {
    int result = 0;
    for (int n : nums) result ^= n;
    return result;
}
```

</TabItem>
</Tabs>

---

### Subsets via Bitmask

Generate all subsets of n elements using bits.

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: All subsets of [1,2,3]
void generateSubsets(vector<int>& nums) {
    int n = nums.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i))
                cout << nums[i] << " ";
        }
        cout << "}\n";
    }
}
// 3 elements → 2³=8 subsets: {},{1},{2},{1,2},{3},{1,3},{2,3},{1,2,3}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
void generateSubsets(int[] nums) {
    int n = nums.length;
    for (int mask = 0; mask < (1 << n); mask++) {
        System.out.print("{ ");
        for (int i = 0; i < n; i++)
            if ((mask & (1 << i)) != 0)
                System.out.print(nums[i] + " ");
        System.out.println("}");
    }
}
```

</TabItem>
</Tabs>

---

### Number of 1 Bits (Hamming Weight)

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &= (n - 1); // clear lowest set bit
        count++;
    }
    return count;
}
// n=11 (1011) → 3 set bits
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int hammingWeight(int n) {
    int count = 0;
    while (n != 0) { n &= (n - 1); count++; }
    return count;
}
```

</TabItem>
</Tabs>

---

## Advanced Topics

### Segment Tree — Range Query & Point Update

**Use:** Range sum/min/max query + point update in O(log n).

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Segment Tree for range sum
class SegmentTree {
    vector<int> tree;
    int n;
public:
    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n, 0);
        build(arr, 0, 0, n - 1);
    }

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2*node+1, start, mid);
        build(arr, 2*node+2, mid+1, end);
        tree[node] = tree[2*node+1] + tree[2*node+2];
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2*node+1, start, mid, idx, val);
        else update(2*node+2, mid+1, end, idx, val);
        tree[node] = tree[2*node+1] + tree[2*node+2];
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0; // out of range
        if (l <= start && end <= r) return tree[node]; // fully in range
        int mid = (start + end) / 2;
        return query(2*node+1, start, mid, l, r) +
               query(2*node+2, mid+1, end, l, r);
    }

    void update(int idx, int val) { update(0, 0, n-1, idx, val); }
    int query(int l, int r) { return query(0, 0, n-1, l, r); }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java: Segment Tree
class SegmentTree {
    int[] tree;
    int n;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2*node+1, start, mid);
        build(arr, 2*node+2, mid+1, end);
        tree[node] = tree[2*node+1] + tree[2*node+2];
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2*node+1, start, mid, l, r) +
               query(2*node+2, mid+1, end, l, r);
    }
}
```

</TabItem>
</Tabs>

---

### Fenwick Tree (BIT) — Prefix Sum Queries

Simpler than segment tree for prefix sum queries + point updates in O(log n).

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
class FenwickTree {
    vector<int> bit;
    int n;
public:
    FenwickTree(int n) : n(n), bit(n + 1, 0) {}

    void update(int i, int delta) { // 1-indexed
        for (; i <= n; i += i & (-i))
            bit[i] += delta;
    }

    int query(int i) { // prefix sum [1..i]
        int sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += bit[i];
        return sum;
    }

    int rangeQuery(int l, int r) { // [l..r]
        return query(r) - query(l - 1);
    }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
class FenwickTree {
    int[] bit;
    int n;
    FenwickTree(int n) { this.n = n; bit = new int[n + 1]; }

    void update(int i, int delta) {
        for (; i <= n; i += i & (-i)) bit[i] += delta;
    }

    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i)) sum += bit[i];
        return sum;
    }
}
```

</TabItem>
</Tabs>

---

### Bit Manipulation Patterns

| Problem | Bit Trick |
|---|---|
| Find single number | XOR all elements |
| Power of 2 check | `n & (n-1) == 0` |
| Count set bits | `n &= n-1` repeatedly |
| All subsets | Bitmask from 0 to 2ⁿ-1 |
| Swap without temp | `a ^= b; b ^= a; a ^= b` |
| Multiply/divide by 2 | Left/right shift |
| Isolate lowest set bit | `n & (-n)` |

---

## Comparison: Advanced Structures

| Structure | Query | Update | Space | Use Case |
|---|---|---|---|---|
| Prefix Array | O(1) | O(n) rebuild | O(n) | Static array, no updates |
| Fenwick Tree | O(log n) | O(log n) | O(n) | Point update + prefix sum |
| Segment Tree | O(log n) | O(log n) | O(4n) | Range query + range update |

---

## Classic Problems

| Problem | Technique |
|---|---|
| Single Number | XOR |
| Counting Bits | DP + bit tricks |
| Reverse Bits | Bit manipulation |
| Number of 1 Bits | Brian Kernighan's trick |
| All subsets | Bitmask DP |
| Range Sum Query (mutable) | Fenwick / Segment Tree |
| Count of Smaller Numbers | Fenwick Tree |
