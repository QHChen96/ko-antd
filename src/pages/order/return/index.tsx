import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Row, Col, Timeline } from 'antd';

export default (): React.ReactNode => {
  return (
    <GridContent>
      <Row gutter={[24, 0]}>
        <Col span={16}>
          <Card>A</Card>
          <Card>B</Card>
        </Col>
        <Col span={8}>
          <Timeline>
            <Timeline.Item>发起了退款 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </GridContent>
  );
};
