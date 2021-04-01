import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, Form } from 'antd';
import {
  AttributeType,
  queryCategoryAttributes,
  ItemAttributeValueType,
  ItemAttributesType,
} from '@/services/attribute';
import { FormLabelAlign } from 'antd/es/form/interface';

// @ts-ignore
import styles from './style.less';

const { Item: FormItem } = Form;

const itemLayout = {
  labelAlign: 'right' as FormLabelAlign,
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

export interface AttributeGroupProps {
  value?: ItemAttributesType;
  onChange?: (value: ItemAttributesType) => void;
  categoryId?: number;
}

interface AttributeGroupItemProps {
  item: AttributeType;
  value: ItemAttributeValueType;
  onChange: (attributeId: number, newValue: ItemAttributeValueType) => void;
}

const AttributeGroupItem = ({ item, onChange, value = {} }: AttributeGroupItemProps) => {
  const { displayName, isMandatory = false, inputType = 'TEXT', options = [] } = item;

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...value, textValue: event.target.value };
    onChange(item.attributeId, newValue);
  };

  const handleSingleSelectChange = (selectedValue: number) => {
    const newValue = { ...value, value: selectedValue };
    onChange(item.attributeId, newValue);
  };

  return (
    <FormItem
      label={displayName}
      required={isMandatory}
      rules={[{ required: isMandatory, message: '请输入' }]}
      {...itemLayout}
    >
      {inputType === 'TEXT' && <Input onChange={handleTextChange} value={value.textValue} />}
      {inputType === 'SINGLE_SELECT' && (
        <Select defaultValue={value.value} onChange={handleSingleSelectChange} allowClear>
          {options.map((option) => (
            <Select.Option key={option.optionId} value={option.optionId}>
              {option.displayValue}
            </Select.Option>
          ))}
        </Select>
      )}
    </FormItem>
  );
};

const AttributeGroup: React.FC<AttributeGroupProps> = ({ value = {}, onChange, categoryId }) => {
  const [categoryAttributes, setCategoryAttributes] = useState<AttributeType[]>([]);
  const [cateId] = useState(categoryId);
  useEffect(() => {
    async function fetchCategoryAttributes(queryCategoryId: number) {
      const result = await queryCategoryAttributes(queryCategoryId);
      if (result.success) {
        setCategoryAttributes(result.data || []);
      } else {
        setCategoryAttributes([]);
      }
    }

    if (cateId) {
      fetchCategoryAttributes(cateId);
    } else {
      setCategoryAttributes([]);
    }
  }, [cateId]);

  const handleItemChange = (attributeId: number, newValue: ItemAttributeValueType) => {
    const newItemAttributes = { ...value, [attributeId]: newValue };
    if (onChange) {
      onChange(newItemAttributes);
    }
  };
  const mid = Math.ceil(categoryAttributes.length / 2);
  return (
    <div className={styles.attributeInput}>
      <Row gutter={24} justify="center">
        <Col span={12}>
          {categoryAttributes.slice(0, mid).map((item) => (
            <AttributeGroupItem
              key={item.attributeId}
              item={item}
              value={value[item.attributeId]}
              onChange={handleItemChange}
            />
          ))}
        </Col>
        <Col span={12}>
          {categoryAttributes.slice(mid, categoryAttributes.length).map((item) => (
            <AttributeGroupItem
              key={item.attributeId}
              item={item}
              value={value[item.attributeId]}
              onChange={handleItemChange}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default AttributeGroup;
