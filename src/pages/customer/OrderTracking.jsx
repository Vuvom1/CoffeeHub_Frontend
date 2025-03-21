import React, { useState, useEffect } from 'react';
import { Steps, Card, Tabs, List, Row, Col, Image, Flex, Collapse, Typography, Button, Divider } from 'antd';
import { useSelector } from 'react-redux';
import apiInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';

const { TabPane } = Tabs;

const OrderTracking = () => {
    const [activeKey, setActiveKey] = useState('1');
    const customerId = useSelector(state => state.auth.user?.id);
    const [orders, setOrders] = useState([]);
    const [showAll, setShowAll] = useState(null);

    if (!customerId) {
        return <Typography style={{marginTop: 16}}>
            Please login to see your orders
        </Typography>
    }

    const fetchOrdersByCustomerId = async () => {
        await apiInstance.get(apiEndpoints.customer.order.getByCustomerId(customerId)).then(response => {
            setOrders(response.data.$values);
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }

    useEffect(() => {
        fetchOrdersByCustomerId();
    }, []);


    const getOrdersByStatus = (status) => {
        return orders.filter(order => order.delivery.status === status);
    };

    

    const renderOrders = (status) => (
        <Flex vertical gap={16} >
            {getOrdersByStatus(status).map((order, index) => (
                <div key={order.id}>
                    <Row gutter={16}>
                        <Col span={12} style={{ textAlign: 'start' }}>
                            <p>{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}</p>
                        </Col>
                        <Col span={12} style={{ textAlign: 'end' }}>
                            <p>{order.delivery.status}</p>
                        </Col>
                    </Row>
                    {order.orderDetails.$values && order.orderDetails.$values.length > 0 && (
                        <>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Image width={120} height={120} src={order.orderDetails.$values[0].menuItem.imageUrl} />
                                </Col>
                                <Col span={12} style={{ textAlign: 'start' }}>
                                    <Row gutter={16}>
                                        <Col span={24} style={{ textAlign: 'start' }}>
                                            <Typography style={{ fontSize: 20 }}>{order.orderDetails.$values[0].menuItem.name}</Typography>
                                            <Typography.Text type='secondary' style={{ fontSize: 20 }}>{order.orderDetails.$values[0].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={6} style={{ textAlign: 'end' }}>
                                    <Typography style={{ fontSize: 20 }}>x{order.orderDetails.$values[0].quantity}</Typography>
                                </Col>
                            </Row>
                            {showAll === index && order.orderDetails.$values.slice(1).map((item, itemIndex) => (
                                <Row gutter={16} style={{ marginTop: 16 }} key={itemIndex}>
                                    <Col span={6}>
                                        <Image width={120} height={120} src={item.menuItem.imageUrl} />
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'start' }}>
                                        <Row gutter={16}>
                                            <Col span={24} style={{ textAlign: 'start' }}>
                                                <Typography style={{ fontSize: 20 }}>{item.menuItem.name}</Typography>
                                                <Typography.Text type='secondary' style={{ fontSize: 20 }}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={6} style={{ textAlign: 'end' }}>
                                        <Typography style={{ fontSize: 20 }}>x{item.quantity}</Typography>
                                    </Col>
                                </Row>
                            ))}
                            <Row gutter={16}>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Button type='text' onClick={() => setShowAll(showAll === index ? null : index)}>
                                        {showAll === index ? 'Show less' : 'Show all'}
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={20} style={{ textAlign: 'end' }}>
                            <Typography style={{ fontSize: 20, fontWeight: 200 }}>Total:</Typography>
                        </Col>
                        <Col span={4} style={{ textAlign: 'end' }}>
                            <Typography style={{ fontSize: 20, fontWeight: 600 }}>{order.finalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>
                        </Col>
                    </Row>
                    <Divider />
                </div>
            ))}
        </Flex>
    );

    return (
        <div style={{ paddingLeft: '16%', paddingRight: '16%', paddingTop: 24 }}>

            <Tabs defaultActiveKey="1" centered onChange={key => setActiveKey(key)}>
                <TabPane tab="Wait for pending" key="1">
                    {renderOrders('Pending')}
                </TabPane>
                <TabPane tab="Is Processing" key="2">
                    {renderOrders('Processing')}
                </TabPane>
                <TabPane tab="Is Delivering" key="3">
                    {renderOrders('Is Delivering')}
                </TabPane>
                <TabPane tab="Delivered" key="4">
                    {renderOrders('Delivered')}
                </TabPane>
                <TabPane tab="Cancelled" key="5">
                    {renderOrders('Cancelled')}
                </TabPane>
            </Tabs>

        </div>
    );
};

export default OrderTracking;