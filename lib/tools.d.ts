import { TreeAttribute, Config } from './type';
declare class TreeTools {
    private config;
    constructor(config: TreeAttribute);
    static create(config?: TreeAttribute): TreeTools;
    private traversalBFS;
    private traversalDFS;
    format(list: any[]): any[];
    flat(tree: any[], config?: Config): any[];
    find(tree: any[], callback: (node: any) => boolean): any[];
    insert(tree: any[], targetNode: any, insertNode: any, config?: Config): any[];
    remove(tree: any[], callback: (node: any) => boolean): any[];
    map(tree: any[], callback: (node: any) => void): any[];
}
export default TreeTools;
