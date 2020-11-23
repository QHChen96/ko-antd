import { RequestData } from '@/typings';
import { Tree } from '@/utils/arrayToTree';
import { request } from 'umi';

/**
 * 类目查询参数
 */
export interface CategoryQueryParams {
  categoryName?: string;
  parentCategoryId: number;
}

/**
 * 发货时间限制
 */
export interface DaysToShipLimitsType {
  /** 最大 */
  maxLimit: number;
  /** 最小 */
  minLimit: number;
}

/**
 * 尺码表单位
 */
export type SizeChartUnitType = 'cm' | 'inch';

/**
 * 尺码表单位
 */
export type SizeType = 'manufacturer' | 'ru';

/**
 * 类目编辑
 */
export interface CategoryEditType {
  /** 类目id */
  categoryId?: number;
  /** 类目名称 */
  categoryName: string;
  /** 类目图片 */
  categoryImage?: string;
  /** 父类目id */
  parentCategoryId?: number;
  /** 父类目名称 */
  parentCategoryName?: string;
  /** 排序 */
  sortWeight?: number;
}

/**
 * 类目
 */
export interface CategoryType extends Omit<CategoryEditType, 'categoryId'> {
  /** 类目id */
  categoryId: number;
  /** 是否有子类目 */
  hasChildren: boolean;
  /** 显示的名称 */
  displayName?: string;
  /** 路径 */
  parentPath?: number[];
  /** 深度 */
  depth: number;
  /** 作为扩展使用 */
  features?: string;
  /** 预售发货时间 */
  daysToShipLimits?: DaysToShipLimitsType;
  /** 创建时间 */
  createdDate: number;
  /** 修改时间 */
  modifiedDate: number;
}

export type CategoryTree = Tree<CategoryType> & {
  children?: CategoryTree[];
  parentPath?: number[];
  data?: CategoryType;
};

/**
 * 尺码模板
 */
export interface SizeChartType {
  /** 尺码表id */
  sizeChartId: number;
  /** 单位 */
  unit: SizeChartUnitType;
  /** 尺码 */
  size: string;
  /** 尺码类型 */
  sizeType: SizeType;
  /** 胸围 */
  bust: number;
  /** 长度 */
  length: number;
  /** 袖长 */
  sleeveLength: number;
}

export async function queryCategorySelect(parentCategoryId: number) {
  return request<RequestData<CategoryType[]>>('/api/category/parent', {
    method: 'GET',
    params: {
      parentCategoryId,
    },
  });
}

export async function queryCategoryList(params: CategoryQueryParams) {
  return request<RequestData<CategoryType[]>>('/api/category', {
    method: 'GET',
    params,
  });
}

export async function postCategory(data: CategoryEditType) {
  return request<RequestData<CategoryType>>('/api/category', {
    method: 'POST',
    data,
  });
}

export async function getAll() {
  const result = await request<RequestData<CategoryType>>('/api/category/getAll', {
    method: 'GET',
  });
  if (result && result.success) {
    return (result.data as any) as CategoryType[];
  }
  return [];
}
