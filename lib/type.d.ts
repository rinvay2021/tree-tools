export interface TreeAttribute {
    id?: string;
    pid?: string;
    children?: string;
}
export type Config = {
    type?: 'BFS' | 'DFS';
    order?: 'Front' | 'Back';
    result?: 'Single' | 'Multiple';
};
export declare enum TraversalType {
    'BFS' = "BFS",
    'DFS' = "DFS"
}
export declare enum InsertOrder {
    'Front' = "Front",
    'Back' = "Back"
}
export declare enum QuantityType {
    'Single' = "Single",
    'Multiple' = "Multiple"
}
export declare const DEFALUT_CONFIG: TreeAttribute;
