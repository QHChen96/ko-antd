import React, { useState } from 'react';
import { Prompt } from 'umi';
import { Form, Input, Typography, Space, Button, Select } from 'antd';
import UnitInput from '@/components/UnitInput/index';
import DimensionInput from '@/components/DimensionInput';
import { FormLabelAlign } from 'antd/es/form/interface';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useBoolean } from 'ahooks';
import { ItemType } from '@/services/item';
import CategoryInput from '@/components/CategoryInput';
import { isEqual } from 'lodash';
import ImagesUpload from './components/ImageUploads';
import FreightSelector from './components/FreightSelector/index';
import SpecEditor from './components/SpecEditor';
import SkuEditor from './components/SkuEidtor';
import AttributeGroup from './components/AttributeGroup/index';

// @ts-ignore
import styles from './index.less';

const layout = {
  labelAlign: 'right' as FormLabelAlign,
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Item: FormItem } = Form;
const { Text } = Typography;
const { TextArea } = Input;

interface ItemAttrOption {
  label: string;
  value: string;
}
export interface ItemAttr {
  label: string;
  type: 'select' | 'input';
  options?: ItemAttrOption[];
}

const attrList: ItemAttr[] = [
  {
    label: '品牌',
    type: 'select',
  },
  {
    label: '保存期限',
    type: 'input',
  },
];

const imageTitles = [
  '封面图片',
  '图片 1',
  '图片 2',
  '图片 3',
  '图片 4',
  '图片 5',
  '图片 6',
  '图片 7',
];

export default (): React.ReactNode => {
  const [form] = Form.useForm();
  const [warnLeave] = useBoolean(true);

  const [editItem] = useState<Partial<ItemType>>({
    categoryId: 19451,
    attributes: {},
    tierVariations: [],
    variations: [],
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
  };

  return (
    <>
      <Prompt when={warnLeave} message="你确定要离开么？" />
      <Form.Provider>
        <Form initialValues={{ ...editItem }} {...layout} form={form} scrollToFirstError>
          <ProCard title="基本信息" collapsible>
            <FormItem
              label="商品名称"
              name="itemName"
              required
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input maxLength={60} />
            </FormItem>
            <FormItem label="品牌名称" name="brandId" required>
              <Select className={styles.middleInput}>
                <Select.Option value="1">KHETAO</Select.Option>
              </Select>
            </FormItem>
            <FormItem label="商品描述">
              <TextArea showCount maxLength={3000} autoSize={{ minRows: 4, maxRows: 4 }} />
            </FormItem>
            <FormItem label="所属类目" name="categoryId">
              <CategoryInput />
            </FormItem>
            <FormItem
              label="类目属性"
              shouldUpdate={(prevValues, curValues) =>
                prevValues.categoryId !== curValues.categoryId
              }
            >
              {({ getFieldValue }) => {
                const cateId = getFieldValue('categoryId');
                return (
                  <FormItem name="attributes">
                    <AttributeGroup categoryId={cateId} />
                  </FormItem>
                );
              }}
            </FormItem>
            {attrList.map((attr) => (
              <FormItem key={attr.label} label={attr.label}>
                <Input className={styles.middleInput} />
              </FormItem>
            ))}
          </ProCard>
          <ProCard title="销售属性" collapsible style={{ marginTop: '8px' }}>
            <FormItem label="价格">
              <UnitInput className={styles.smallInput} suffix={<Text type="secondary">$</Text>} />
            </FormItem>
            <FormItem label="商品数量">
              <UnitInput className={styles.smallInput} />
            </FormItem>
            <FormItem label="卖家SKU">
              <Input className={styles.smallInput} />
            </FormItem>
            <FormItem label="变体" name="tierVariations">
              <SpecEditor style={{ width: '60%' }} />
            </FormItem>
            <FormItem
              noStyle
              shouldUpdate={(prevValues, curValues) => {
                return !isEqual(prevValues.tierVariations, curValues.tierVariations);
              }}
            >
              {({ getFieldValue }) => {
                const tierVariations = getFieldValue('tierVariations');
                if (!tierVariations || !tierVariations.length) {
                  return null;
                }
                return (
                  <FormItem label="规格表" name="variations">
                    <SkuEditor tierVariations={[...tierVariations]} style={{ width: '80%' }} />
                  </FormItem>
                );
              }}
            </FormItem>
            <FormItem label="商品编码">
              <Input className={styles.smallInput} />
            </FormItem>
            <FormItem label="商品条形码">
              <Input className={styles.smallInput} />
            </FormItem>
          </ProCard>
          <ProCard title="图文描述" collapsible style={{ marginTop: '8px' }}>
            <FormItem label="商品图片" name="images">
              <ImagesUpload imageTitles={imageTitles} />
            </FormItem>
          </ProCard>
          <ProCard title="运费" collapsible style={{ marginTop: '8px' }}>
            <FormItem label="重量">
              <UnitInput className={styles.smallInput} suffix={<Text type="secondary">kg</Text>} />
            </FormItem>

            <FormItem label="包装" name="dimension" rules={[{ required: true, message: '请输入' }]}>
              <DimensionInput unit="cm" />
            </FormItem>

            <FormItem label="运费">
              <FreightSelector />
            </FormItem>
          </ProCard>
          <ProCard title="其他" collapsible style={{ marginTop: '8px', marginBottom: '20px' }}>
            <FormItem label="关键字">
              <Input />
            </FormItem>
            <FormItem label="详情">
              <Input />
            </FormItem>
            <FormItem label="Tax Code">
              <Input />
            </FormItem>
          </ProCard>
        </Form>
      </Form.Provider>
      <FooterToolbar>
        <Space>
          <Button>取消</Button>
          <Button>保存并下架</Button>
          <Button type="primary" onClick={handleSubmit}>
            保存并上架
          </Button>
        </Space>
      </FooterToolbar>
    </>
  );
};
