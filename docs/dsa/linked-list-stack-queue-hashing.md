---
id: linked-list-stack-queue-hashing
title: Linked List, Stack, Queue & Hashing
sidebar_position: 5
---

# Linked List, Stack, Queue & Hashing

---

## Linked List

### Node Structure

```cpp
// C++
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
```

```java
// Java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}
```

---

### Reverse Linked List

**Pattern trigger:** "Reverse list", "palindrome linked list"

```cpp
// C++: Iterative — O(n) time, O(1) space
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next; // save next
        curr->next = prev;           // reverse pointer
        prev = curr;                 // move prev
        curr = next;                 // move curr
    }
    return prev;
}
```

```java
// Java: Iterative
ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

---

### Detect Cycle — Floyd's Algorithm

Two pointers: **slow** moves 1 step, **fast** moves 2 steps. If they meet → cycle exists.

**Pattern trigger:** "Detect cycle", "find loop", "linked list loop start"

```cpp
// C++
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find cycle start
ListNode* detectCycle(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head; // reset slow to head
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow; // cycle start
        }
    }
    return nullptr;
}
```

```java
// Java
boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}
```

---

### Find Middle Node

```cpp
// C++: Fast & Slow pointer
ListNode* middleNode(ListNode* head) {
    ListNode* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}
// [1,2,3,4,5] → returns node 3
```

```java
// Java
ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```

---

### Merge Two Sorted Lists

```cpp
// C++
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
    return dummy.next;
}
```

```java
// Java
ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}
```

---

## Stack

### LIFO — Last In First Out

```cpp
// C++
#include <stack>
stack<int> st;
st.push(10);    // push
st.push(20);
cout << st.top();  // 20 — peek
st.pop();          // remove top
cout << st.empty(); // false
```

```java
// Java
import java.util.Stack;
Stack<Integer> st = new Stack<>();
st.push(10);
st.push(20);
System.out.println(st.peek()); // 20
st.pop();
System.out.println(st.isEmpty()); // false
```

---

### Valid Parentheses

**Pattern trigger:** "Balanced brackets", "matching pairs", "valid expression"

```cpp
// C++
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.empty();
}
// Input: "()[]{}" → true
// Input: "([)]"   → false
```

```java
// Java
boolean isValid(String s) {
    Stack<Character> st = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.isEmpty()) return false;
            char top = st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.isEmpty();
}
```

---

### Monotonic Stack — Next Greater Element

**Pattern trigger:** "Next greater/smaller element", "daily temperatures", "stock span"

```cpp
// C++: Next Greater Element
vector<int> nextGreater(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st; // stores indices

    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}
// Input: [2,1,2,4,3] → [4,2,4,-1,-1]
```

```java
// Java
int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Stack<Integer> st = new Stack<>();

    for (int i = 0; i < n; i++) {
        while (!st.isEmpty() && nums[st.peek()] < nums[i]) {
            result[st.pop()] = nums[i];
        }
        st.push(i);
    }
    return result;
}
```

---

## Queue

### FIFO — First In First Out

```cpp
// C++
#include <queue>
queue<int> q;
q.push(10);
q.push(20);
cout << q.front(); // 10 — peek front
q.pop();           // remove front
cout << q.back();  // 20 — peek back
```

```java
// Java
import java.util.LinkedList;
import java.util.Queue;
Queue<Integer> q = new LinkedList<>();
q.offer(10);
q.offer(20);
System.out.println(q.peek()); // 10
q.poll();                     // remove
```

---

### Priority Queue (Heap-based)

**Pattern trigger:** "Top K elements", "K largest/smallest", "median", "task scheduling"

```cpp
// C++: Min heap
priority_queue<int, vector<int>, greater<int>> minHeap;
minHeap.push(5);
minHeap.push(1);
minHeap.push(3);
cout << minHeap.top(); // 1 — smallest

// Max heap (default)
priority_queue<int> maxHeap;
maxHeap.push(5); maxHeap.push(1); maxHeap.push(3);
cout << maxHeap.top(); // 5 — largest
```

```java
// Java: Min heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(1); minHeap.offer(3);
System.out.println(minHeap.peek()); // 1

// Max heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
maxHeap.offer(5); maxHeap.offer(1); maxHeap.offer(3);
System.out.println(maxHeap.peek()); // 5
```

---

### Deque — Sliding Window Maximum

```cpp
// C++: Max in each window of size k — O(n)
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // stores indices, front = max
    vector<int> result;

    for (int i = 0; i < nums.size(); i++) {
        // remove elements out of window
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        // remove smaller elements from back
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}
// Input: [1,3,-1,-3,5,3,6,7], k=3
// Output: [3,3,5,5,6,7]
```

```java
// Java
int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> dq = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
        while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
        dq.offerLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[dq.peekFirst()];
    }
    return result;
}
```

---

## Hashing

### HashMap / HashSet

O(1) average for insert, delete, lookup.

```cpp
// C++
#include <unordered_map>
#include <unordered_set>

unordered_map<string, int> freq;
freq["apple"]++;
freq["banana"] = 5;
if (freq.count("apple")) cout << freq["apple"]; // 1

unordered_set<int> seen;
seen.insert(3);
if (seen.count(3)) cout << "found"; // found
```

```java
// Java
Map<String, Integer> freq = new HashMap<>();
freq.put("apple", freq.getOrDefault("apple", 0) + 1);
freq.put("banana", 5);
if (freq.containsKey("apple")) System.out.println(freq.get("apple")); // 1

Set<Integer> seen = new HashSet<>();
seen.add(3);
if (seen.contains(3)) System.out.println("found");
```

---

### Two Sum — Classic Hash Map Problem

```cpp
// C++: O(n) time, O(n) space
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map; // value → index
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement))
            return {map[complement], i};
        map[nums[i]] = i;
    }
    return {};
}
// Input: [2,7,11,15], target=9 → [0,1]
```

```java
// Java
int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement))
            return new int[]{map.get(complement), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}
```

---

### Frequency Counter Pattern

```cpp
// C++: Anagram check
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;
    for (char c : t) {
        freq[c]--;
        if (freq[c] < 0) return false;
    }
    return true;
}
// "anagram" and "nagaram" → true
```

```java
// Java
boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] freq = new int[26];
    for (char c : s.toCharArray()) freq[c - 'a']++;
    for (char c : t.toCharArray()) {
        freq[c - 'a']--;
        if (freq[c - 'a'] < 0) return false;
    }
    return true;
}
```

---

## Pattern Recognition

| Problem | Structure | Why |
|---|---|---|
| Balanced parentheses | Stack | LIFO matches pairs |
| Next greater element | Monotonic Stack | Maintain decreasing order |
| BFS traversal | Queue | Level-by-level processing |
| Sliding window max | Deque | O(1) front/back access |
| Fast lookup, dedup | HashMap/HashSet | O(1) average ops |
| Top K frequent elements | Heap + Hash | Count then rank |

---

## Classic Problems

| Problem | Technique |
|---|---|
| Reverse Linked List | Pointer manipulation |
| Linked List Cycle | Fast & Slow pointer |
| Valid Parentheses | Stack |
| Daily Temperatures | Monotonic Stack |
| Sliding Window Maximum | Deque |
| Two Sum | HashMap |
| Group Anagrams | HashMap |
| Top K Frequent Elements | Heap + HashMap |
| LRU Cache | HashMap + Doubly Linked List |
