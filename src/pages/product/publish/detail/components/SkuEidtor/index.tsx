import React, { useEffect, useState } from 'react';
import { Input, Typography } from 'antd';
import { TierVariationType, VariationType, TierVariationOptionType } from '@/services/item';
import FormItem from 'antd/lib/form/FormItem';
import UnitInput from '@/components/UnitInput';
import { keyBy, reduce, each, isEqual } from 'lodash';
import { usePrevious } from 'ahooks';
import SkuApplyInput, { SkuApplyType } from '../SkuApplyInput';

// @ts-ignore
import styles from './style.less';

export interface SkuEditorProps {
  value?: VariationType[];
  tierVariations: TierVariationType[];
  style?: React.CSSProperties;
  onChange?: (newValue: VariationType[]) => void;
}

const { Text } = Typography;

const getTierKey = (variation: VariationType, tierVariationOption: TierVariationOptionType) => {
  return `variation-${variation.variationId || variation.key}-tierIndex-${
    tierVariationOption.optionId || tierVariationOption.key
  }`;
};

const getTierVariationKey = (tierVariation: TierVariationType) => {
  return `tierVariation-${tierVariation.tierVariationId || tierVariation.key}`;
};

const SkuEditor: React.FC<SkuEditorProps> = ({
  style,
  tierVariations: propsTierVariations = [],
  value = [],
  onChange,
}) => {
  const [variations, setVariations] = useState(value);
  const [tierVariations, setTierVariations] = useState(filterVariations(propsTierVariations));
  const previous = usePrevious<TierVariationType[]>(propsTierVariations);

  function filterVariations(tierVariationsParam: TierVariationType[]) {
    return tierVariationsParam
      .map((tierVariation) => {
        return {
          ...tierVariation,
          options: [
            ...tierVariation.options.filter(
              (oItem) => oItem.optionValue && oItem.optionValue.length > 0,
            ),
          ],
        };
      })
      .filter((tierVariation) => tierVariation.options && tierVariation.options.length > 0);
  }

  useEffect(() => {
    if (previous) {
      const newTierVariations = filterVariations(propsTierVariations);
      if (!isEqual(filterVariations(previous), filterVariations(propsTierVariations))) {
        setTierVariations(newTierVariations);
        rebuild(newTierVariations);
      }
    }
  }, [propsTierVariations, previous]);

  const handleChange = (newValue: VariationType[]) => {
    setVariations(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  function rebuild(tierVariationsParam: TierVariationType[]) {
    if (!tierVariationsParam || !tierVariationsParam.length) {
      handleChange([]);
    }
    // 因为使用了antd form绑定的参数, 用value能保证数据的实时
    const group = keyBy(value, 'variationKey');
    const tierVariationOptions: TierVariationOptionType[][] = tierVariationsParam.map(
      (tierVariation) => tierVariation.options,
    );
    const getVariationKeyAndName = (option: TierVariationOptionType, vIndex: number) => {
      const currentTierVariation = tierVariationsParam[vIndex];
      const variationKey = `${currentTierVariation.tierVariationId || currentTierVariation.key}:${
        option.optionId || option.key
      }`;
      const variationName = `${currentTierVariation.tierName}:${option.optionValue}`;
      return [variationKey, variationName];
    };
    const newVariations = reduce(
      tierVariationOptions,
      (result: VariationType[], vOptions: TierVariationOptionType[]) => {
        const ret: VariationType[] = [];
        each(result, (res: VariationType) => {
          each(vOptions, (val: TierVariationOptionType, vIndex: number) => {
            const { tierIndies = [], variationKey = '', variationName = '' } = res;
            const newTierIndies = [...tierIndies, vIndex];
            const variationStr = getVariationKeyAndName(val, newTierIndies.length - 1);
            const newVariationKey =
              (variationKey.length > 0 && `${variationKey},${variationStr[0]}`) ||
              `${variationStr[0]}`;
            const newVariationName =
              (variationName.length > 0 && `${variationName},${variationStr[1]}`) ||
              `${variationStr[1]}`;
            if (newTierIndies.length === tierVariationsParam.length) {
              const old = group[newVariationKey] || {};
              ret.push({
                ...old,
                ...res,
                variationKey: newVariationKey,
                variationName: newVariationName,
                tierIndies: newTierIndies,
              });
            } else {
              ret.push({
                ...res,
                variationKey: newVariationKey,
                variationName: newVariationName,
                tierIndies: newTierIndies,
              });
            }
          });
        });
        return ret;
      },
      [{}] as VariationType[],
    );
    handleChange(newVariations);
  }

  const handleApply = (skuApply: SkuApplyType) => {
    const newValue: VariationType[] = variations.map((item) => {
      return {
        ...item,
        originalPrice: skuApply.amount,
        saleStock: skuApply.stock,
        itemCode: skuApply.itemCode,
      };
    });
    handleChange(newValue);
  };

  return (
    (variations.length && tierVariations.length && (
      <div className={styles.skuEditor} style={style}>
        <SkuApplyInput onApply={handleApply} />
        <div className={styles.space} />
        <div className={styles.skuTable}>
          <div className={styles.tableHeader}>
            {tierVariations.map((tierVariation) => (
              <div className={styles.tableCell} key={getTierVariationKey(tierVariation)}>
                <Text type="secondary">{tierVariation.tierName || '-'}</Text>
              </div>
            ))}
            <div className={styles.tableCells}>
              <div className={styles.tableCell}>
                <Text type="secondary">价格</Text>
              </div>
              <div className={styles.tableCell}>
                <Text type="secondary">库存</Text>
              </div>
              <div className={styles.tableCell}>
                <Text type="secondary">货号</Text>
              </div>
            </div>
          </div>
          <div className={styles.tableBody}>
            {variations.map((variation, outIndex) => {
              const { tierIndies = [] } = variation;
              return (
                <div className={styles.tableRow} key={variation.variationKey}>
                  {tierIndies.map((tierIndex, index) => (
                    <div
                      className={styles.tableCell}
                      key={getTierKey(variation, tierVariations[index].options[tierIndex])}
                    >
                      <Text type="secondary">
                        {tierVariations[index].options[tierIndex].optionValue}
                      </Text>
                    </div>
                  ))}
                  <div className={styles.tableCells}>
                    <div className={styles.tableCell}>
                      <FormItem name={['variations', outIndex, 'originalPrice']}>
                        <UnitInput suffix="RMB" />
                      </FormItem>
                    </div>
                    <div className={styles.tableCell}>
                      <FormItem name={['variations', outIndex, 'saleStock']}>
                        <UnitInput placeholder="库存" />
                      </FormItem>
                    </div>
                    <div className={styles.tableCell}>
                      <FormItem name={['variations', outIndex, 'itemCode']}>
                        <Input placeholder="商品编号" />
                      </FormItem>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )) ||
    null
  );
};

export default SkuEditor;
