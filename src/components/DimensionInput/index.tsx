import React, { useState } from 'react';
import { Space, Typography } from 'antd';
import { DimensionType } from '@/services/item';
import { UnitType } from '@/typings';
import UnitInput from '../UnitInput';
import styles from './index.less';

export interface DimensionInputProps {
  unit?: UnitType;
  value?: Partial<DimensionType>;
  onChange?: (value: Partial<DimensionType>) => void;
}

const { Text } = Typography;

const DimensionInput: React.FC<DimensionInputProps> = ({ unit = 'cm', value, onChange }) => {
  const [dimension, setDimension] = useState<Partial<DimensionType>>(value || { unit });

  const handleChangeHeight = (height?: number) => {
    const newDimension = { ...dimension, height };
    setDimension(newDimension);
    onChange(newDimension);
  };

  const handleChangeWidth = (width?: number) => {
    onChange({ ...dimension, width });
  };

  const handleChangeLength = (length?: number) => {
    onChange({ ...dimension, length });
  };

  return (
    <>
      <Space className={styles.dimensionInput}>
        <UnitInput
          placeholder="长"
          className={styles.dimensionInput}
          suffix={<Text type="secondary">{unit}</Text>}
          onChange={handleChangeLength}
        />
        <UnitInput
          placeholder="宽"
          className={styles.dimensionInput}
          suffix={<Text type="secondary">{unit}</Text>}
          onChange={handleChangeWidth}
        />
        <UnitInput
          placeholder="高"
          className={styles.dimensionInput}
          suffix={<Text type="secondary">{unit}</Text>}
          onChange={handleChangeHeight}
        />
      </Space>
    </>
  );
};

export default DimensionInput;
