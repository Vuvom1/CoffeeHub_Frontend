import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin, Card, Flex, Typography, Row, Col, Divider, Image, Steps, Button } from 'antd';
// import axios from 'axios';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchOrder = async () => {
    //         try {
    //             const response = await axios.get(`/api/orders/${orderId}`);
    //             setOrder(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch order:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchOrder();
    // }, [orderId]);

    // if (loading) {
    //     return <Spin size="large" />;
    // }

    // if (!order) {
    //     return <p>Order not found</p>;
    // }

    return (
        <Flex vertical align="start" style={{ height: '100%', paddingBottom: 16 }}>
            <Row justify='space-between' style={{ marginBottom: 16, width: '100%', alignItems: 'center' }}>
                <Typography.Title span={12} level={2}>Order Detail</Typography.Title>
                <Col span={12} style={{ textAlign: 'end' }}>
                    <Steps span={12} current={1} size="small">
                        <Steps.Step title="Order Placed" />
                        <Steps.Step title="Order Processed" />
                        <Steps.Step title="Order Shipped" />
                        <Steps.Step title="Order Delivered" />
                    </Steps>                
                </Col>

            </Row>
            <Row gutter={16} style={{ height: '100%' }}>
                <Col span={16} style={{ height: '100%' }}>
                    <Card style={{ height: '100%' }}>
                        <Descriptions title="Order Information" column={2}>
                            <Descriptions.Item label="Order ID">123456</Descriptions.Item>
                            <Descriptions.Item label="Order Date">2021-10-01</Descriptions.Item>
                            <Descriptions.Item label="Customer Name">John Doe</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">123-456-7890</Descriptions.Item>
                            <Descriptions.Item label="Address">123 Main St, Springfield, IL 62701</Descriptions.Item>
                        </Descriptions>
                        <Divider />

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
                    </Card>
                </Col>

                <Col span={8} style={{ height: '100%' }}>
                    <Card style={{ height: '100%' }}>
                        <Typography.Title level={4}>Order Summary</Typography.Title>
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Payment method:</Typography.Text>
                            <Typography.Text strong>30</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Voucher Applied:</Typography.Text>
                            <Typography.Text strong>FSE232</Typography.Text>
                        </Row>
                        <Divider />
                        <Row gutter={16} justify={'space-between'}>

                            <Typography.Text>Total items:</Typography.Text>

                            <Typography.Text strong>30</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>

                            <Typography.Text>Subtotal:</Typography.Text>

                            <Typography.Text strong>$30</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>

                            <Typography.Text>Discount:</Typography.Text>

                            <Typography.Text strong>$5</Typography.Text>
                        </Row>
                        <Divider />
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Total:</Typography.Text>
                            <Typography.Text strong>$25</Typography.Text>
                        </Row>
                        <Divider />
                        <Button size='large' type='secondarys' style={{ width: '100%' }}>Cancel</Button>
                        
                        <Button size='large' type='primary' style={{ width: '100%', marginTop: 16 }}>Checkout</Button>
                    </Card>
                </Col>
            </Row>
        </Flex>
    );
};

export default OrderDetail;