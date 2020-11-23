import React from 'react';
import { Space, Typography } from 'antd';
import UnitInput from '../UnitInput';
import styles from './index.less';

export interface DimensionInputProps {}

const { Text } = Typography;

const DimensionInput: React.FC<DimensionInputProps> = () => {
  return (
    <>
      <Space className={styles.dimensionInput}>
        <UnitInput
          placeholder="长"
          className={styles.dimensionInput}
          suffix={<Text type="secondary">cm</Text>}
        />
        <UnitInput
          placeholder="宽"
          className={styles.dimensionInput}
          suffix={<Text type="secondary">cm</Text>}
        />
        <UnitInput
          placeholder="高"
          className={styles.dimensionInput}
          suffix={<Text type="secondary">cm</Text>}
        />
      </Space>
    </>
  );
};

export default DimensionInput;
