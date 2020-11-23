import React, { useState } from 'react';

import UnitInput from '@/components/UnitInput';
import { Input, Button } from 'antd';

// @ts-ignore
import styles from './style.less';

export interface SkuApplyInputProps {
  onApply: (skuApply: SkuApplyType) => void;
}

export interface SkuApplyType {
  amount?: number;
  stock?: number;
  itemCode?: string;
}

const SkuApplyInput: React.FC<SkuApplyInputProps> = ({ onApply }) => {
  const [skuApply, setSkuApply] = useState<SkuApplyType>({});

  const handleChange = (fieldName: string, newValue: any) => {
    setSkuApply({ ...skuApply, [fieldName]: newValue });
  };

  const handleApply = () => {
    onApply(skuApply);
  };

  return (
    <div className={styles.skuApplyInput}>
      <span className={styles.skuApplyInputItem}>
        <UnitInput
          suffix="价格"
          value={skuApply.amount}
          onChange={(val) => handleChange('amount', val)}
        />
      </span>
      <span className={styles.skuApplyInputItem}>
        <UnitInput
          onChange={(val) => handleChange('stock', val)}
          suffix="库存"
          value={skuApply.stock}
        />
      </span>
      <span className={styles.skuApplyInputItem}>
        <Input
          suffix="商品编号"
          value={skuApply.itemCode}
          onChange={(e) => handleChange('itemCode', e.target.value)}
        />
      </span>
      <span className={styles.skuApplyAction}>
        <Button type="primary" className={styles.skuApplyButton} onClick={handleApply}>
          应用全部
        </Button>
      </span>
    </div>
  );
};

export default SkuApplyInput;
