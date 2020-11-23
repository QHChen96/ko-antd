import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Tabs, Card, Row, Col } from 'antd';

const { TabPane } = Tabs;

const tabList = [
  {
    key: 'SHIP',
    name: '待出货'
  }, {
    key: 'DOWNLOAD',
    name: '下载出货文件'
  }
];

export default (): React.ReactNode => {

  return (
    <GridContent>
      <Row gutter={[16, 0]}>
        <Col span={16}>
          <Card>
            <Tabs
              defaultActiveKey="ALL"
              tabBarGutter={48}
              tabPosition="top"
            >
            {
              tabList.map(tab => (
                <TabPane tab={tab.name} key={tab.key}>
                  {tab.name}
                </TabPane>
              ))
            }
            </Tabs>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="批量发货" />
        </Col>
      </Row>

    </GridContent>
  );
}
