---
id: graphs
title: Graphs
sidebar_position: 7
---

# Graphs

A graph is a collection of **nodes (vertices)** connected by **edges**. Graphs model networks, maps, dependencies, and relationships.

---

## Graph Representation

### Adjacency List (Preferred — Space efficient)

```cpp
// C++: Undirected graph
int n = 5; // 5 nodes: 0..4
vector<vector<int>> adj(n);

adj[0].push_back(1);
adj[1].push_back(0); // undirected: add both ways
adj[0].push_back(2);
adj[2].push_back(0);

// Weighted graph
vector<vector<pair<int,int>>> wadj(n); // {neighbor, weight}
wadj[0].push_back({1, 4});
wadj[1].push_back({0, 4});
```

```java
// Java
int n = 5;
List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

adj.get(0).add(1);
adj.get(1).add(0);

// Weighted
List<List<int[]>> wadj = new ArrayList<>();
for (int i = 0; i < n; i++) wadj.add(new ArrayList<>());
wadj.get(0).add(new int[]{1, 4}); // {neighbor, weight}
```

---

## BFS — Breadth First Search

Explores level by level. Used for **shortest path in unweighted graph**.

**Pattern trigger:** "Shortest path", "minimum steps", "level order in graph", "all reachable nodes"

```cpp
// C++: BFS
vector<int> bfs(int start, vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    vector<int> order;
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return order;
}
```

```java
// Java
List<Integer> bfs(int start, List<List<Integer>> adj, int n) {
    boolean[] visited = new boolean[n];
    List<Integer> order = new ArrayList<>();
    Queue<Integer> q = new LinkedList<>();

    visited[start] = true;
    q.offer(start);
    while (!q.isEmpty()) {
        int node = q.poll();
        order.add(node);
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.offer(neighbor);
            }
        }
    }
    return order;
}
```

### BFS Shortest Path

```cpp
// C++: Shortest distances from start
vector<int> shortestPath(int start, vector<vector<int>>& adj, int n) {
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        for (int neighbor : adj[node]) {
            if (dist[neighbor] == -1) {
                dist[neighbor] = dist[node] + 1;
                q.push(neighbor);
            }
        }
    }
    return dist;
}
```

---

## DFS — Depth First Search

Explores as deep as possible before backtracking.

**Pattern trigger:** "All paths", "connected components", "cycle detection", "topological order"

```cpp
// C++: DFS recursive
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int neighbor : adj[node]) {
        if (!visited[neighbor])
            dfs(neighbor, adj, visited);
    }
}

// DFS iterative
void dfsIterative(int start, vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    stack<int> st;
    st.push(start);
    while (!st.empty()) {
        int node = st.top(); st.pop();
        if (visited[node]) continue;
        visited[node] = true;
        cout << node << " ";
        for (int neighbor : adj[node])
            if (!visited[neighbor]) st.push(neighbor);
    }
}
```

```java
// Java: DFS recursive
void dfs(int node, List<List<Integer>> adj, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    for (int neighbor : adj.get(node)) {
        if (!visited[neighbor])
            dfs(neighbor, adj, visited);
    }
}
```

---

## Cycle Detection

### Undirected Graph (DFS)

```cpp
// C++
bool hasCycleDFS(int node, int parent, vector<vector<int>>& adj, vector<bool>& vis) {
    vis[node] = true;
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            if (hasCycleDFS(neighbor, node, adj, vis)) return true;
        } else if (neighbor != parent) {
            return true; // visited and not parent → cycle
        }
    }
    return false;
}
```

### Directed Graph (DFS + Recursion Stack)

```cpp
// C++
bool hasCycleDir(int node, vector<vector<int>>& adj,
                  vector<bool>& vis, vector<bool>& recStack) {
    vis[node] = recStack[node] = true;
    for (int neighbor : adj[node]) {
        if (!vis[neighbor] && hasCycleDir(neighbor, adj, vis, recStack))
            return true;
        else if (recStack[neighbor])
            return true; // back edge → cycle
    }
    recStack[node] = false;
    return false;
}
```

---

## Topological Sort

Order nodes in a **DAG** so every edge goes from earlier to later.

**Pattern trigger:** "Course prerequisite", "task scheduling", "build order", "dependency"

### Kahn's Algorithm (BFS-based)

