---
id: pattern-recognition
title: Pattern Recognition — Interview Guide
sidebar_position: 10
---

# Pattern Recognition — How to Identify the Right Algorithm

This is the most critical skill in interviews. Given an unknown problem, you need to quickly identify **which pattern to apply**. Here's a systematic guide.

---

## The 5-Step Framework

When you see a problem:

```
1. Read the problem → identify key constraints
2. Look for trigger words & data types
3. Map to a pattern
4. Verify with small examples
5. Code the solution
```

---

## Pattern 1: Two Pointers

### When to Use

- Input is a **sorted array or string**
- Finding **pairs, triplets** with a target sum
- Checking **palindromes**
- Removing duplicates in-place

### Signal Words

> "sorted array", "pair with sum", "two sum sorted", "palindrome check", "remove duplicates in-place", "squaring a sorted array"

### Template

```cpp
// C++
int left = 0, right = n - 1;
while (left < right) {
    if (condition) {
        // found answer or record result
        left++; right--;
    } else if (needMore) {
        left++;
    } else {
        right--;
    }
}
```

### Classic Problems
- Two Sum II, 3Sum, Container With Most Water, Valid Palindrome

---

## Pattern 2: Sliding Window

### When to Use

- Finding **subarray or substring** satisfying a condition
- **Fixed window** size k
- **Variable window** that expands/shrinks

### Signal Words

> "subarray of size k", "longest substring without...", "minimum window substring", "max sum of k consecutive", "permutation in string"

### Template

```cpp
// C++: Variable window
int left = 0;
for (int right = 0; right < n; right++) {
    // add nums[right] to window

    while (window is invalid) {
        // remove nums[left] from window
        left++;
    }

    // window [left, right] is valid — update answer
    result = max(result, right - left + 1);
}
```

### Classic Problems
- Longest Substring Without Repeating Characters, Minimum Window Substring, Fruit Into Baskets

---

## Pattern 3: Fast & Slow Pointer

### When to Use

- **Cycle detection** in linked list or array
- Finding the **middle** of linked list
- Finding the **kth from end** node

### Signal Words

> "detect cycle", "find loop", "middle of list", "happy number"

### Template

```cpp
// C++
ListNode* slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true; // cycle
}
return false;
```

---

## Pattern 4: Binary Search

### When to Use

- Array is **sorted** (or monotonically arranged)
- Finding **first/last occurrence**
- Answer lies in a **monotonic range** (minimize/maximize)

### Signal Words

> "sorted array", "find target", "first position", "minimum time/speed/cost that works", "binary search on answer"

### Template

```cpp
// C++: Standard
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid)) hi = mid;   // or lo = mid + 1 depending on problem
    else lo = mid + 1;
}

// On answer space
int lo = minPossible, hi = maxPossible;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
}
return lo;
```

### Classic Problems
- Binary Search, Find First and Last Position, Koko Eating Bananas, Capacity to Ship Packages

---

## Pattern 5: BFS (Breadth First Search)

### When to Use

- **Shortest path** in unweighted graph or grid
- **Level-order** traversal
- **Multi-source** spreading (fire, infection)
- Reachability

### Signal Words

> "shortest path", "minimum steps", "level by level", "minimum distance", "all reachable"

### Template

```cpp
// C++
queue<int> q;
vector<bool> visited(n, false);
q.push(start); visited[start] = true;

while (!q.empty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) { // process level by level
        int node = q.front(); q.pop();
        // process node
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    level++;
}
```

---

## Pattern 6: DFS / Backtracking

### When to Use

- **All combinations, subsets, permutations**
- **All paths** in graph/tree
- **Constraint satisfaction** (Sudoku, N-Queens)
- Tree traversal (preorder, postorder)

### Signal Words

> "all possible", "generate all", "combinations", "permutations", "subsets", "paths", "N-Queens", "Sudoku"

### Template

```cpp
// C++: Backtracking
void backtrack(int start, vector<int>& current, vector<vector<int>>& result) {
    // optional: add to result
    result.push_back(current);

    for (int i = start; i < n; i++) {
        current.push_back(nums[i]); // choose
        backtrack(i + 1, current, result); // explore
        current.pop_back(); // unchoose (backtrack)
    }
}
```

---

## Pattern 7: Dynamic Programming

### When to Use

- Problem has **overlapping subproblems**
- Problem has **optimal substructure**
- "Count ways", "minimum/maximum value", "can you achieve X"
- After brute force you notice repeated computations

### Signal Words

> "minimum cost", "maximum profit", "count ways", "can we reach", "longest subsequence", "number of paths"

### How to Approach DP

```
1. Define state: dp[i] means "..."
2. Find recurrence: dp[i] = f(dp[i-1], dp[i-2], ...)
3. Handle base cases
4. Decide order (top-down or bottom-up)
5. Optimize space if needed
```

### Common DP Patterns

