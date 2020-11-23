import { useState, useEffect } from 'react';

import { CategoryType, getAll } from '@/services/item-category';
import { groupBy, forEach } from 'lodash';

export interface CategoryModelType {
  list: CategoryType[];
  getPathsWithId: (id?: number) => CategoryType[];
  getPathsWithIds: (ids: number[]) => CategoryType[];
  getCateData: (paths: CategoryType[]) => CategoryType[][];
  getChild: (id: number) => CategoryType[];
  destroy: () => void;
  fetch: () => void;
}

export type CategoryWithPath = Omit<CategoryType, 'parentPath'> & {
  parentPath: number[];
};

type WithPath = { categoryId: number; parentPath: number[] };
type WithCache = { [key: string]: CategoryType };
type WithGroup = { [key: string]: CategoryType[] };

const handledData = (categoryList: CategoryType[]): [WithGroup, WithCache] => {
  const group: WithGroup = groupBy(categoryList, 'parentCategoryId');
  const cache: WithCache = {};
  const mark = (parent: WithPath) => {
    const children = group[parent.categoryId];
    if (!children) {
      return;
    }
    const newChildren: CategoryType[] = [];
    forEach(children, (value) => {
      const { parentPath = [] } = parent;
      const item = { ...value, parentPath: [...parentPath, value.categoryId!] };
      mark(item);
      cache[item.categoryId] = item;
      newChildren.push(cache[item.categoryId]);
    });
    group[parent.categoryId] = newChildren;
  };
  mark({ categoryId: 0, parentPath: [] });
  return [group, cache];
};

export default function useItemModel(): CategoryModelType {
  const [list, setList] = useState<CategoryType[]>([]);
  const [group, setGroup] = useState<WithGroup>({});
  const [cache, setCache] = useState<WithCache>({});

  const fetch = async () => {
    setList(await getAll());
  };

  const getCateData = (paths: CategoryType[] = []): CategoryType[][] => {
    const main = group[0];
    return [main, ...paths.map((path) => group[path.categoryId])];
  };

  const getChild = (id: number): CategoryType[] => {
    return group[id];
  };

  const getPathsWithId = (id?: number) => {
    if (!id) {
      return [];
    }
    const last = cache[id];
    const { parentPath = [] } = last;
    return [
      ...parentPath.map((itemId) => {
        if (itemId === id) {
          return last;
        }
        return cache[itemId];
      }),
    ];
  };

  const getPathsWithIds = (ids: number[] = []) => {
    return [
      ...ids.map((id) => {
        return cache[id];
      }),
    ];
  };

  const handle = () => {
    const [mGroup, mCache] = handledData(list);
    setGroup(mGroup);
    setCache(mCache);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    handle();
  }, [list]);

  return {
    list,
    getCateData,
    getPathsWithIds,
    getPathsWithId,
    getChild,
    fetch,
    destroy: () => setList([]),
  };
}
