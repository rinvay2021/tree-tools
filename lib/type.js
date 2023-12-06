export var TraversalType;
(function (TraversalType) {
  TraversalType["BFS"] = "BFS";
  TraversalType["DFS"] = "DFS";
})(TraversalType || (TraversalType = {}));
export var InsertOrder;
(function (InsertOrder) {
  InsertOrder["Front"] = "Front";
  InsertOrder["Back"] = "Back";
})(InsertOrder || (InsertOrder = {}));
export var QuantityType;
(function (QuantityType) {
  QuantityType["Single"] = "Single";
  QuantityType["Multiple"] = "Multiple";
})(QuantityType || (QuantityType = {}));
export const DEFALUT_CONFIG = {
  id: 'id',
  pid: 'pid',
  children: 'children'
};