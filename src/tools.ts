import {
    TreeAttribute,
    Config,
    TraversalType,
    InsertOrder,
    DEFALUT_CONFIG,
} from './type'

class TreeTools {
    private config: TreeAttribute

    constructor(config: TreeAttribute) {
        this.config = {
            ...DEFALUT_CONFIG,
            ...config,
        }
    }

    static create(config?: TreeAttribute) {
        return new this(config)
    }

    private traversalBFS(tree: any[], callback: (node: any) => void) {
        const queue: any[] = [...tree]

        while (queue.length) {
            let node = queue.shift()
            callback(node)

            const child = node[this.config.children]

            if (child) {
                for (let i = 0; i < child.length; i++) {
                    const element = child[i]
                    queue.push(element)
                }
            }
        }
    }

    private traversalDFS(tree: any[], callback: (node: any) => void) {
        const queue = [...tree]

        while (queue.length) {
            let node = queue.shift()
            callback(node)

            const child = node[this.config.children]

            if (child) {
                for (let i = 0; i < child.length; i++) {
                    const element = child[i]
                    queue.unshift(element)
                }
            }
        }
    }

    public format(list: any[]) {
        const hashmap = new Map()
        const tree = []

        list.forEach((element) => {
            hashmap.set(element[this.config.id], element)
        })

        for (let i = 0; i < list.length; i++) {
            const element = list[i]

            if (
                element[this.config.pid] &&
                hashmap.has(element[this.config.pid])
            ) {
                !hashmap.get(element[this.config.pid]).children &&
                    (hashmap.get(element[this.config.pid]).children = [])

                hashmap.get(element[this.config.pid]).children.push(element)
            } else {
                tree.push(element)
            }
        }

        return tree
    }

    public flat(tree: any[], config?: Config) {
        const list = []

        const fn = (node) => list.push(node)

        config?.type === TraversalType.DFS
            ? this.traversalDFS(tree, fn)
            : this.traversalBFS(tree, fn)

        return list
    }

    public find(tree: any[], callback: (node: any) => boolean) {
        const list = []

        const fn = (node) => callback(node) && list.push(node)

        this.traversalDFS(tree, fn)

        return list
    }

    public insert(
        tree: any[],
        targetNode: any,
        insertNode: any,
        config?: Config,
    ) {
        const list = this.flat(tree)

        const filterList = list.map((node) => ({
            ...node,
            [this.config.children]: [],
        }))

        const index = filterList.findIndex(
            (node) => node[this.config.id] === targetNode[this.config.id],
        )

        ~index &&
            filterList.splice(
                config?.order === InsertOrder.Front ? index : index + 1,
                0,
                {
                    ...insertNode,
                    [this.config.pid]: targetNode[this.config.pid],
                },
            )

        return this.format(filterList)
    }

    public remove(tree: any[], callback: (node: any) => boolean) {
        const fn = (node) => !callback(node)

        const list = this.flat(tree)

        const filterList = list
            .map((node) => ({
                ...node,
                [this.config.children]: [],
            }))
            .filter(fn)

        return this.format(filterList)
    }

    public map(tree: any[], callback: (node: any) => void) {
        this.traversalDFS(tree, callback)
        return tree
    }
}

export default TreeTools
