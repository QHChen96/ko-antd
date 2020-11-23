import React, { useState } from 'react';

import { Row, Col, Button, Form, Modal, Input, Select, Switch } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { GridContent } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';

import { AttributeType } from '@/services/attribute';

export default (): React.ReactNode => {
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [modalValueVisible, setModalValueVisible] = useState<boolean>();

  const [attrForm] = Form.useForm();
  const [optionForm] = Form.useForm();

  const { Option } = Select;

  const columns: ProColumns<AttributeType>[] = [
    {
      title: '属性ID',
      key: 'attributeId',
      dataIndex: 'attributeId',
      width: 100,
      search: false,
    },
    {
      title: '属性标签',
      key: 'attributeLabel',
      dataIndex: 'attributeLabel',
      copyable: true,
      valueType: 'text',
      search: true,
    },
    {
      title: '属性名称',
      key: 'attributeName',
      dataIndex: 'attributeName',
      valueType: 'text',
      search: false,
    },
    {
      title: '数据类型',
      key: 'attributeType',
      dataIndex: 'attributeType',
      search: false,
    },
    {
      title: '输入方式',
      key: 'inputType',
      dataIndex: 'inputType',
      valueType: 'text',
      search: false,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      search: false,
    },
    {
      title: '销售属性',
      key: 'isSaleProp',
      dataIndex: 'isSaleProp',
      search: false,
    },
    {
      title: '可见',
      key: 'isVisible',
      dataIndex: 'isVisible',
      search: false,
    },
    {
      title: '必填',
      key: 'isMandatory',
      dataIndex: 'isMandatory',
      search: false,
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
      align: 'center',
      render: () => [
        <Button type="link" key="edit" style={{ padding: 0 }}>
          编辑
        </Button>,
      ],
    },
  ];

  const handleVisible = () => {
    setModalVisible(true);
  };

  return (
    <GridContent>
      <Row justify="space-around" gutter={[20, 12]}>
        <Col span={24}>
          <ProTable<AttributeType>
            columns={columns}
            rowKey="categoryId"
            headerTitle="属性列表"
            dateFormatter="string"
            // request={async (params = {}) => {
            //   return queryCategoryList({ ...params, parentCategoryId: getParent() });
            // }}
            toolBarRender={() => [
              <Button key="3" type="primary" onClick={handleVisible}>
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
        title="编辑属性"
        visible={modalVisible}
        width={800}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={attrForm} layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="attributeName" label="属性名称">
                <Input placeholder="属性名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="attributeLabel" label="属性标签">
                <Input placeholder="属性标签" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="categoryId" label="所属类目">
                <Input placeholder="所属类目" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="attributeType" label="属性类型">
                <Select>
                  <Option value="INT">整数</Option>
                  <Option value="STRING">字符串</Option>
                  <Option value="ENUM">枚举</Option>
                  <Option value="FLOAT">小数</Option>
                  <Option value="DATE">日期</Option>
                  <Option value="TIME">时间</Option>
                  <Option value="DATE_TIME">日期时间</Option>
                  <Option value="TIMESTAMP_TYPE">时间戳</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="inputType" label="输入方式">
                <Select>
                  <Option value="TEXT">文本</Option>
                  <Option value="SINGLE_SELECT">单选</Option>
                  <Option value="MULTI_SELECT">多选</Option>
                  <Option value="DATE_PICKER">时间选择器</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="isMandatory" label="是否必填">
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isVisible" label="是否可见">
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isInSearch" label="高级搜索">
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="isSaleProp" label="销售属性">
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="salePropStyle" label="销售属性样式">
                <Select>
                  <Option value="NORMAL">普通</Option>
                  <Option value="COLOR">色卡</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="sortWeight" label="排序权重">
                <Input placeholder="排序权重" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="编辑属性值"
        visible={modalValueVisible}
        width={600}
        onCancel={() => setModalValueVisible(false)}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={optionForm}>
          <Form.Item name="attributeName" label="属性名称">
            <Input placeholder="属性名称" readOnly />
          </Form.Item>
          <Form.Item name="optionValue" label="属性值">
            <Input placeholder="属性值" />
          </Form.Item>
          <Form.Item name="displayValue" label="显示值">
            <Input placeholder="显示值" />
          </Form.Item>
          <Form.Item name="sortWeight" label="排序">
            <Input placeholder="排序" />
          </Form.Item>
        </Form>
      </Modal>
    </GridContent>
  );
};