| Subtype | Key Recurrence |
|---|---|
| Fibonacci-style | `dp[i] = dp[i-1] + dp[i-2]` |
| 0/1 Knapsack | `dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt]+val)` |
| LCS | `dp[i][j] = 1 + dp[i-1][j-1]` if match |
| LIS | `dp[i] = max(dp[j]+1)` for j < i if nums[j] < nums[i] |
| Grid paths | `dp[i][j] = dp[i-1][j] + dp[i][j-1]` |

---

## Pattern 8: Heap / Priority Queue

### When to Use

- **Top K** largest or smallest elements
- **Kth element** in sorted order
- **Median** of stream
- Task/event scheduling by priority

### Signal Words

> "top K", "K largest", "K smallest", "kth element", "median", "sort K sorted arrays"

### Template

```cpp
// C++: Top K largest
priority_queue<int, vector<int>, greater<int>> minHeap; // min-heap of size k
for (int num : nums) {
    minHeap.push(num);
    if (minHeap.size() > k) minHeap.pop();
}
// minHeap.top() = kth largest
```

---

## Pattern 9: Greedy

### When to Use

- **Locally optimal** choice leads to global optimum
- Scheduling, interval, matching problems
- When DP works but greedy is simpler

### Signal Words

> "minimum number of...", "maximum number of non-overlapping", "scheduling", "meeting rooms", "assign tasks"

### Verification
Greedy requires proof that local choice doesn't hurt future decisions. Exchange argument: "if we swap this choice with another, the result can't improve."

---

## Pattern 10: Graph Algorithms

### How to Choose

```
Is the graph unweighted?
  → BFS for shortest path

Is the graph weighted, non-negative?
  → Dijkstra

Negative weights?
  → Bellman-Ford

Need all-pairs shortest path?
  → Floyd-Warshall

Directed acyclic graph with dependencies?
  → Topological Sort (Kahn's BFS)

Need connected components?
  → Union-Find or DFS

Need minimum spanning tree?
  → Kruskal (sort edges) or Prim (priority queue)
```

---

## Pattern 11: Trie

### When to Use

- **Prefix searching**, autocomplete
- Word dictionary problems
- Finding words in a grid

### Signal Words

> "prefix", "autocomplete", "dictionary", "starts with", "word search"

---

## Pattern 12: Monotonic Stack/Queue

### When to Use

- Next/Previous Greater or Smaller Element
- Largest rectangle in histogram
- Trapping rain water

### Signal Words

> "next greater element", "previous smaller", "span", "temperature", "histogram", "rain water"

---

## Master Pattern Table

| Signal in Problem | Pattern to Use |
|---|---|
| Sorted array, pair/triplet sum | Two Pointers |
| Subarray/substring with condition | Sliding Window |
| Cycle in linked list / middle node | Fast & Slow Pointer |
| Sorted data, find target / minimize-maximize | Binary Search |
| Shortest path, level-by-level | BFS |
| All paths, combinations, permutations | DFS / Backtracking |
| Count ways, optimal value, overlapping subproblems | Dynamic Programming |
| Top-K, median, scheduling | Heap |
| Non-overlapping intervals, scheduling | Greedy |
| Prefix matching, dictionary | Trie |
| Next greater / smaller | Monotonic Stack |
| Connected components, MST | Union-Find |
| Dependency ordering | Topological Sort |

---

## Decision Tree for Unknown Problems

```
Is the input sorted or can be sorted?
│
├─ Yes → Try Two Pointers or Binary Search first
│
└─ No
   │
   ├─ Linked list? → Fast & Slow Pointer (cycle/middle)
   │
   ├─ Tree? → DFS for depth/path, BFS for level order
   │
   ├─ Graph? → BFS (shortest), DFS (all paths), Dijkstra (weighted)
   │
   ├─ "All combinations/permutations"? → Backtracking
   │
   ├─ "Count ways / min / max"? → DP
   │   └─ Has choices per step? → Knapsack style
   │   └─ Two sequences? → LCS style
   │
   ├─ "Top K / Kth element"? → Heap
   │
   ├─ "Prefix / autocomplete"? → Trie
   │
   ├─ "Next greater/smaller"? → Monotonic Stack
   │
   └─ Brute force works? → Optimize with memoization → DP
```

---

## Red Flags & Common Mistakes

| Mistake | Fix |
|---|---|
| Using O(n²) when O(n log n) needed | Think sorting + two pointer or binary search |
| Recursion without memoization | Add cache — it's just DP |
| BFS on weighted graph | Use Dijkstra instead |
| DFS for shortest path in unweighted | Use BFS |
| Brute force all subsets O(2ⁿ) | Consider DP or sliding window |
| Not handling edge cases | Empty input, n=1, all same elements |
| Integer overflow | Use `long long` in C++, `long` in Java |

---

## Interview Strategy

1. **Repeat the problem** to confirm understanding
2. **Clarify constraints**: array size, value range, duplicates allowed?
3. **Start brute force** — state it, don't code it
4. **Identify pattern** using trigger words
5. **Discuss complexity** before coding
6. **Code clean solution**
7. **Test edge cases**: empty, single element, max size

> The goal isn't to memorize solutions. It's to recognize **which tool fits the problem shape**.
