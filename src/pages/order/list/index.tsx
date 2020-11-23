import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Tabs, Card, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const tabList = [
  {
    status: 'ALL',
    name: '全部'
  }, {
    status: 'UNPAID',
    name: '未付款'
  }, {
    status: 'READY_TO_SHIP',
    name: '待发货'
  }, {
    status: 'SHIPPED',
    name: '已发货'
  }, {
    status: 'COMPLETED',
    name: '已完成'
  }, {
    status: 'CANCELLED',
    name: '已取消'
  }, {
    status: 'TO_RETURN',
    name: '退款/退货'
  }
];

const operationSlot = {
  right: <Button type="primary" icon={<FileTextOutlined />}>出货</Button>
}

export default (): React.ReactNode => {


  return (
    <GridContent>
      <Card>
        <Tabs
          defaultActiveKey="ALL"
          tabBarGutter={48}
          tabPosition="top"
          tabBarExtraContent={operationSlot}
        >
        {
          tabList.map(tab => (
            <TabPane tab={tab.name} key={tab.status}>
              {tab.name}
            </TabPane>
          ))
        }
        </Tabs>
      </Card>
    </GridContent>
  );
}
