import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Typography } from 'antd';
import classnames from 'classnames';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { CategoryType } from '@/services/item-category';

// @ts-ignore
import style from './style.less';

const { Text } = Typography;

export interface CategorySelectorProp {
  className?: string;
  categoryId?: number;
  defaultPaths?: CategoryType[];
  onChange?: (categoryId: number, paths: CategoryType[]) => void;
}

// const history: string[] = ['随手杯', '马克杯'];

export interface ItemSelectorProps {
  cateList: CategoryType[];
  current: CategoryType | null;
  onSelect?: (current: CategoryType) => void;
}

const ItemSelector = ({ cateList = [], current, onSelect }: ItemSelectorProps) => {
  const handleClick = (event: React.MouseEvent, _current: CategoryType) => {
    event.preventDefault();
    if (onSelect) {
      onSelect(_current);
    }
  };
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (current && current.categoryId) {
      const scrollHeight = selectedRef.current?.scrollHeight || 0;
      const clientHeight = selectedRef.current?.clientHeight || 0;

      if (scrollHeight > clientHeight + 20) {
        const index = cateList.findIndex((item) => item.categoryId === current.categoryId);
        if (index >= 0) {
          selectedRef.current?.scrollTo({
            top: ((scrollHeight / cateList.length) * (index + 1)) / 1.5,
          });
        }
      }
    }
  }, []);

  return (
    (cateList.length && (
      <>
        <div className={style.selectHeader}>
          <Input
            prefix={
              <Text type="secondary">
                <SearchOutlined />
              </Text>
            }
            className={classnames(style.searchInput)}
          />
        </div>
        <div className={style.selectBody} ref={selectedRef}>
          <ul>
            {cateList.map((category) => (
              <li
                className={classnames(
                  style.listItem,
                  current && current.categoryId === category.categoryId && style.selected,
                )}
                key={category.categoryId}
                onClick={(event) => handleClick(event, category)}
              >
                <Text className={style.selectText} type="secondary">
                  {category.displayName}
                </Text>
                {category.hasChildren && (
                  <Text className={style.selectIcon} type="secondary">
                    <RightOutlined />
                  </Text>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
    )) ||
    null
  );
};

const CategorySelector: React.FC<CategorySelectorProp> = ({
  categoryId,
  defaultPaths = [],
  onChange,
}) => {
  const { getCateData, getPathsWithId, getChild } = useModel('useCategoryModel');

  const [current, setCurrent] = useState(categoryId);
  const [paths, setPaths] = useState<CategoryType[]>(defaultPaths);
  const [cateData, setCateData] = useState<CategoryType[][]>([]);

  useEffect(() => {
    let mPaths = defaultPaths;
    if (!mPaths.length && current) {
      mPaths = getPathsWithId(current);
    }
    const mData = getCateData(mPaths);
    setPaths(mPaths);
    setCateData(mData);
  }, []);

  const handleSelect = (selected: CategoryType, index: number) => {
    if (selected.categoryId === current) {
      return;
    }
    const newPaths = [...paths.slice(0, index), selected];
    setCurrent(selected?.categoryId);
    setPaths(newPaths);
    if (selected.hasChildren) {
      const newCateData = [...cateData.slice(0, newPaths.length), getChild(selected.categoryId)];
      setCateData(newCateData);
    }
    if (!selected.hasChildren && onChange) {
      onChange(selected.categoryId, newPaths);
    }
  };

  return (
    <>
      <div className={style.categorySelector}>
        <Input
          prefix={
            <Text type="secondary">
              <SearchOutlined />
            </Text>
          }
          className={classnames(style.globalSearch, style.searchInput)}
        />
        {/* <Space className={style.selectHistory}>
          <Text>发布历史:</Text>
          {history &&
            history.map((h, i) => (
              <Fragment key={h}>
                <a>
                  <Text>{h}</Text>
                </a>
                {i < history.length - 1 && <Divider type="vertical" />}
              </Fragment>
            ))}
        </Space> */}
        <Row className={style.categoryWrap}>
          <Col span={6}>
            <div className={style.categoryList}>
              {cateData.length > 0 && (
                <ItemSelector
                  cateList={cateData[0]}
                  current={paths[0]}
                  onSelect={(selected) => handleSelect(selected, 0)}
                />
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className={style.categoryList}>
              {cateData.length > 1 && (
                <ItemSelector
                  cateList={cateData[1]}
                  current={paths[1]}
                  onSelect={(selected) => handleSelect(selected, 1)}
                />
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className={style.categoryList}>
              {cateData.length > 2 && (
                <ItemSelector
                  cateList={cateData[2]}
                  current={paths[2]}
                  onSelect={(selected) => handleSelect(selected, 2)}
                />
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className={style.categoryList}>{null}</div>
          </Col>
        </Row>
      </div>
      <div className={style.selectResult}>
        <div className={style.selectResultLabel}>已选类目:</div>
        <div className={style.selectResultContent}>
          <Text className={style.selectItem}>
            {paths.map((path) => path.displayName).join(' > ')}
          </Text>
        </div>
      </div>
    </>
  );
};

export default CategorySelector;
