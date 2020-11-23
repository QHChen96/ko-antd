import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

const tabList = [
  {
    status: 'ALL',
    name: '全部'
  }, {
    status: 'SELL',
    name: '出售中'
  }, {
    status: 'SELL_OUT',
    name: '售罄'
  }, {
    status: 'SOLD_OUT',
    name: '仓库中'
  }
];

export default (): React.ReactNode => {


  return (
    <GridContent>
      <Card>
        <Tabs
          defaultActiveKey="ALL"
          tabBarGutter={48}
          tabPosition="top"
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
