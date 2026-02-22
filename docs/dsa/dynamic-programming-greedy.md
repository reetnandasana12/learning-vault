---
id: dynamic-programming-greedy
title: Dynamic Programming & Greedy
sidebar_position: 8
---

# Dynamic Programming & Greedy

---

## Dynamic Programming

DP solves problems with **overlapping subproblems** and **optimal substructure** by storing results to avoid recomputation.

### Two Approaches

| Approach | Style | When to Use |
|---|---|---|
| Memoization | Top-down (recursion + cache) | Natural recursive structure |
| Tabulation | Bottom-up (iteration + table) | Better space/constant optimization |

---

### Fibonacci — DP Introduction

```cpp
// C++ — Memoization (Top-down)
unordered_map<int, long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

// Tabulation (Bottom-up) — O(n) time, O(1) space
long long fibTab(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

```java
// Java — Tabulation
long fib(int n) {
    if (n <= 1) return n;
    long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long curr = prev1 + prev2;
        prev2 = prev1; prev1 = curr;
    }
    return prev1;
}
```

---

### 0/1 Knapsack

Each item can be taken **at most once**. Maximize value with weight limit W.

**Pattern trigger:** "Choose items with weight constraint", "include/exclude", "partition equal subset"

```cpp
// C++: dp[i][w] = max value using first i items with capacity w
int knapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w]; // don't take item i
            if (weights[i-1] <= w)
                dp[i][w] = max(dp[i][w], dp[i-1][w - weights[i-1]] + values[i-1]);
        }
    }
    return dp[n][W];
}
// weights=[1,3,4,5], values=[1,4,5,7], W=7 → 9
```

```java
// Java — Space optimized 1D DP
int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[] dp = new int[W + 1];

    for (int i = 0; i < n; i++) {
        for (int w = W; w >= weights[i]; w--) { // iterate backward!
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}
```

**Key insight:** Iterate weight **backward** in 1D to ensure each item used at most once.

---

### Unbounded Knapsack — Coin Change

Each item can be taken **unlimited** times. Find minimum coins for amount.

**Pattern trigger:** "Minimum coins", "ways to make change", "rod cutting", "item used multiple times"

```cpp
// C++: Minimum coins — dp[i] = min coins to make amount i
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1); // init with impossible value
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i)
                dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
// coins=[1,5,6,9], amount=11 → 2 (5+6)
```

```java
// Java
int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
```

---

### Longest Common Subsequence (LCS)

Find longest subsequence common to both strings (characters don't need to be contiguous).

**Pattern trigger:** "Common subsequence", "edit distance", "shortest common supersequence"

```cpp
// C++: dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]
int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = 1 + dp[i-1][j-1];
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}
// s1="ABCBDAB", s2="BDCABA" → 4 ("BCBA")
```

```java
// Java
int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (s1.charAt(i-1) == s2.charAt(j-1))
                dp[i][j] = 1 + dp[i-1][j-1];
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}
```

---

### Longest Increasing Subsequence (LIS)

Find the length of the longest strictly increasing subsequence.

```cpp
// C++ — O(n²) DP
int lis(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1); // each element is LIS of length 1

    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (nums[j] < nums[i])
                dp[i] = max(dp[i], dp[j] + 1);

    return *max_element(dp.begin(), dp.end());
}
// Input: [10,9,2,5,3,7,101,18] → 4 ([2,3,7,101])

