---
id: arrays-strings
title: Arrays & Strings
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Arrays & Strings

Arrays are the most fundamental data structure. Mastering array techniques unlocks most interview problems.

---

## Arrays

### Basics

Contiguous memory locations storing elements of the same type. Access is **O(1)** by index.

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
#include <vector>
vector<int> arr = {1, 2, 3, 4, 5};
cout << arr[2];   // 3 — O(1) access
arr.push_back(6); // O(1) amortized
arr.erase(arr.begin() + 1); // O(n) — shifts elements
```

</TabItem>
<TabItem value="java" label="Java">

```java
int[] arr = {1, 2, 3, 4, 5};
System.out.println(arr[2]); // 3

// Dynamic array
import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(6);        // O(1) amortized
list.remove(1);     // O(n) — shifts elements
```

</TabItem>
</Tabs>

---

### Prefix Sum

Precompute cumulative sums to answer **range sum queries** in O(1) after O(n) preprocessing.

**Pattern trigger:** "Sum of subarray", "range sum", "sum equals k"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
vector<int> arr = {1, 2, 3, 4, 5};
int n = arr.size();
vector<int> prefix(n + 1, 0);

for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Sum of arr[l..r] (0-indexed, inclusive)
auto rangeSum = [&](int l, int r) {
    return prefix[r + 1] - prefix[l];
};

cout << rangeSum(1, 3); // 2+3+4 = 9
```

</TabItem>
<TabItem value="java" label="Java">

```java
int[] arr = {1, 2, 3, 4, 5};
int n = arr.length;
int[] prefix = new int[n + 1];

for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Sum of arr[l..r] (0-indexed, inclusive)
int rangeSum = prefix[4] - prefix[1]; // 2+3+4 = 9
System.out.println(rangeSum);
```

</TabItem>
</Tabs>

**Classic Problem:** Subarray Sum Equals K — Use prefix sum + HashMap.

---

### Kadane's Algorithm — Maximum Subarray Sum

**Pattern trigger:** "Maximum subarray", "contiguous subarray", "largest sum"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int curSum = nums[0];

    for (int i = 1; i < nums.size(); i++) {
        curSum = max(nums[i], curSum + nums[i]); // extend or restart
        maxSum = max(maxSum, curSum);
    }
    return maxSum;
}
// Input: [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6 (subarray: [4,-1,2,1])
```

</TabItem>
<TabItem value="java" label="Java">

```java
int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int curSum = nums[0];

    for (int i = 1; i < nums.length; i++) {
        curSum = Math.max(nums[i], curSum + nums[i]);
        maxSum = Math.max(maxSum, curSum);
    }
    return maxSum;
}
// Input: [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6 (subarray: [4,-1,2,1])
```

</TabItem>
</Tabs>

**Key insight:** At each position, either start fresh or extend the previous subarray.

---

### Two Pointer Technique

Reduce O(n²) brute force to O(n) using two indices moving toward each other.

**Pattern trigger:** "Sorted array", "pair with sum X", "three sum", "container with most water"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// Two Sum II (sorted array)
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left + 1, right + 1};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
int[] twoSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum < target) left++;
        else right--;
    }
    return new int[]{};
}
```

</TabItem>
</Tabs>

**Classic Problems:** Two Sum, 3Sum, Container With Most Water, Trapping Rain Water

---

### Sliding Window

Maintain a window and slide it across the array.

**Pattern trigger:** "Subarray of size k", "longest substring without...", "minimum window", "max sum of k elements"

#### Fixed Window

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// Max sum subarray of size k
int maxSumK(vector<int>& arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k]; // slide: add new, remove old
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
int maxSumK(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
```

</TabItem>
</Tabs>

#### Variable Window

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
// Longest substring without repeating characters
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> freq;
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        freq[s[right]]++;
        while (freq[s[right]] > 1) {
            freq[s[left]]--;
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
// Input: "abcabcbb" → Output: 3 ("abc")
```

</TabItem>
<TabItem value="java" label="Java">

```java
int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> freq = new HashMap<>();
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        freq.merge(s.charAt(right), 1, Integer::sum);
        while (freq.get(s.charAt(right)) > 1) {
            freq.merge(s.charAt(left), -1, Integer::sum);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
// Input: "abcabcbb" → Output: 3 ("abc")
```

</TabItem>
</Tabs>

---

## Strings

### String Manipulation

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
#include <string>
string s = "hello";
reverse(s.begin(), s.end());       // "olleh"
s.substr(1, 3);                    // "ell" (start, length)
s.find("ll");                      // 1 (index)
transform(s.begin(),s.end(),s.begin(),toupper); // "HELLO"
```

</TabItem>
<TabItem value="java" label="Java">

```java
String s = "hello";
new StringBuilder(s).reverse().toString(); // "olleh"
s.substring(1, 4);     // "ell" (start inclusive, end exclusive)
s.indexOf("ll");       // 2
s.toUpperCase();       // "HELLO"
s.split(",");          // split by delimiter
```

</TabItem>
</Tabs>

---

### KMP Algorithm — Pattern Matching

Find pattern P in text T in **O(n + m)** instead of O(nm) naive.

**Pattern trigger:** "Find pattern in text", "string matching", "number of occurrences"

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
vector<int> buildLPS(string& pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    int len = 0, i = 1;

    while (i < m) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len != 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

vector<int> KMPSearch(string& text, string& pattern) {
    vector<int> lps = buildLPS(pattern);
    vector<int> matches;
    int i = 0, j = 0;

    while (i < text.size()) {
        if (text[i] == pattern[j]) { i++; j++; }
        if (j == pattern.size()) {
            matches.push_back(i - j);
            j = lps[j - 1];
        } else if (i < text.size() && text[i] != pattern[j]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    return matches;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
int[] buildLPS(String pattern) {
    int m = pattern.length();
    int[] lps = new int[m];
    int len = 0, i = 1;

    while (i < m) {
        if (pattern.charAt(i) == pattern.charAt(len)) {
            lps[i++] = ++len;
        } else if (len != 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}
```

</TabItem>
</Tabs>

---

### Palindrome Check

<Tabs groupId="language">
<TabItem value="cpp" label="C++">

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++; right--;
    }
    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++; right--;
    }
    return true;
}
```

</TabItem>
</Tabs>

---

## Pattern Recognition Summary

| Problem Type | Technique | Signal Words |
|---|---|---|
| Range sum query | Prefix Sum | "sum of subarray", "between index i and j" |
| Max/min subarray sum | Kadane's | "maximum contiguous", "largest sum" |
| Pair/triplet in sorted array | Two Pointer | "sorted", "pair sum", "two sum" |
| Subarray/substring conditions | Sliding Window | "k elements", "longest without", "minimum window" |
| Find pattern in text | KMP | "occurrences of pattern", "string search" |

---

## Classic Problems to Practice

| Problem | Technique | Difficulty |
|---|---|---|
| Maximum Subarray | Kadane's | Easy |
| Two Sum | Hash Map | Easy |
| Longest Substring Without Repeating | Sliding Window | Medium |
| 3Sum | Two Pointer | Medium |
| Minimum Window Substring | Sliding Window | Hard |
| Trapping Rain Water | Two Pointer / Stack | Hard |
| Subarray Sum Equals K | Prefix Sum + Hash | Medium |
