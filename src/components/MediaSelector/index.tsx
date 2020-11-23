import React from 'react';

import classnames from 'classnames';
// @ts-ignore
import ProCard from '@ant-design/pro-card';
import { Button, Col, Input, Row, Space, Tree, Divider, Pagination, Image } from 'antd';
import styles from './style.less';

export interface MediaSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  multiple?: boolean;
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
  const { className, multiple } = props;
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
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
          <div className={styles.imageItem}>
            <div className={styles.imageBox}>
              <Image
                width={100}
                height={100}
                src="https://images-na.ssl-images-amazon.com/images/I/81wUWVAiWDL._AC_SL1500_.jpg"
              />
            </div>
            <div className={styles.imageTitle}>图片.jpg</div>
          </div>
        </div>
        <div className={styles.photoSelectorFooter}>
          <Pagination showSizeChanger={false} size="small" total={100} />
        </div>
      </div>
    </div>
  );
};

export default MediaSelector;