```cpp
// C++
vector<int> topoSort(int n, vector<vector<int>>& adj) {
    vector<int> inDegree(n, 0);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) inDegree[v]++;

    queue<int> q;
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.push(i);

    vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int neighbor : adj[node]) {
            if (--inDegree[neighbor] == 0) q.push(neighbor);
        }
    }
    // If order.size() != n, there's a cycle
    return order;
}
// Classic Problem: Course Schedule II
```

```java
// Java
int[] topoSort(int n, List<List<Integer>> adj) {
    int[] inDegree = new int[n];
    for (int u = 0; u < n; u++)
        for (int v : adj.get(u)) inDegree[v]++;

    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.offer(i);

    int[] order = new int[n];
    int idx = 0;
    while (!q.isEmpty()) {
        int node = q.poll();
        order[idx++] = node;
        for (int neighbor : adj.get(node))
            if (--inDegree[neighbor] == 0) q.offer(neighbor);
    }
    return order;
}
```

---

## Dijkstra's Algorithm — Shortest Path (Non-negative weights)

**O((V + E) log V)** using priority queue.

**Pattern trigger:** "Shortest path weighted graph", "minimum cost path", "network delay"

```cpp
// C++
vector<int> dijkstra(int src, int n, vector<vector<pair<int,int>>>& adj) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;

    dist[src] = 0;
    pq.push({0, src}); // {distance, node}

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue; // stale entry

        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

```java
// Java
int[] dijkstra(int src, int n, List<List<int[]>> adj) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);

    dist[src] = 0;
    pq.offer(new int[]{0, src});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;

        for (int[] edge : adj.get(u)) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}
```

---

## Bellman-Ford — Handles Negative Weights

**O(VE)** — relaxes all edges V-1 times.

```cpp
// C++
vector<int> bellmanFord(int src, int n, vector<tuple<int,int,int>>& edges) {
    // edges: {u, v, weight}
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;

    for (int i = 0; i < n - 1; i++) { // relax n-1 times
        for (auto [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
    // Check for negative cycles
    for (auto [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[u] + w < dist[v])
            cout << "Negative cycle detected!";
    }
    return dist;
}
```

---

## Union-Find (Disjoint Set) — Connected Components

**Pattern trigger:** "Connected components", "cycle detection undirected", "MST (Kruskal)"

```cpp
// C++: Union-Find with path compression & rank
struct UnionFind {
    vector<int> parent, rank;
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]); // path compression
        return parent[x];
    }
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false; // already connected
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};

// Number of connected components
int countComponents(int n, vector<vector<int>>& edges) {
    UnionFind uf(n);
    int components = n;
    for (auto& e : edges)
        if (uf.unite(e[0], e[1])) components--;
    return components;
}
```

```java
// Java
class UnionFind {
    int[] parent, rank;
    UnionFind(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    boolean unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
}
```

---

## Graph Algorithms Comparison

| Algorithm | Type | Complexity | Use Case |
|---|---|---|---|
| BFS | Traversal | O(V+E) | Shortest path (unweighted) |
| DFS | Traversal | O(V+E) | Paths, cycle detection |
| Dijkstra | Shortest Path | O((V+E) log V) | Non-negative weights |
| Bellman-Ford | Shortest Path | O(VE) | Negative weights |
| Floyd-Warshall | All-Pairs | O(V³) | All pairs shortest path |
| Kahn's (BFS) | Topo Sort | O(V+E) | DAG ordering |
| Union-Find | Components | O(α(n)) ≈ O(1) | Connected components |
| Kruskal | MST | O(E log E) | Minimum spanning tree |

---

## Pattern Recognition

| Trigger Words | Algorithm |
|---|---|
| "Shortest path", "minimum hops" (unweighted) | BFS |
| "All paths", "exists path", "connected" | DFS |
| "Minimum cost path" (weighted, non-negative) | Dijkstra |
| "Negative weights", "negative cycle" | Bellman-Ford |
| "Task ordering", "course prerequisite" | Topological Sort |
| "Connected components", "groups" | Union-Find / DFS |
| "Minimum spanning tree" | Kruskal / Prim |
| "Island counting" | DFS / BFS on grid |

---

## Classic Problems

| Problem | Algorithm |
|---|---|
| Number of Islands | DFS/BFS on grid |
| Course Schedule | Topological Sort |
| Network Delay Time | Dijkstra |
| Word Ladder | BFS |
| Clone Graph | BFS/DFS |
| Redundant Connection | Union-Find |
| Walls and Gates | Multi-source BFS |
| Pacific Atlantic Water Flow | DFS from borders |
