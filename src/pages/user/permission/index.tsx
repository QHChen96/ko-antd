import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Col, Input, Tree, Button } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const roleTree = [
  {
    key: '0-0',
    title: '技术集团',
    children: [
      {
        key: '0-0-0',
        title: '企业发展部',
      }, {
        key: '0-0-1',
        title: '企业事业部',
      }, {
        key: '0-0-2',
        title: '网络事业部',
      }, {
        key: '0-0-3',
        title: '娱乐事业部',
      }, {
        key: '0-0-4',
        title: '社交事业部',
      }
    ]
  },
  {
    key: '0-1',
    title: '时尚集团',
    children: [
      {
        key: '0-1-0',
        title: '企业发展部',
      }, {
        key: '0-1-1',
        title: '企业事业部',
      }, {
        key: '0-1-2',
        title: '网络事业部',
      }, {
        key: '0-1-3',
        title: '娱乐事业部',
      }, {
        key: '0-1-4',
        title: '社交事业部',
      }
    ]
  }
]

const statusList = ['usable', 'disabled'];

const columns: ProColumns[] = [
  {
    title: '用户名',
    key: 'name',
    dataIndex: 'name',
    valueType: 'text'
  }, {
    title: '昵称',
    key: 'nickName',
    dataIndex: 'nickName',
    valueType: 'text'
  }, {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    valueType: 'text'
  }, {
    title: '创建时间',
    key: 'createAt',
    valueType: 'date',
    hideInSearch: true,
  }, {
    title: '修改时间',
    key: 'updateAt',
    valueType: 'date',
    hideInSearch: true,
  },
]

export interface UserListItem {
  key: number,
  name: string,
  nickName: string,
  status: string,
  createAt: number,
  updateAt: number
}

const dataSource: UserListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  dataSource.push({
    key: i,
    name: `用户 ${i}`,
    nickName: `昵称 ${i}`,
    status: statusList[Math.floor(Math.random() * 10) % 2],
    updateAt: Date.now() - Math.floor(Math.random() * 1000),
    createAt: Date.now() - Math.floor(Math.random() * 1000),
  })
}

export default (): React.ReactNode => {

  const onDragEnter = () => {}

  const onDrop = () => {}

  const [expandedKeys] = useState<Array<string>>([]);

  const actionRef = useRef<ActionType>();

  return (
    <GridContent>
      <Row justify="space-around" gutter={[20, 12]}>
        <Col span={6}>
          <Card >
            <Search style={{ marginBottom: 8 }} placeholder="搜索组织架构" />
            <Tree
              className="draggable-tree"
              defaultExpandedKeys={expandedKeys}
              blockNode
              onDragEnter={onDragEnter}
              onDrop={onDrop}
              treeData={roleTree}
            />
          </Card>
        </Col>
        <Col span={18}>

          <ProTable<UserListItem>
            columns={columns}
            actionRef={actionRef}
            rowKey="key"
            headerTitle="用户列表"
            dateFormatter="string"
            request={() => {
              return Promise.resolve({
                total: 200,
                data: dataSource,
                success: true
              })
            }}
            toolBarRender={() => [
              <Button key="3" type="primary">
                <PlusOutlined />
                新建
              </Button>,
            ]}
            options={{
              fullScreen: false
            }}
          />

        </Col>
      </Row>
    </GridContent>
  );
}
