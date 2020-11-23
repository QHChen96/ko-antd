import { Money, UnitType, Weight } from '@/typings';
import { ItemAttributesType } from './attribute';

/** 商品状态 */
export enum ItemStatus {
  NORMAL,
  UN_LIST,
}

/** 变体状态 */
export type VariationStatus = 'NORMAL' | 'DELETED';

/**
 * 体积
 */
export interface DimensionType {
  packageHeight: number;
  packageWidth: number;
  packageLength: number;
  unit: UnitType;
}

/** 批发属性 */
export interface WholesaleType {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 价格 */
  unitPrice: Money;
}

/** 变体 */
export interface VariationType {
  key?: string;
  /** 变体id */
  variationId: number;
  /** 商品id */
  itemId?: number;
  /** 变体名称 */
  variationName?: string;
  /** 锁定库存 */
  reservedStock?: number;
  /** 原始价 */
  originalPrice?: number;
  /** 卖方sku */
  sellerSku: string;
  /** 店铺sku */
  shopSku: string;
  /** 销售库存 */
  saleStock?: number;
  /** 状态 */
  status: VariationStatus;
  /** 货号 */
  itemCode?: string;
  /** 变体索引 */
  tierIndies: number[];
  /** 定位符 */
  variationKey?: string;
  /** 创建时间 */
  createdDate?: number;
  /** 修改时间 */
  modifiedDate?: number;
}

/**
 * 层级值
 */
export interface TierVariationOptionType {
  key?: string;
  optionId?: number;
  /** 层级值 */
  optionValue?: string;
  /** 图片 */
  imageUrl?: string;
  /** 用于表单校验 */
  validateStatus?: string;
}

/**
 * 层级变体
 */
export interface TierVariationType {
  key?: string;
  tierVariationId?: number;
  /** 层级名称 */
  tierName: string;
  /** 层级值 */
  options: TierVariationOptionType[];
  /** 用于表单校验 */
  validateStatus?: string;
}

/**
 * 运费模板
 */
export interface FreightTemplateType {
  /** 模板id */
  templateId: number;
  /** 模板名称 */
  templateName: string;
  /** 是否默认 */
  isDefault: boolean;
}

/**
 * 图片对象
 */
export interface ImageType {
  url: string;
}

export enum LogisticFeeType {}

/**
 * 重量限制
 */
export interface WeightLimitsType {
  /** 最大重量 */
  itemMaxWeight: number;
  /** 最小重量 */
  itemMinWeight: number;
}

/**
 * 物流
 */
export interface LogisticType {
  /** 物流id */
  logisticId: number;
  /** 物流名称 */
  logisticName: string;
  /** 是否支出货到付款 */
  hasCode: boolean;
  /** 费用类型 */
  feeType: LogisticFeeType;
  /** 开关 */
  enabled: boolean;
  /** 物流费 */
  shippingFee: Money;
  /** 是否免费 */
  isFree: boolean;
  /** 重量限制 */
  weightLimits: WeightLimitsType;
  /** 体积限制 */
  itemMaxDimension: DimensionType;
}

/**
 * 商品编辑
 */
export interface ItemEditType {
  /** 商品id */
  itemId?: number;
  /** 商品名称 */
  itemName?: string;
  /** 类目id */
  categoryId?: number;
  /** 品牌id */
  brandId?: number;
  /** 类目名称 */
  categoryName?: string;
  /** 尺码表id */
  sizeChartId?: number;
  /** 原始价 */
  originalPrice?: number;
  /** 条形码 */
  barcode?: string;
  /** 详情 */
  description?: string;
  /** 体积 */
  dimension: DimensionType;
  /** 重量 */
  weight: Weight;
  /** 卖方sku */
  sellerSku: string;
  /** 店铺sku */
  shopSku: string;
  /** 商品属性 */
  attributes: ItemAttributesType;
  /** 批发属性 */
  wholesales: WholesaleType[];
  /** 变体 */
  variations: VariationType[];
  /** 层级变体 */
  tierVariations: TierVariationType[];
  /** 货号 */
  itemCode: string;
  /** 销售库存 */
  saleStock: number;
  /** 图片 */
  images: ImageType[];
  /** 是否有变体 */
  hasVariation: boolean;
  /** 发货时间 */
  dayToShip: number;
  /** 运费 */
  logistics: LogisticType[];
  /** 成本价 */
  costPrice: number;
  /** 商品卖点 */
  marketingCopywriting?: string;
  /** 是否售后服务 */
  hasAfterSale: boolean;
  /** 是否显示库存 */
  isShowStock: boolean;
  /** 使用说明 */
  instructions?: string;
  /** 是否预售 */
  isPreOrder: boolean;
  /** 关键字 */
  keyword?: string;
}

/**
 * 商品
 */
export interface ItemType extends ItemEditType {
  /** 卖家id */
  sellerId: number;
  /** 店铺id */
  shopId: number;
  /** 状态 */
  status: ItemStatus;
  /** 锁定库存 */
  reservedStock?: number;
  /** 创建时间 */
  createdDate?: number;
  /** 修改时间 */
  modifiedDate?: number;
}
