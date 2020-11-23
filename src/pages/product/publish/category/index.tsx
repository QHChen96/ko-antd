import React, { useState } from 'react';
import { history, useModel } from 'umi';
import CategorySelector from '@/components/CategorySelector';
import { Card, Input, Form, Button, Modal } from 'antd';

export default (): React.ReactNode => {
  const { item, setItem, isEdit } = useModel('useItemModel');
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const handleToNext = () => {
    setVisible(true);
  };

  return (
    <Card title={isEdit ? '编辑商品' : '新增商品'} bodyStyle={{ width: '100%' }}>
      <Form style={{ width: '100%' }} form={form}>
        <Form.Item label="商品名称" name="itemName">
          <Input />
        </Form.Item>
        <Form.Item name="categories">
          <CategorySelector categoryId={19451} />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" onClick={handleToNext}>
            下一步
          </Button>
        </div>
        <Modal
          title="选择类别"
          visible={visible}
          width={800}
          bodyStyle={{ padding: 8 }}
          onCancel={() => setVisible(false)}
          destroyOnClose
        >
          <CategorySelector />
        </Modal>
      </Form>
    </Card>
  );
};
