export interface TreeAttribute {
    id?: string
    pid?: string
    children?: string
}

export type Config = {
    type?: 'BFS' | 'DFS'
    order?: 'Front' | 'Back'
    result?: 'Single' | 'Multiple'
}

export enum TraversalType {
    'BFS' = 'BFS',
    'DFS' = 'DFS',
}

export enum InsertOrder {
    'Front' = 'Front',
    'Back' = 'Back',
}

export enum QuantityType {
    'Single' = 'Single',
    'Multiple' = 'Multiple',
}

export const DEFALUT_CONFIG: TreeAttribute = {
    id: 'id',
    pid: 'pid',
    children: 'children',
}
