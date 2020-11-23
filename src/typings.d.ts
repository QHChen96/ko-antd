declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
}

declare let ga: Function;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

/**
 * 货币码
 */
export type CurrencyCodeType = 'RMB' | 'USD';

/**
 * 金额统一类型
 */
export interface Money {
  amount: number | null;
  currencyCode?: CurrencyCodeType;
}

/**
 * 重量
 */
export interface Weight {
  /** 重量 */
  value: number;
  /** 单位 */
  unit: UnitType;
}

/**
 * 单位
 */
export type UnitType = 'cm' | 'kg';

export interface Dimension {
  packageLength: number;
  packageWidth: number;
  packageHeight: number;
}

export interface Wholesale {
  min?: number;
  price?: number;
  max?: number;
}

export interface ProductSpec {
  id?: number;
  key?: string | number;
  specName?: string;
  priority: number;
  specValues: string[];
  picUrls?: string[];
}

export interface ProductSku {
  id: number;
  skuName: string;
  price?: number;
  priority: number;
  quantity?: number;
  barCode?: string;
  productCode?: string;
  specIndies: number[];
}

export interface RequestData<T> {
  data: T;
  success?: boolean;
  total?: number;
  [key: string]: any;
}