// O(n log n) using patience sorting
int lisOptimal(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}
```

```java
// Java — O(n log n)
int lis(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int pos = Collections.binarySearch(tails, x);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(x);
        else tails.set(pos, x);
    }
    return tails.size();
}
```

---

### Edit Distance

Minimum operations (insert, delete, replace) to transform s1 to s2.

```cpp
// C++
int editDistance(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = i; // delete all
    for (int j = 0; j <= n; j++) dp[0][j] = j; // insert all

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j],    // delete
                                    dp[i][j-1],    // insert
                                    dp[i-1][j-1]}); // replace
        }
    }
    return dp[m][n];
}
// "horse" → "ros" = 3 operations
```

```java
// Java
int editDistance(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (s1.charAt(i-1) == s2.charAt(j-1))
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + Math.min(dp[i-1][j],
                               Math.min(dp[i][j-1], dp[i-1][j-1]));
    return dp[m][n];
}
```

---

### DP on Trees — Maximum Path Sum

```cpp
// C++
int maxSum = INT_MIN;
int dfs(TreeNode* root) {
    if (!root) return 0;
    int left = max(0, dfs(root->left));   // discard negative paths
    int right = max(0, dfs(root->right));
    maxSum = max(maxSum, left + right + root->val); // path through root
    return root->val + max(left, right);             // path going up
}
int maxPathSum(TreeNode* root) {
    dfs(root);
    return maxSum;
}
```

---

## Greedy Algorithms

Make the **locally optimal choice** at each step hoping to reach the global optimum.

**When it works:** Problems with greedy choice property + optimal substructure.

---

### Activity Selection

Maximum number of non-overlapping activities.

**Pattern trigger:** "Maximum activities", "non-overlapping intervals", "meeting rooms"

```cpp
// C++: Sort by end time, greedily pick earliest ending
int activitySelection(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(),
         [](auto& a, auto& b){ return a.second < b.second; });

    int count = 1;
    int lastEnd = activities[0].second;

    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].first >= lastEnd) { // no overlap
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}
// activities=[(1,4),(3,5),(0,6),(5,7),(3,8),(5,9),(6,10),(8,11),(8,12),(2,13),(12,14)]
// Output: 4
```

```java
// Java
int activitySelection(int[][] activities) {
    Arrays.sort(activities, (a, b) -> a[1] - b[1]); // sort by end time
    int count = 1, lastEnd = activities[0][1];

    for (int i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEnd) {
            count++;
            lastEnd = activities[i][1];
        }
    }
    return count;
}
```

---

### Fractional Knapsack

Take fractions of items to maximize value.

```cpp
// C++
double fractionalKnapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<pair<double,int>> ratio(n);
    for (int i = 0; i < n; i++)
        ratio[i] = {(double)values[i] / weights[i], i};

    sort(ratio.rbegin(), ratio.rend()); // sort by value/weight descending

    double totalValue = 0;
    for (auto [r, i] : ratio) {
        if (W >= weights[i]) {
            totalValue += values[i];
            W -= weights[i];
        } else {
            totalValue += r * W; // take fraction
            break;
        }
    }
    return totalValue;
}
```

```java
// Java
double fractionalKnapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Double.compare((double)values[b]/weights[b], (double)values[a]/weights[a]));

    double total = 0;
    for (int i : idx) {
        if (W >= weights[i]) { total += values[i]; W -= weights[i]; }
        else { total += (double) values[i] / weights[i] * W; break; }
    }
    return total;
}
```

---

### Jump Game

Can you reach the last index?

```cpp
// C++: Greedy — track max reachable index
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false; // stuck
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}
// Input: [2,3,1,1,4] → true
// Input: [3,2,1,0,4] → false
```

```java
// Java
boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}
```

---

## DP vs Greedy

| Aspect | Dynamic Programming | Greedy |
|---|---|---|
| Decisions | Consider all choices | Always local optimal |
| Speed | Slower (polynomial) | Faster |
| Correctness | Always optimal | Only sometimes |
| Examples | Knapsack, LCS, Edit Distance | Activity Selection, Fractional Knapsack |

---

## Pattern Recognition

| Trigger | Approach |
|---|---|
| "Minimum/maximum", "count ways", "overlapping subproblems" | DP |
| "Include or exclude each item" | 0/1 Knapsack |
| "Item used unlimited times" | Unbounded Knapsack |
| "Two sequences", "common subsequence" | LCS DP |
| "Non-overlapping intervals", "scheduling" | Greedy (sort by end) |
| "Minimum coins/jumps" | DP (Greedy sometimes) |
| "Locally optimal works" | Greedy |

---

## Classic Problems

| Problem | Type |
|---|---|
| Climbing Stairs | DP (Fibonacci) |
| Coin Change | Unbounded Knapsack DP |
| Partition Equal Subset Sum | 0/1 Knapsack DP |
| Longest Common Subsequence | DP |
| Edit Distance | DP |
| Word Break | DP |
| House Robber | DP |
| Jump Game | Greedy |
| Meeting Rooms II | Greedy (sweep line) |
| Task Scheduler | Greedy |
