---
id: trees-heap-trie
title: Trees, Heap & Trie
sidebar_position: 6
---

# Trees, Heap & Trie

---

## Binary Tree

### Node Structure

```cpp
// C++
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

```java
// Java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}
```

---

### Tree Traversals

#### Inorder (Left → Root → Right)

Gives **sorted order** for BST.

```cpp
// C++: Recursive
void inorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    inorder(root->left, result);
    result.push_back(root->val);
    inorder(root->right, result);
}

// Iterative
vector<int> inorderIterative(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }
        curr = st.top(); st.pop();
        result.push_back(curr->val);
        curr = curr->right;
    }
    return result;
}
```

```java
// Java: Recursive
void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);
    inorder(root.right, result);
}
```

#### Preorder (Root → Left → Right)

Used to **copy** or **serialize** a tree.

```cpp
// C++
void preorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    result.push_back(root->val); // process root first
    preorder(root->left, result);
    preorder(root->right, result);
}
```

#### Postorder (Left → Right → Root)

Used to **delete** a tree or compute subtree results.

```cpp
// C++
void postorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    postorder(root->left, result);
    postorder(root->right, result);
    result.push_back(root->val); // process root last
}
```

#### Level Order (BFS)

**Pattern trigger:** "Level order", "zigzag", "right side view", "average of levels"

```cpp
// C++
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;

    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}
```

```java
// Java
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        result.add(level);
    }
    return result;
}
```

---

### Height of Tree

```cpp
// C++
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}
```

```java
// Java
int height(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(height(root.left), height(root.right));
}
```

---

### Lowest Common Ancestor (LCA)

```cpp
// C++: LCA of Binary Tree
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root; // p and q are in different subtrees
    return left ? left : right;
}
```

```java
// Java
TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}
```

---

### Diameter of Binary Tree

Longest path between any two nodes (may not pass through root).

```cpp
// C++
int diameter = 0;
int dfs(TreeNode* root) {
    if (!root) return 0;
    int left = dfs(root->left);
    int right = dfs(root->right);
    diameter = max(diameter, left + right); // path through root
    return 1 + max(left, right);            // height
}
int diameterOfBinaryTree(TreeNode* root) {
    dfs(root);
    return diameter;
}
```

```java
// Java
int diameter = 0;
int dfs(TreeNode root) {
    if (root == null) return 0;
    int left = dfs(root.left);
    int right = dfs(root.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
}
```

---

## Binary Search Tree (BST)

**Property:** Left subtree < Root < Right subtree (all nodes)

### Search in BST

```cpp
// C++: O(h) — h = height
TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return searchBST(root->left, val);
    return searchBST(root->right, val);
}
```

```java
// Java
TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    if (val < root.val) return searchBST(root.left, val);
    return searchBST(root.right, val);
}
```

### Validate BST

```cpp
// C++
bool isValid(TreeNode* root, long min, long max) {
    if (!root) return true;
    if (root->val <= min || root->val >= max) return false;
    return isValid(root->left, min, root->val) &&
           isValid(root->right, root->val, max);
}
bool isValidBST(TreeNode* root) {
    return isValid(root, LONG_MIN, LONG_MAX);
}
```

```java
// Java
boolean isValid(TreeNode root, long min, long max) {
    if (root == null) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValid(root.left, min, root.val) &&
           isValid(root.right, root.val, max);
}
boolean isValidBST(TreeNode root) {
    return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
```

---

## Heap

### Min Heap Implementation

```cpp
// C++: Using STL priority_queue
#include <queue>
priority_queue<int, vector<int>, greater<int>> minHeap;

minHeap.push(5);
minHeap.push(1);
minHeap.push(3);
cout << minHeap.top(); // 1
minHeap.pop();
cout << minHeap.top(); // 3
```

```java
// Java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(3);
System.out.println(minHeap.peek()); // 1
minHeap.poll();
System.out.println(minHeap.peek()); // 3
```

---

### Kth Largest Element

**Pattern trigger:** "K largest", "K smallest", "top K frequent"

```cpp
// C++: Use min heap of size k — O(n log k)
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop(); // keep only k largest
    }
    return minHeap.top(); // kth largest
}
// Input: [3,2,1,5,6,4], k=2 → Output: 5
```

```java
// Java
int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) minHeap.poll();
    }
    return minHeap.peek();
}
```

---

### Top K Frequent Elements

```cpp
// C++
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;

    // Min heap: {frequency, value}
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> minHeap;
    for (auto& [val, cnt] : freq) {
        minHeap.push({cnt, val});
        if (minHeap.size() > k) minHeap.pop();
    }

    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return result;
}
// Input: [1,1,1,2,2,3], k=2 → Output: [1,2]
```

```java
// Java
int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int n : nums) freq.merge(n, 1, Integer::sum);

    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
        minHeap.offer(new int[]{e.getValue(), e.getKey()});
        if (minHeap.size() > k) minHeap.poll();
    }

    int[] result = new int[k];
    for (int i = 0; i < k; i++) result[i] = minHeap.poll()[1];
    return result;
}
```

---

## Trie

Used for efficient **prefix searching**.

### Trie Node

```cpp
// C++
struct TrieNode {
    TrieNode* children[26];
    bool isEnd;
    TrieNode() : isEnd(false) {
        fill(children, children + 26, nullptr);
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx])
                curr->children[idx] = new TrieNode();
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }

    bool search(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEnd;
    }

    bool startsWith(string prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};
// insert("apple") → search("apple")=true, startsWith("app")=true
```

```java
// Java
class Trie {
    private TrieNode root = new TrieNode();

    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd;
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null)
                curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }
}
```

---

## Pattern Recognition

| Trigger | Structure |
|---|---|
| "Level by level", "shortest path in tree" | BFS (Queue) |
| "All paths", "path sum", "depth" | DFS (Recursion) |
| "Sorted order from BST" | Inorder traversal |
| "Copy/serialize tree" | Preorder |
| "Delete tree, subtree results" | Postorder |
| "K largest/smallest" | Heap |
| "Prefix search, autocomplete" | Trie |
| "Common ancestor" | LCA with DFS |

---

## Classic Problems

| Problem | Technique |
|---|---|
| Maximum Depth of Binary Tree | DFS |
| Symmetric Tree | DFS / BFS |
| Path Sum | DFS |
| Binary Tree Level Order | BFS |
| Lowest Common Ancestor | DFS |
| Diameter of Binary Tree | DFS with global max |
| Validate BST | DFS with bounds |
| Kth Largest in Stream | Min Heap |
| Word Search II | Trie + DFS |
| Implement Trie | Trie |
