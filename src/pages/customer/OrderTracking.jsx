import React, { useState } from 'react';
import { Steps, Card, Tabs, List, Row, Col, Image, Flex, Collapse, Typography, Button, Divider } from 'antd';

const { Step } = Steps;
const { TabPane } = Tabs;

const mockOrders = [
    { id: 1, status: 'Wait for pending', description: 'Order 1 description' },
    { id: 2, status: 'Is Processing', description: 'Order 2 description' },
    { id: 3, status: 'Is Delivering', description: 'Order 3 description' },
    { id: 4, status: 'Delivered', description: 'Order 4 description' },
    { id: 5, status: 'Wait for pending', description: 'Order 5 description' },
];

const OrderTracking = () => {
    const [activeKey, setActiveKey] = useState('1');

    const getOrdersByStatus = (status) => {
        return mockOrders.filter(order => order.status === status);
    };

    const renderOrders = (status) => (
        <Flex vertical gap={16} >
            {getOrdersByStatus(status).map(order => {
                const [showAll, setShowAll] = useState(false);

                return (
                    <div key={order.id}>
                        <Row gutter={16}>
                            <Col span={12} style={{ textAlign: 'start' }}>
                                <p>{new Date().toLocaleDateString()}</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'end' }}>
                                <p>{order.status}</p>
                            </Col>
                        </Row>
                        <Row gutter={16} >
                            <Col span={6}>
                                <Image width={120} height={120} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                            </Col>
                            <Col span={12} style={{ textAlign: 'start' }}>
                                <Row gutter={16}>
                                    <Col span={24} style={{ textAlign: 'start' }}>
                                        <Typography style={{ fontSize: 20 }}>Product Name</Typography>
                                        <Typography.Text type='secondary' style={{ fontSize: 20 }}>$10</Typography.Text>
                                        <p>Beverage</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6} style={{ textAlign: 'end' }}>
                                <Typography style={{ fontSize: 20 }}>x1</Typography>
                            </Col>
                        </Row>
                        {showAll && (
                            <Row gutter={16} style={{ marginTop: 16 }}>
                                <Col span={6}>
                                    <Image width={120} height={120} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                                </Col>
                                <Col span={12} style={{ textAlign: 'start' }}>
                                    <Row gutter={16}>
                                        <Col span={24} style={{ textAlign: 'start' }}>
                                            <Typography style={{ fontSize: 20 }}>Product Name</Typography>
                                            <Typography.Text type='secondary' style={{ fontSize: 20 }}>$10</Typography.Text>
                                            <p>Beverage</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={6} style={{ textAlign: 'end' }}>
                                    <Typography style={{ fontSize: 20 }}>x1</Typography>
                                </Col>
                            </Row>
                        )}
                        <Row gutter={16}>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type='text' onClick={() => setShowAll(!showAll)}>
                                    {showAll ? 'Show less' : 'Show all'}
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 16 }} >
                            <Col span={20} style={{ textAlign: 'end' }}>
                                <Typography style={{ fontSize: 20, fontWeight: 200 }}>Total:</Typography>
                            </Col>
                            <Col span={4} style={{ textAlign: 'end' }}>
                                <Typography style={{ fontSize: 20, fontWeight: 600 }}>$10</Typography>
                            </Col>

                        </Row>
                        <Divider />
                    </div>
                );
            })}
        </Flex>
    );

    return (
        <div style={{ paddingLeft: '16%', paddingRight: '16%', paddingTop: 24 }}>

            <Tabs defaultActiveKey="1" centered onChange={key => setActiveKey(key)}>
                <TabPane tab="Wait for pending" key="1">
                    {renderOrders('Wait for pending')}
                </TabPane>
                <TabPane tab="Is Processing" key="2">
                    {renderOrders('Is Processing')}
                </TabPane>
                <TabPane tab="Is Delivering" key="3">
                    {renderOrders('Is Delivering')}
                </TabPane>
                <TabPane tab="Delivered" key="4">
                    {renderOrders('Delivered')}
                </TabPane>
            </Tabs>

        </div>
    );
};

export default OrderTracking;