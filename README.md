### tree-tools

该库是一个操作树的工具库

### Api详情，具体用法请参照示例

```typescript
interface TreeTools {
  config;
  traversalBFS;
  traversalDFS;
  constructor(config: TreeAttribute);
  create(config?: TreeAttribute): TreeTools;
  format(list: any[]): any[];
  flat(tree: any[], config?: Config): any[];
  find(tree: any[], callback: (node: any) => boolean): any[];
  insert(tree: any[], targetNode: any, insertNode: any, config?: Config): any[];
  remove(tree: any[], callback: (node: any) => boolean): any[];
  map(tree: any[], callback: (node: any) => void): any[];
}

export interface TreeAttribute {
    id?: string;
    pid?: string;
    children?: string;
}

type Config = {
    type?: 'BFS' | 'DFS';
    order?: 'Front' | 'Back';
};

enum TraversalType {
    'BFS' = "BFS",
    'DFS' = "DFS"
}

enum InsertOrder {
    'Front' = "Front",
    'Back' = "Back"
}
```

### 示例

#### 数据

```javascript
const treeData = [
  {
    id: "1",
    parentId: "0",
    name: "rinvay1",
    children: [
      {
        id: "1-2",
        parentId: "1",
        name: "rinvay1-2",
        children: [
          {
            id: "1-2-1",
            parentId: "1-2",
            name: "rinvay1-2-1",
          },
        ],
      },
      {
        id: "1-1",
        parentId: "1",
        name: "rinvay1-1",
      },
    ],
  },
  {
    id: "2",
    parentId: "0",
    name: "rinvay2",
    children: [
      {
        id: "2-1",
        parentId: "2",
        name: "rinvay2-1",
      },
      {
        id: "2-2",
        parentId: "2",
        name: "rinvay2-2",
      },
    ],
  },
];
```

```javascript
const list = [
  {
    id: "1",
    parentId: "0",
    name: "rinvay1",
  },
  {
    id: "2",
    parentId: "0",
    name: "rinvay2",
  },
  {
    id: "1-2",
    parentId: "1",
    name: "rinvay1-2",
  },
  {
    id: "1-2-1",
    parentId: "1-2",
    name: "rinvay1-2-1",
  },
  {
    id: "1-1",
    parentId: "1",
    name: "rinvay1-1",
  },
  {
    id: "2-1",
    parentId: "2",
    name: "rinvay2-1",
  },
  {
    id: "2-2",
    parentId: "2",
    name: "rinvay2-2",
  },
];
```

#### 生成实例

```javascript
const treeTools = treetools.create({ pid: 'parentId' })
```

##### 数组转换成树结构

```javascript
const tree = treeTools.format(list)
```

##### 树结构平铺展开成数组
```javascript
const listDFS = treeTools.flat(treeData, { type: 'DFS' })
const listBFS = treeTools.flat(treeData, { type: 'BFS' })
```

##### 查询符合条件的树节点

```javascript
const nodes = treeTools.find(treeData, (node) => node.id === '2-2')
```

##### 往树中插入节点，支持往前插入和往后插入

```javascript
const newTree = treeTools.insert(
  treeData,
  {
    id: "1-2-1",
    parentId: "1-2",
    name: "rinvay1-2-1",
  },
  {
    id: "1-2-2",
    name: "rinvay1-2-2",
  },
  { order: "Front" }
);
```

##### 移除树中符合条件的节点节点

```javascript
const newTree = treeTools.remove(treeData, node => node.id === '1-2-1'))
```
