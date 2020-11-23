import { groupBy, forEach } from 'lodash';

export type Tree<T> = T & {
  [key: string]: any;
};

export interface Config<T> {
  idKey: string;
  parentIdKey: string;
  dataKey: string;
  childKey: string;
  rootId: string | number | null;
  beforeFn?: (item: Tree<T>, parent: Tree<T>) => Tree<T>;
  afterFn?: (item: Tree<T>, parent: Tree<T>) => Tree<T>;
}

const defaultConfig: Config<any> = {
  parentIdKey: 'parentId',
  idKey: 'id',
  childKey: 'children',
  dataKey: 'data',
  rootId: 0,
};

export function arrayToTree<T>(items: T[], _config: Partial<Config<T>> = {}): Tree<T>[] {
  const config = { ...defaultConfig, ..._config };
  const group = groupBy(items, config.parentIdKey);
  const mark = (parent: any): Tree<T>[] => {
    const tree: T[] = [];
    const rootChildren = group[parent[config.idKey]];
    if (!rootChildren) {
      return [];
    }
    forEach(rootChildren, (value: Tree<T>) => {
      let treeItem = { ...value, [config.dataKey]: value } as any;
      if (config.beforeFn && typeof config.beforeFn === 'function') {
        treeItem = config.beforeFn(treeItem, parent);
      }
      const childChild = mark(treeItem);
      if (childChild.length) {
        treeItem[config.childKey] = childChild;
      }
      if (config.afterFn && typeof config.afterFn === 'function') {
        treeItem = config.afterFn(treeItem, parent);
      }
      tree.push(treeItem);
    });
    return tree;
  };
  return mark({ [config.idKey]: config.rootId });
}
