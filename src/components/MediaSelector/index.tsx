import React from 'react';

import classnames from 'classnames';
import { Button, Input, Tree, Divider, Pagination, Image } from 'antd';
import { useRequest } from 'ahooks';
import { RequestData } from '@/typings';
import { MediaFile, ImageFile, queryPhotos } from '@/services/media';

// @ts-ignore
import styles from './style.less';

export interface MediaSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  multiple?: boolean;
  onSelect?: (mediaFile: MediaFile) => void;
}

const { Search } = Input;

const treeData = [
  {
    key: '1',
    title: '未分类',
  },
  {
    key: '2',
    title: '商品',
  },
  {
    key: '3',
    title: '未分类',
  },
];

const MediaSelector = (props: MediaSelectorProps) => {
  const { className, onSelect } = props;
  const { data, loading, pagination, reload } = useRequest<RequestData<MediaFile>>(
    ({ current, pageSize }) => queryPhotos({ current, pageSize }),
    {
      paginated: true,
      defaultPageSize: 15,
    },
  );

  const handleClickImage = (imageFile: MediaFile) => {
    if (onSelect) {
      onSelect(imageFile);
    }
  };

  return (
    <div className={classnames(className, styles.photoSelector)}>
      <div className={styles.photoSelectorLeft}>
        <Search />
        <div className={styles.photoSelectorTree}>
          <Tree showLine blockNode treeData={treeData} />
        </div>
      </div>
      <div className={styles.divider}>
        <Divider type="vertical" style={{ height: '100%' }} />
      </div>
      <div className={styles.photoSelectorRight}>
        <div className={styles.photoSelectorToolbar}>
          <Button type="primary">上传图片</Button>
        </div>
        <div className={styles.photoSelectorContainer}>
          {data?.list.map((item) => {
            return (
              <div className={styles.imageItem} key={item.fileId}>
                <div className={styles.imageBox} onClick={() => handleClickImage(item as any)}>
                  <Image width={100} height={100} src={item.filePath} />
                  <div className={styles.imageMask}>
                    <span className={styles.imageSize}>{`${item.pixelX}x${item.pixelY}`}</span>
                  </div>
                </div>
                <div className={styles.imageTitle}>图片.jpg</div>
              </div>
            );
          })}
        </div>
        <div className={styles.photoSelectorFooter}>
          <Pagination {...(pagination as any)} pageSize={15} showSizeChanger={false} size="small" />
        </div>
      </div>
    </div>
  );
};

export default MediaSelector;
