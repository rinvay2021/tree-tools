import { TraversalType, InsertOrder, DEFALUT_CONFIG } from './type';
class TreeTools {
  constructor(config) {
    this.config = Object.assign(Object.assign({}, DEFALUT_CONFIG), config);
  }
  static create(config) {
    return new this(config);
  }
  traversalBFS(tree, callback) {
    const queue = [...tree];
    while (queue.length) {
      let node = queue.shift();
      callback(node);
      const child = node[this.config.children];
      if (child) {
        for (let i = 0; i < child.length; i++) {
          const element = child[i];
          queue.push(element);
        }
      }
    }
  }
  traversalDFS(tree, callback) {
    const queue = [...tree];
    while (queue.length) {
      let node = queue.shift();
      callback(node);
      const child = node[this.config.children];
      if (child) {
        for (let i = 0; i < child.length; i++) {
          const element = child[i];
          queue.unshift(element);
        }
      }
    }
  }
  format(list) {
    const hashmap = new Map();
    const tree = [];
    list.forEach(element => {
      hashmap.set(element[this.config.id], element);
    });
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element[this.config.pid] && hashmap.has(element[this.config.pid])) {
        !hashmap.get(element[this.config.pid]).children && (hashmap.get(element[this.config.pid]).children = []);
        hashmap.get(element[this.config.pid]).children.push(element);
      } else {
        tree.push(element);
      }
    }
    return tree;
  }
  flat(tree, config) {
    const list = [];
    const fn = node => list.push(node);
    (config === null || config === void 0 ? void 0 : config.type) === TraversalType.DFS ? this.traversalDFS(tree, fn) : this.traversalBFS(tree, fn);
    return list;
  }
  find(tree, callback) {
    const list = [];
    const fn = node => callback(node) && list.push(node);
    this.traversalDFS(tree, fn);
    return list;
  }
  insert(tree, targetNode, insertNode, config) {
    const list = this.flat(tree);
    const filterList = list.map(node => Object.assign(Object.assign({}, node), {
      [this.config.children]: []
    }));
    const index = filterList.findIndex(node => node[this.config.id] === targetNode[this.config.id]);
    ~index && filterList.splice((config === null || config === void 0 ? void 0 : config.order) === InsertOrder.Front ? index : index + 1, 0, Object.assign(Object.assign({}, insertNode), {
      [this.config.pid]: targetNode[this.config.pid]
    }));
    return this.format(filterList);
  }
  remove(tree, callback) {
    const fn = node => !callback(node);
    const list = this.flat(tree);
    const filterList = list.map(node => Object.assign(Object.assign({}, node), {
      [this.config.children]: []
    })).filter(fn);
    return this.format(filterList);
  }
  map(tree, callback) {
    this.traversalDFS(tree, callback);
    return tree;
  }
}
export default TreeTools;