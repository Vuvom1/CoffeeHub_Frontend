import React, { useState } from 'react';
import { Table, Button, InputNumber, Row, Col, Card, Typography, Divider, Radio } from 'antd';
import { Form, Select, Input } from 'antd';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalItems = useSelector((state) => state.cart.totalItems);

    const [shippingFee, setShippingFee] = useState(0);

    const { Panel } = Collapse;

    const panelHeaderStyle = {
        border: 'none',
        fontWeight: 'bold',
        textAlign: 'start'
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <Row gutter={16} style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: 24 }}>
            <Col span={16}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header={<div style={panelHeaderStyle}>Personal Information</div>} key="1">
                        <Form layout="vertical">
                            <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please input your full name!' }]}>
                                <Input placeholder="Enter your full name" />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>
                        </Form>
                    </Panel>
                    <Panel header={<div style={panelHeaderStyle}>Shipping Address</div>} key="2">
                        <Form layout="vertical">
                            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
                                <Input placeholder="Enter your address" />
                            </Form.Item>
                            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
                                <Input placeholder="Enter your city" />
                            </Form.Item>
                            <Form.Item label="Postal Code" name="postalCode" rules={[{ required: true, message: 'Please input your postal code!' }]}>
                                <Input placeholder="Enter your postal code" />
                            </Form.Item>
                        </Form>
                    </Panel>
                    <Panel header={<div style={panelHeaderStyle}>Payment Method</div>} key="3">
                        <Form layout="vertical">
                            <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                                <Radio.Group buttonStyle="solid">
                                    <Radio value="creditCard">Credit Card</Radio>
                                    <Radio value="paypal">PayPal</Radio>
                                    <Radio value="bankTransfer">Bank Transfer</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </Col>
            <Col span={8}>
                <Card>
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text style={{ textAlign: 'start' }}>Total items</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text strong>{totalItems}</Typography.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text>Subtotal</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text strong>{formatCurrency(totalAmount)}</Typography.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text>Shipping</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text strong>{formatCurrency(shippingFee)}</Typography.Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text>Total</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text strong>{formatCurrency(totalAmount + shippingFee)}</Typography.Text>
                        </Col>
                    </Row>
                    
                    <Divider />
                    <Button size='large' type="primary" block>
                        Checkout
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default Checkout;