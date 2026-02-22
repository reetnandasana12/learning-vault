---
id: recursion-searching-sorting
title: Recursion, Searching & Sorting
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Recursion, Searching & Sorting

---

## Recursion

### How Recursion Works

Every recursive function needs:
1. **Base case** — stops recursion
2. **Recursive case** — reduces problem size

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Factorial
int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

</TabItem>
</Tabs>

---

### Fibonacci (Memoized)

Naive recursion is O(2ⁿ). With memoization → O(n).

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
unordered_map<int, long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
Map<Integer, Long> memo = new HashMap<>();
long fib(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long result = fib(n - 1) + fib(n - 2);
    memo.put(n, result);
    return result;
}
```

</TabItem>
</Tabs>

---

### Backtracking

Try all possibilities. If current path fails, **undo** (backtrack) and try next.

**Pattern trigger:** "All combinations", "all permutations", "all subsets", "N-Queens", "Sudoku"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Generate all subsets
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;

    function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        for (int i = start; i < nums.size(); i++) {
            current.push_back(nums[i]);   // choose
            backtrack(i + 1);             // explore
            current.pop_back();           // unchoose (backtrack)
        }
    };

    backtrack(0);
    return result;
}
// Input: [1,2,3]
// Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
List<List<Integer>> result = new ArrayList<>();

void backtrack(int[] nums, int start, List<Integer> current) {
    result.add(new ArrayList<>(current));
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);        // choose
        backtrack(nums, i + 1, current); // explore
        current.remove(current.size() - 1); // unchoose
    }
}
```

</TabItem>
</Tabs>

---

### Permutations

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: All permutations
vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;

    function<void(int)> backtrack = [&](int start) {
        if (start == nums.size()) {
            result.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(start + 1);
            swap(nums[start], nums[i]); // backtrack
        }
    };

    backtrack(0);
    return result;
}
// Input: [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
List<List<Integer>> result = new ArrayList<>();

void permute(int[] nums, int start) {
    if (start == nums.length) {
        List<Integer> list = new ArrayList<>();
        for (int n : nums) list.add(n);
        result.add(list);
        return;
    }
    for (int i = start; i < nums.length; i++) {
        // swap
        int temp = nums[start]; nums[start] = nums[i]; nums[i] = temp;
        permute(nums, start + 1);
        // swap back
        temp = nums[start]; nums[start] = nums[i]; nums[i] = temp;
    }
}
```

</TabItem>
</Tabs>

---

## Searching

### Linear Search — O(n)

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++)
        if (arr[i] == target) return i;
    return -1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++)
        if (arr[i] == target) return i;
    return -1;
}
```

</TabItem>
</Tabs>

---

### Binary Search — O(log n)

Only works on **sorted** arrays. Halves search space each step.

**Pattern trigger:** "Sorted array", "find target", "minimize/maximize answer", "first/last position"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Standard binary search
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2; // avoid overflow
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

#### Binary Search on Answer

When you can't binary search on indices but can on the **answer space**.

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++: Find minimum value that satisfies a condition
// Example: Koko Eating Bananas
int minEatingSpeed(vector<int>& piles, int h) {
    int lo = 1, hi = *max_element(piles.begin(), piles.end());

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long long hours = 0;
        for (int p : piles) hours += (p + mid - 1) / mid;

        if (hours <= h) hi = mid; // can eat slower
        else lo = mid + 1;        // need to eat faster
    }
    return lo;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int minEatingSpeed(int[] piles, int h) {
    int lo = 1, hi = 0;
    for (int p : piles) hi = Math.max(hi, p);

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long hours = 0;
        for (int p : piles) hours += (p + mid - 1) / mid;
        if (hours <= h) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

</TabItem>
</Tabs>

---

## Sorting

### Merge Sort — O(n log n) — Stable

Divide array in halves, sort each, then merge.

**When to use:** Need stable sort, guaranteed O(n log n), counting inversions.

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size())
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

void merge(int[] arr, int l, int m, int r) {
    int[] left = Arrays.copyOfRange(arr, l, m + 1);
    int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.length && j < right.length)
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}
```

</TabItem>
</Tabs>

---

### Quick Sort — O(n log n) avg, O(n²) worst

Partition around pivot. In-place.

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
int partition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[hi]);
    return i + 1;
}

void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo < hi) {
        int pi = partition(arr, lo, hi);
        quickSort(arr, lo, pi - 1);
        quickSort(arr, pi + 1, hi);
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
int partition(int[] arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i+1]; arr[i+1] = arr[hi]; arr[hi] = tmp;
    return i + 1;
}

void quickSort(int[] arr, int lo, int hi) {
    if (lo < hi) {
        int pi = partition(arr, lo, hi);
        quickSort(arr, lo, pi - 1);
        quickSort(arr, pi + 1, hi);
    }
}
```

</TabItem>
</Tabs>

---

### Counting Sort — O(n + k)

Works when elements are in a known small range [0, k].

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// C++
void countingSort(vector<int>& arr, int maxVal) {
    vector<int> count(maxVal + 1, 0);
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]-- > 0) arr[idx++] = i;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
void countingSort(int[] arr, int maxVal) {
    int[] count = new int[maxVal + 1];
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]-- > 0) arr[idx++] = i;
}
```

</TabItem>
</Tabs>

---

## Sorting Algorithm Comparison

| Algorithm | Time (avg) | Space | Stable | Best Use |
|---|---|---|---|---|
| Bubble Sort | O(n²) | O(1) | Yes | Teaching only |
| Selection Sort | O(n²) | O(1) | No | Small arrays |
| Insertion Sort | O(n²) | O(1) | Yes | Nearly sorted |
| Merge Sort | O(n log n) | O(n) | Yes | Guaranteed perf |
| Quick Sort | O(n log n) | O(log n) | No | General purpose |
| Heap Sort | O(n log n) | O(1) | No | Memory limited |
| Counting Sort | O(n+k) | O(k) | Yes | Small integer range |

---

## Pattern Recognition

| Trigger | Algorithm |
|---|---|
| "All combinations / subsets / permutations" | Backtracking |
| "Find in sorted array" | Binary Search |
| "Minimize/maximize a value that satisfies condition" | Binary Search on Answer |
| "Sort by multiple criteria" | Custom comparator |
| "Count inversions" | Merge Sort |
| "Small range integers to sort" | Counting / Radix Sort |

---

## Classic Problems

| Problem | Technique |
|---|---|
| N-Queens | Backtracking |
| Sudoku Solver | Backtracking |
| Word Search | DFS + Backtracking |
| Koko Eating Bananas | Binary Search on Answer |
| Find First and Last Position | Binary Search |
| Sort Colors | Dutch Flag (3-way partition) |
| Count Inversions | Merge Sort |
