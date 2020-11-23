import React, { useState, useEffect } from 'react';
import CategorySelector from '@/components/CategorySelector';
import { Button, Modal, Space, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { CategoryType } from '@/services/item-category';

const { Text } = Typography;

export interface CategoryInputProps {
  value?: number;
  onChange?: (value?: number) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({ value, onChange }: CategoryInputProps) => {
  const [visible, setVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(value);
  const [paths, setPaths] = useState<CategoryType[]>([]);

  const { getPathsWithId } = useModel('useCategoryModel');

  useEffect(() => {
    if (categoryId) {
      setPaths(getPathsWithId(categoryId));
    }
  }, []);

  const handleChange = (selectedCategoryId: number, changedPaths: CategoryType[]) => {
    setPaths(changedPaths);
    setCategoryId(selectedCategoryId);
    if (onChange) {
      onChange(selectedCategoryId);
    }
  };

  return (
    <div>
      <Space size={1}>
        <Text type="secondary">
          {(paths.length && paths.map((path) => path.displayName).join(' > ')) || '未选择类目'}
        </Text>
        <Button type="link" onClick={() => setVisible(true)}>
          <EditOutlined />
        </Button>
        <Modal
          title="选择类别"
          visible={visible}
          width={800}
          bodyStyle={{ padding: 8 }}
          onCancel={() => setVisible(false)}
          destroyOnClose
        >
          <CategorySelector defaultPaths={paths} onChange={handleChange} />
        </Modal>
      </Space>
    </div>
  );
};

export default CategoryInput;
