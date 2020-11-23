import React, { useState, useRef, useEffect } from 'react';
import { Card, Row, Col, Input, Tree, Button, Image, Form, Modal, Select } from 'antd';
import ProTable, { ActionType, ProColumns, TableDropdown } from '@ant-design/pro-table';
import { GridContent } from '@ant-design/pro-layout';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import ImageUpload from '@/components/ImageUpload';
import {
  CategoryType,
  postCategory,
  queryCategoryList,
  CategoryEditType,
  queryCategorySelect,
} from '@/services/item-category';

import { DataNode } from 'antd/lib/tree';
import { last } from 'lodash';

const { Search } = Input;

const cateTree: DataNode[] = [];
const ROOT_CATE = { categoryId: 0, displayName: '顶级分类' };

export default (): React.ReactNode => {
  const [cateModelVisible, setCateModelVisible] = useState(false);
  const [editCate, setEditCate] = useState<Partial<CategoryEditType>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [categoryPath, setCategoryPath] = useState<Partial<CategoryType>[]>([ROOT_CATE]);
  const actionRef = useRef<ActionType>();
  const [selectCateList, setSelectCateList] = useState<Partial<CategoryType>[]>([]);
  const [form] = Form.useForm<CategoryEditType>();

  const handleCateEdit = async (category: Partial<CategoryType>) => {
    let list: any[] = [];
    if (categoryPath.length === 1) {
      list = [ROOT_CATE];
    } else {
      const pid = categoryPath[categoryPath.length - 2].categoryId;
      const result = await queryCategorySelect(pid!);
      if (result.success) {
        list = [...result.data];
      }
    }
    setSelectCateList(list);
    setEditCate(category);
    setCateModelVisible(true);
  };

  const handleCateEditCancel = () => {
    setCateModelVisible(false);
  };

  const handleSubmit = async () => {
    const { categoryId } = editCate;
    const values = (await form.validateFields()) as CategoryEditType;
    await postCategory({ ...values, categoryId });
    setCateModelVisible(false);
    actionRef!.current!.reload(true);
  };

  const goChild = (parentCate: Partial<CategoryType>) => {
    setCategoryPath([...categoryPath, parentCate]);
    actionRef!.current!.reload(true);
  };

  const goParent = () => {
    if (categoryPath.length === 1) {
      return;
    }
    setCategoryPath([...categoryPath.splice(0, categoryPath.length - 1)]);
    actionRef!.current!.reload(true);
  };

  const getParent = () => {
    if (categoryPath.length === 1) {
      return categoryPath[0];
    }
    return categoryPath[categoryPath.length - 1];
  };

  useEffect(() => {
    form.resetFields();
  }, [cateModelVisible]);

  const columns: ProColumns<CategoryType>[] = [
    {
      title: '分类ID',
      key: 'categoryId',
      dataIndex: 'categoryId',
      width: 100,
      search: false,
    },
    {
      title: '分类名称',
      key: 'displayName',
      dataIndex: 'displayName',
      copyable: true,
      valueType: 'text',
      search: true,
    },
    {
      title: '分类图片',
      key: 'categoryImage',
      dataIndex: 'categoryImage',
      valueType: 'text',
      width: 100,
      search: false,
      render: (text, row) => (
        <Image
          width={60}
          height={60}
          src={row.categoryImage}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        />
      ),
    },
    {
      title: '父分类ID',
      key: 'parentCategoryId',
      dataIndex: 'parentCategoryId',
      width: 100,
      search: false,
    },
    {
      title: '上级分类',
      valueType: 'text',
      search: false,
      render: () => <>{last(categoryPath)?.displayName}</>,
    },
    {
      title: '排序',
      key: 'sortWeight',
      dataIndex: 'sortWeight',
      search: false,
    },
    {
      title: '创建时间',
      key: 'createdDate',
      valueType: 'date',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      align: 'center',
      render: (text, row, _, action) => [
        <Button type="link" key="edit" style={{ padding: 0 }} onClick={() => handleCateEdit(row)}>
          编辑
        </Button>,
        <Button
          type="link"
          key="addChild"
          style={{ padding: 0 }}
          disabled={row.depth >= 3}
          onClick={() => handleCateEdit({ parentCategoryId: row.categoryId })}
        >
          添加
        </Button>,
        <Button
          type="link"
          key="child"
          style={{ padding: 0 }}
          disabled={row.parentCategoryId === 0}
          onClick={() => goParent()}
        >
          上级
        </Button>,
        <Button
          type="link"
          key="child"
          style={{ padding: 0 }}
          disabled={row.depth >= 3 || !row.hasChildren}
          onClick={() => goChild(row)}
        >
          下级
        </Button>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action.reload()}
          menus={[{ key: 'delete', name: '删除' }]}
        />,
      ],
    },
  ];

  return (
    <GridContent>
      <Row justify="space-around" gutter={[20, 12]}>
        <Col span={6}>
          <Card style={{ height: '100%' }}>
            <Search style={{ marginBottom: 8 }} placeholder="搜索类目" />
            <Tree
              className="draggable-tree"
              defaultExpandedKeys={expandedKeys}
              blockNode
              treeData={cateTree}
            />
          </Card>
        </Col>
        <Col span={18}>
          <ProTable<CategoryType>
            columns={columns}
            actionRef={actionRef}
            rowKey="categoryId"
            headerTitle="类目列表"
            dateFormatter="string"
            request={async (params = {}) => {
              return queryCategoryList({ ...params, parentCategoryId: getParent().categoryId! });
            }}
            toolBarRender={() => [
              categoryPath.length > 1 && (
                <Button key="3" type="default" onClick={() => goParent()}>
                  <RollbackOutlined />
                  返回
                </Button>
              ),
              <Button
                key="3"
                type="primary"
                onClick={() => handleCateEdit({ parentCategoryId: getParent().categoryId! })}
              >
                <PlusOutlined />
                新建
              </Button>,
            ]}
            options={{
              fullScreen: false,
            }}
          />
        </Col>
      </Row>
      <Modal
        title={editCate.categoryId ? `编辑类目` : `新增类目`}
        visible={cateModelVisible}
        onOk={() => handleSubmit()}
        onCancel={handleCateEditCancel}
      >
        <Form initialValues={{ ...editCate }} form={form}>
          <Form.Item label="分类名称" name="displayName">
            <Input />
          </Form.Item>
          <Form.Item label="上级分类" name="parentCategoryId">
            <Select>
              {selectCateList.map((selectCate) => (
                <Select.Option key={selectCate.categoryId} value={selectCate.categoryId!}>
                  {selectCate.displayName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="分类图片" name="categoryImage">
            <ImageUpload />
          </Form.Item>
        </Form>
      </Modal>
    </GridContent>
  );
};
