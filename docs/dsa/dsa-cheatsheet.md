---
id: dsa-cheatsheet
title: DSA Quick Reference Cheatsheet
sidebar_position: 99
---

# 📘 Data Structures & Algorithms (DSA) — Quick Reference Cheatsheet

---

## 1️⃣ Big-O & Complexity Analysis

### Time Complexity
Measures how the running time of an algorithm grows with input size (O(1), O(n), O(log n), O(n²), etc.).

### Space Complexity
Measures the extra memory used by an algorithm relative to input size.

### Asymptotic Notations
Big-O (Worst case), Omega (Best case), Theta (Average case).

---

## 2️⃣ Arrays

| Topic | Description |
|---|---|
| Array Basics | Linear data structure, contiguous memory |
| Traversal | Visit each element sequentially |
| Insertion & Deletion | May require shifting elements |
| Prefix Sum | Preprocess cumulative sums for range queries |
| Kadane's Algorithm | Find maximum subarray sum |
| Two Pointer | Optimize sorted array / pair sum problems |
| Sliding Window | Efficient subarray/substring problems |

---

## 3️⃣ Strings

| Topic | Description |
|---|---|
| String Manipulation | Concat, substring, reverse, compare |
| Pattern Matching | Naive approach |
| KMP Algorithm | Efficient pattern matching |
| Rabin-Karp | Hash-based searching |
| Z Algorithm | Pattern search & substring |
| Palindrome | Forward == Backward |

---

## 4️⃣ Recursion & Backtracking

| Topic | Description |
|---|---|
| Recursion Basics | Function calling itself |
| Tail Recursion | Recursive call is last operation |
| Backtracking | Explore all possibilities, undo choices |
| Subset Generation | All subsets of a set |
| Permutations | All possible arrangements |

---

## 5️⃣ Searching

| Algorithm | Complexity |
|---|---|
| Linear Search | O(n) |
| Binary Search | O(log n) |
| Ternary Search | O(log₃ n) |

---

## 6️⃣ Sorting

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) |

---

## 7️⃣ Linked List

| Type | Description |
|---|---|
| Singly | Nodes with next pointer |
| Doubly | Nodes with next & prev pointers |
| Circular | Last node → First node |
| Reverse | Flip pointer direction |
| Floyd's Algorithm | Detect cycle with slow/fast pointer |

---

## 8️⃣ Stack & Queue

| Structure | Property | Applications |
|---|---|---|
| Stack | LIFO | Parenthesis check, expression eval, recursion |
| Queue | FIFO | BFS, scheduling |
| Circular Queue | Fixed array | Efficient implementation |
| Deque | Both ends | Sliding window max |
| Priority Queue | Priority-based | Dijkstra, K largest |
| Monotonic Stack | Increasing/Decreasing | Next Greater Element |

---

## 9️⃣ Hashing

| Concept | Description |
|---|---|
| Hash Table | Key-value via hash function |
| Chaining | Linked list per bucket |
| Open Addressing | Probe next empty slot |
| HashMap | O(1) avg lookup |
| HashSet | Unique element storage |

---

## 🔟 Trees

| Concept | Description |
|---|---|
| Binary Tree | ≤ 2 children |
| BST | Left < Root < Right |
| Inorder | Left → Root → Right |
| Preorder | Root → Left → Right |
| Postorder | Left → Right → Root |
| LCA | Lowest Common Ancestor |
| Diameter | Longest path between nodes |

---

## 1️⃣1️⃣ Heap

| Type | Property | Use |
|---|---|---|
| Min Heap | Parent ≤ children | Top-K smallest |
| Max Heap | Parent ≥ children | Top-K largest |

---

## 1️⃣2️⃣ Trie

| Operation | Complexity |
|---|---|
| Insert | O(L) |
| Search | O(L) |
| Prefix Search | O(L) |

L = length of word

---

## 1️⃣3️⃣ Graphs

| Algorithm | Use Case | Complexity |
|---|---|---|
| BFS | Shortest path (unweighted) | O(V+E) |
| DFS | Traversal, cycle detect | O(V+E) |
| Dijkstra | Shortest path (non-negative) | O((V+E) log V) |
| Bellman-Ford | Negative weights | O(VE) |
| Floyd-Warshall | All pairs shortest path | O(V³) |
| Topological Sort | DAG ordering | O(V+E) |
| Kruskal/Prim | MST | O(E log E) |

---

## 1️⃣4️⃣ Dynamic Programming

| Pattern | Classic Problems |
|---|---|
| 0/1 Knapsack | Knapsack, Subset Sum |
| Unbounded Knapsack | Coin Change, Rod Cutting |
| LCS | LCS, Edit Distance |
| LIS | LIS, Box Stacking |
| Matrix DP | Matrix Chain, Grid paths |
| DP on Trees | Tree diameter, Tree knapsack |
| DP on Strings | Palindrome, Edit Distance |

---

## 1️⃣5️⃣ Greedy

| Problem | Strategy |
|---|---|
| Activity Selection | Sort by end time |
| Huffman Coding | Min frequency first |
| Fractional Knapsack | Best ratio first |

---

## 1️⃣6️⃣ Bit Manipulation

| Trick | Expression |
|---|---|
| Check even/odd | `n & 1` |
| Power of two | `n & (n-1) == 0` |
| Toggle bit i | `n ^ (1 << i)` |
| Set bit i | `n \| (1 << i)` |
| Clear bit i | `n & ~(1 << i)` |
| Count set bits | `__builtin_popcount(n)` |

---

## 🎯 Interview Pattern Recognition

| Pattern | Trigger Keywords |
|---|---|
| Two Pointers | Sorted array, pair, triplet |
| Sliding Window | Subarray, substring, window |
| Fast & Slow Pointer | Cycle detection, middle node |
| Binary Search | Sorted, monotonic, minimize/maximize |
| BFS | Level order, shortest path |
| DFS/Backtracking | All paths, permutations, combinations |
| DP | Optimal, count ways, overlapping |
| Greedy | Locally optimal, scheduling |
| Heap | Top-K, median, priority |
| Trie | Prefix, dictionary, autocomplete |
| Union-Find | Connected components, MST |
| Topological Sort | Dependency ordering, DAG |

---

> 🚀 **Goal:** Quick revision reference for interviews and problem solving.
> Update regularly while solving problems.
