import React, { ReactNode } from 'react';
import request from 'umi-request';
import { RequestData } from '@/typings';

export type MediaFileType = 'img' | 'folder' | 'video';
export type MediaFileStatus = 'normal' | 'deleted';
export type ViewType = 'table' | 'grid';
export declare type ParamsType = {
  [key: string]: React.ReactText | React.ReactText[];
};
export type UploadStatus = 'SUCCESS' | 'ERROR' | 'NONE';

/**
 * 图片文件
 */
export interface ImageFile {
  imageId?: number | string;
  imageUrl?: string;
}

export interface MediaFile {
  /**
   * 文件id
   */
  fileId: number | string;

  /**
   * 文件名称
   */
  fileName: string;

  /**
   * 宽度
   */
  pixelX?: number;

  /**
   * 高度
   */
  pixelY?: number;

  /**
   * 文件大小
   */
  fileSize?: number;

  /**
   * 文件类型
   */
  fileType: MediaFileType;

  /**
   * 状态
   */
  status: MediaFileStatus;

  /**
   * 创建时间
   */
  createAt?: number | string;

  /**
   * 修改时间
   */
  modifiedAt?: number | string;

  /**
   * 文件路径
   */
  filePath?: string;

  /**
   * 文件夹id, 根节点为0
   */
  folderId?: number;
}

/**
 * 上传状态
 *
 * @export
 * @class UploadResult
 */
export interface UploadResult {
  /** 总数 */
  total: number;

  /** 已上传数量 */
  uploadedCount: number;

  /** 上传成功的数量 */
  successCount: number;

  /** 上传失败的数量 */
  errorCount: number;
}

export interface MediaFileRequestParams {
  fileName?: string;
  folderId?: number;
  current?: number;
  pageSize?: number;
}

export interface ActionType {
  reload: () => void;
  reloadAndReset?: () => void;
  reset?: () => void;
  clearSelected?: () => void;
}

export interface ItemPagination {
  current?: number;
  pageSize?: number;
  total?: number;
  showQuickJumper?: boolean | { goButton: ReactNode };
  onChange?: (page: number, pageSize?: number) => void;
}

export async function queryPhotos(params?: MediaFileRequestParams): Promise<any> {
  return request<RequestData<MediaFile[]>>('/api/photo', {
    params,
  });
}
