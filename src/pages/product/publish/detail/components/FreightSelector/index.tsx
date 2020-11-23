import React from 'react';
import { Card, Row, Col, Select, Button, Space } from 'antd';

export interface FreightSelectorProp {}

const { Option } = Select;

const FreightSelector: React.FC<FreightSelectorProp> = () => {
  return (
    <Card bodyStyle={{ background: '#fcfcfc' }}>
      <Row>
        <Col span={2}>运费模板:</Col>
        <Col span={11}>
          <Select>
            <Option value={1}>包邮</Option>
          </Select>
        </Col>

        <Space>
          <Button>新建运费模板</Button>
          <Button>刷新运费模板</Button>
        </Space>
      </Row>
    </Card>
  );
};

export default FreightSelector;
