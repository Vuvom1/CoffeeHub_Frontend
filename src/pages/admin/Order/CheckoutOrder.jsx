import React from 'react';
import { Form, Input, Button, Select, DatePicker, Flex, Typography, Card, Row, Col, Image, Divider, Collapse, Radio } from 'antd';

const { Option } = Select;
const { Panel } = Collapse;
const { Item } = Form;


const CheckoutOrder = () => {
    const [form] = Form.useForm();

    return (
        <Flex vertical align='start' style={{ height: '100%', paddingBottom: 16 }}>
            <Typography.Title level={2}>Checkout Order</Typography.Title>
            <Flex style={{ width: '100%', height: '100%' }}>
                <Row gutter={14} style={{ width: '100%' }}>
                    <Col vertical span={14}>
                        <Collapse defaultActiveKey={['2']}>
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
                            <Panel header={<div style={panelHeaderStyle}>Payment Method</div>} key="3">
                                <Form layout="vertical">
                                    <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                                        <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                                            <Card >
                                                <Row gutter={16}>
                                                    <Col span={12} style={{ textAlign: 'start' }}>
                                                        <Typography.Text strong>Credit Card</Typography.Text>
                                                    </Col>
                                                    <Col span={8}>

                                                    </Col>
                                                    <Col span={4}>
                                                        <Radio value="creditCard"/>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                                <Row gutter={16}>
                                                    <Col span={12} style={{ textAlign: 'start' }}>
                                                        <Typography.Text strong>Bank Transfer</Typography.Text>
                                                    </Col>
                                                    <Col span={8}>

                                                    </Col>
                                                    <Col span={4}>
                                                        <Radio value="bankTransfer"/>
                                                    </Col>
                                                </Row>
                                                
                                               
                                            </Card>



                                        </Radio.Group>
                                    </Form.Item>
                                </Form>
                            </Panel>
                        </Collapse>
                    </Col>

                    <Col vertical span={10} style={{ height: '100%' }}>
                        <Card title='Selected items' style={{ width: '100%', height: '100%' }}>
                            <Flex vertical justify={'space-evenly'} style={{ marginBottom: 16, height: '100%' }}>
                                <Flex flex={1} vertical style={{ height: '100%' }}>
                                    <Row style={{ marginBottom: 16 }}>
                                        <Col span={6}>
                                            <Image height={100} width={100} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                                        </Col>
                                        <Col span={16} offset={1} style={{ textAlign: 'start' }}>
                                            <Row gutter={16} justify={'space-between'}>
                                                <Typography strong style={{ fontSize: 20 }}>Product Name</Typography>
                                                <Typography.Text type='secondary' style={{ fontSize: 24 }}>$10</Typography.Text>
                                            </Row>
                                            <Row gutter={16}>
                                                <Typography.Text style={{ fontSize: 12, fontWeight: 300 }}>Beverage</Typography.Text>
                                            </Row>
                                            <Row justify={'end'} gutter={16}>
                                                <Button>-</Button>
                                                <Input style={{ width: 50, textAlign: 'center' }} defaultValue={1} />
                                                <Button>+</Button>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Flex>

                                <Divider />

                                <Flex flex={1} align='center' style={{ marginBottom: 16 }}>
                                    <Input placeholder='Enter promo code' />
                                    <Button type='primary'>Apply</Button>
                                </Flex>

                                <Flex flex={1} vertical style={{ marginBottom: 16 }}>
                                    <Row justify={'space-between'}>
                                        <Typography.Text>Total items:</Typography.Text>
                                        <Typography.Text strong>30</Typography.Text>
                                    </Row>
                                    <Row justify={'space-between'}>
                                        <Typography.Text>Subtotal:</Typography.Text>
                                        <Typography.Text strong>$30</Typography.Text>
                                    </Row>
                                    <Row justify={'space-between'}>
                                        <Typography.Text>Discount:</Typography.Text>
                                        <Typography.Text strong>$5</Typography.Text>
                                    </Row>
                                    <Divider />
                                    <Row justify={'space-between'}>
                                        <Typography.Text>Total:</Typography.Text>
                                        <Typography.Text strong>$25</Typography.Text>
                                    </Row>
                                    <Divider />
                                    <Row>
                                        <Button size='large' type='primary' style={{ width: '100%' }}>Checkout</Button>
                                    </Row>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>
                </Row>
            </Flex>
        </Flex>
    );
};

export default CheckoutOrder;
