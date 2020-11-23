import React, { CSSProperties } from 'react';

import { CloseOutlined, PlusCircleOutlined, DragOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Button, Form } from 'antd';
import { TierVariationType, TierVariationOptionType } from '@/services/item';
import { uniqueId } from 'lodash';

// @ts-ignore
import styles from './style.less';

const { Item: FormItem } = Form;

export interface SpecEditorProp {
  style?: CSSProperties;
  isLast?: boolean;
  value?: Partial<TierVariationType>[];
  maxVariationCount?: number;
  onChange?: (value: Partial<TierVariationType>[]) => void;
}

interface SpecEditorItemProps {
  tierVariation: Partial<TierVariationType>;
  tierIndex: number;
  maxOptionCount?: number;
  onChange: (index: number, value?: Partial<TierVariationType>) => void;
}

const getOptionKey = (
  tierVariation: Partial<TierVariationType>,
  option: TierVariationOptionType,
) => {
  return `tierVariation-${tierVariation.tierVariationId || tierVariation.key}-${
    option.optionId || option.key
  }`;
};

const getTierVariationKey = (tierVariation: Partial<TierVariationType>) => {
  return `tierVariation-${tierVariation.tierVariationId || tierVariation.key}`;
};

const SpecEditorItem = ({
  tierIndex,
  tierVariation,
  maxOptionCount = 30,
  onChange,
}: SpecEditorItemProps) => {
  const { options = [] } = tierVariation;

  const handleAddOption = (index: number) => {
    if (options.length >= maxOptionCount) {
      return;
    }
    const key = `${tierVariation.tierVariationId || tierVariation.key}-${uniqueId('option')}`;
    const newTierVariation = { ...tierVariation, options: [...options, { key }] };
    onChange(index, newTierVariation);
  };

  const handleDelOption = (index: number, optionIndex: number) => {
    const newOption = [...options];
    newOption.splice(optionIndex, 1);
    const newTierVariation = { ...tierVariation, options: newOption };
    onChange(index, newTierVariation);
  };

  const handleDelTier = (index: number) => {
    onChange(index);
  };

  return (
    <div className={styles.productSpecItem}>
      <CloseOutlined
        className={styles.productSpecItemRemove}
        onClick={() => handleDelTier(tierIndex)}
      />
      <div className={styles.specRow}>
        <div className={styles.specTitle}>名称</div>
        <div className={styles.specNameWrap}>
          <FormItem required name={['tierVariations', `${tierIndex}`, 'tierName']}>
            <Input />
          </FormItem>
        </div>
        <div className={styles.specValueOption} />
      </div>
      <div className={styles.specRow}>
        <div className={styles.specTitle}>属性值</div>
        <div className={styles.specNameWrap}>
          <FormItem name={['tierVariations', `${tierIndex}`, 'options', '0', 'optionValue']}>
            <Input />
          </FormItem>
        </div>
        <div className={styles.specValueOption} />
      </div>
      {options.slice(1).map((option, index) => {
        return (
          <div className={styles.specRow} key={getOptionKey(tierVariation, option)}>
            <div className={styles.specTitle} />
            <div className={styles.specNameWrap}>
              <FormItem
                name={['tierVariations', `${tierIndex}`, 'options', `${index + 1}`, 'optionValue']}
              >
                <Input />
              </FormItem>
            </div>
            <div className={styles.specValueOption}>
              <DragOutlined className={styles.specValueOptionBtn} />
              <DeleteOutlined
                className={styles.specValueOptionBtn}
                onClick={() => handleDelOption(tierIndex, index + 1)}
              />
            </div>
          </div>
        );
      })}
      {options.length < maxOptionCount && (
        <div className={styles.specRow}>
          <div className={styles.specTitle} />
          <div className={styles.specNameWrap}>
            <Button
              className={styles.addSpecButton}
              icon={<PlusCircleOutlined />}
              onClick={() => handleAddOption(tierIndex)}
            >
              添加选项({options.length}/{maxOptionCount})
            </Button>
          </div>
          <div className={styles.specValueOption} />
        </div>
      )}
    </div>
  );
};

const SpecEditor: React.FC<SpecEditorProp> = ({
  style,
  value = [],
  maxVariationCount = 3,
  onChange,
}) => {
  const handleChange = (index: number, tierVariation?: Partial<TierVariationType>) => {
    const newValue = [...value];
    if (tierVariation) {
      newValue.splice(index, 1, tierVariation);
    } else {
      newValue.splice(index, 1);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleAddSpec = () => {
    if (value.length >= maxVariationCount) {
      return;
    }
    const tempKey = uniqueId('spec');
    const newValue = [
      ...value,
      { key: tempKey, options: [{ key: `${tempKey}-${uniqueId('option')}` }] },
    ];
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.productSpec} style={style}>
      {value.map((tierVariation, index) => (
        <SpecEditorItem
          key={getTierVariationKey(tierVariation)}
          tierVariation={tierVariation}
          tierIndex={index}
          onChange={handleChange}
        />
      ))}
      {value.length < maxVariationCount && (
        <Button
          className={styles.addSpecButton}
          icon={<PlusCircleOutlined />}
          onClick={handleAddSpec}
        >
          添加规格
        </Button>
      )}
    </div>
  );
};

export default SpecEditor;
