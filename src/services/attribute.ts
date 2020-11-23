import { RequestData, UnitType } from '@/typings';
import request from 'umi-request';

/**
 * 属性类型
 */
export type TypeEnum =
  /** 整数 */
  | 'INT'
  /** 字符串 */
  | 'STRING'
  /** 枚举 */
  | 'ENUM'
  /** 小数 */
  | 'FLOAT'
  /** 日期类型 */
  | 'DATE'
  /** 时间日期 */
  | 'DATE_TIME'
  /** 时间 */
  | 'TIME'
  /** 时间戳 */
  | 'TIMESTAMP_TYPE';

/**
 * 输入类型
 */
export type InputTypeEnum =
  /** 文本输入 */
  | 'TEXT'
  /** 多选 */
  | 'MULTI_SELECT'
  /** 单选 */
  | 'SINGLE_SELECT'
  /** 时间选择器 */
  | 'DATE_PICKER';

/**
 * 类目属性状态
 */
export type AttributeStatus =
  /** 正常 */
  | 'NORMAL'
  /** 已删除 */
  | 'DELETED';

/**
 * 销售属性样式
 */
export type SalePropStyleTypeEnum =
  /** 正常 */
  | 'NORMAL'
  /** 色卡 */
  | 'COLOR';

/**
 * 属性值
 */
export interface AttributeOptionType {
  /** 属性值id */
  optionId: number;
  /** 唯一标识 */
  optionValue: string;
  /** 默认显示 */
  displayValue: string;
  /** 属性id */
  attributeId: number;
  /** 排序 */
  sortWeight: number;
}

/**
 * 类目属性
 */
export interface AttributeType {
  /** 属性id */
  attributeId: number;
  /** 标签名称 */
  displayName: string;
  /** 叶子类目id */
  categoryId: number;
  /** 属性名称 */
  attributeName: string;
  /** 属性类型 */
  attributeType: TypeEnum;
  /** 输入类型 */
  inputType: InputTypeEnum;
  /** 配置值 */
  options?: AttributeOptionType[];
  /** 单位 */
  units?: UnitType[];
  /** 状态 */
  status: AttributeStatus;
  /** 是否销售属性 */
  isSaleProp?: boolean;
  /** 销售属性样式 */
  salePropStyle?: SalePropStyleTypeEnum;
  /** 是否可见 */
  isVisible: boolean;
  /** 是否可搜索 */
  isInSearch: boolean;
  /** 是否必填 */
  isMandatory: boolean;
  /** 扩展字段 */
  features?: string;
  /** 排序权重 */
  sortWeight?: number;
  /** 创建时间 */
  createdDate?: number;
  /** 修改时间 */
  modifiedDate?: number;
}

export interface AttributeEdit {
  /** 属性id */
  attributeId?: number;
  /** 叶子类目id */
  categoryId: number;
  /** 标签名称 */
  displayName: string;
  /** 属性名称 */
  attributeName: string;
  /** 属性类型 */
  attributeType: TypeEnum;
  /** 输入类型 */
  inputType: InputTypeEnum;
  /** 是否销售属性 */
  isSaleProp: boolean;
  /** 销售属性样式 */
  salePropStyle?: SalePropStyleTypeEnum;
  /** 是否可见 */
  isVisible: boolean;
  /** 是否可搜索 */
  isInSearch: boolean;
  /** 是否必填 */
  isMandatory: boolean;
  /** 排序权重 */
  sortWeight: number;
}

export type ItemAttributesType = Record<number, ItemAttributeValueType>;

/** 商品属性 */
export interface ItemAttributeValueType {
  /** 属性值id */
  value?: number;
  /** 文本值 */
  textValue?: string;
  /** 多属性值id */
  values?: number[];
  /** 多属性文本值 */
  textValues?: string;
}

export interface AttributeQueryParams {
  /** 属性名称 */
  attributeName: string;
  /** 状态 */
  status: AttributeStatus;
}

export async function queryCategoryAttributes(categoryId: number) {
  return request<RequestData<AttributeType[]>>('/api/category/attributes', {
    method: 'GET',
    params: {
      categoryId,
    },
  });
}
