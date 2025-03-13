import React, { useEffect, useState } from 'react';
import { App, Form, Input, Button, Select, DatePicker, Flex, Typography, Card, Row, Col, Image, Divider, Collapse, Radio, message, Descriptions, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../../services/api';
import endpoints from '../../../contants/Endpoint';
import apiEndpoints from '../../../contants/ApiEndpoints';
import PaymentMethod from '../../../contants/PaymentMethod';

const { Option } = Select;
const { Panel } = Collapse;


const panelHeaderStyle = {
    border: 'none',
    fontWeight: 'bold',
    textAlign: 'start'
};

const CreateOrder = () => {
    const [form] = Form.useForm();
    const [menuItems, setMenuItems] = useState([]);
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [totalItems, setTotalItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    const [selectedItems, setSelectedItems] = useState([]);
    const [customer, setCustomer] = useState(null);

    const [step, setStep] = useState(1);

    const fetchMenuItems = async () => {
        await apiInstance.get(apiEndpoints.admin.menuItem.getAll)
            .then((response) => {
                setMenuItems(response.data.$values);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchCustomerByPhoneNumber = async () => {
        const phoneNumber = form.getFieldValue('phoneNumber');
        await apiInstance.get(apiEndpoints.admin.customer.getByPhoneNumber(phoneNumber))
            .then((response) => {
                setCustomer(response.data);
                console.log(customer)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCreateOrder = async () => {
        const values = form.getFieldsValue();
        const order = {
            employeeId: '916b633f-9167-4823-84cc-6e43795f0fc2',
            customerId: values.customerId,
            paymentMethod: values.paymentMethod,
            orderDetails: selectedItems.map((item) => ({
                menuItemId: item.id,
                quantity: item.quantity
            })),
            note: values.note,
            orderCardNumber: values.orderCardNumber
        };

        await apiInstance.post(apiEndpoints.admin.order.add, order)
            .then((response) => {
                message.success('Order created successfully');
                navigate(endpoints.admin.order);
            })
            .catch((error) => {
                console.error(error);
                message.error('Failed to create order');
            });
    }

    const handleSelectItem = (item) => {
        if (selectedItems.includes(item)) {
            return;
        }

        item.quantity = 1;
        setSelectedItems([...selectedItems, item]);
    };

    const handleIncreaseQuantity = (item) => {
        const index = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].quantity += 1;
        setSelectedItems(newSelectedItems);
    };

    const handleDecreaseQuantity = (item) => {
        const index = selectedItems.findIndex((selectedItem) => selectedItem.id === item.id);
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index].quantity -= 1;

        if (newSelectedItems[index].quantity === 0) {
            handleRemoveItem(item);
            return;
        }

        setSelectedItems(newSelectedItems);
    };

    const handleRemoveItem = (item) => {
        const newSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
        setSelectedItems(newSelectedItems);
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleCalculateTotal = () => {
        const totalItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const total = subtotal - discount;

        setTotalItems(totalItems);
        setSubtotal(subtotal);
        setTotal(total);
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    useEffect(() => {
        handleCalculateTotal();
    }
        , [selectedItems]);

    return (
        <Form align='start' onFinish={handleCreateOrder} layout='vertical' style={{ height: '100%', paddingBottom: 16 }} form={form}>
            <Typography.Title level={2}>Create Order</Typography.Title>
            <Flex style={{ width: '100%', height: '100%' }}>
                <Row gutter={16} style={{ width: '100%' }}>
                    {/* Menu items */}
                    {step === 1 && (
                        <Col span={14}>
                            <Input.Search style={{ marginBottom: 16 }} placeholder="Search menu item" enterButton />
                            <Row gutter={8} >
                                {
                                    menuItems?.map((item, index) => (
                                        <Col span={12} key={index}>
                                            <Card >
                                                <Row gutter={16} >
                                                    <Col span={6}>
                                                        <Image style={{ maxWidth: '100%' }} height={100} width={100} src={item.imageUrl} />
                                                    </Col>
                                                    <Col span={14} offset={4} style={{ textAlign: 'start' }}>
                                                        <Row gutter={16} justify={'space-between'}>
                                                            <Typography strong style={{ fontSize: 20 }}>{item.name}</Typography>
                                                        </Row>
                                                        <Row gutter={16}>
                                                            <Typography.Text style={{ fontSize: 12, fontWeight: 300 }}>{item.menuItemCategoryName}</Typography.Text>
                                                        </Row>
                                                        <Row justify={'space-between'} gutter={16}>
                                                            <Typography.Text type='secondary' style={{ fontSize: 24 }}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                                            <Button disabled={selectedItems.includes(item)} onClick={() => handleSelectItem(item)}>+</Button>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>

                        </Col>
                    )}
                    {/* Checkout */}
                    {step === 2 && (
                        <Col vertical span={14}>
                            <Collapse defaultActiveKey={['2']}>
                                <Panel header={<div style={panelHeaderStyle}>Personal Information</div>} key="1">

                                    <Form.Item label="Phone Number" name="phoneNumber">
                                        <Flex>
                                            <Input placeholder="Enter your phone number" />
                                            <Button type='primary' onClick={fetchCustomerByPhoneNumber}>Search</Button>
                                        </Flex>
                                    </Form.Item>
                                    {customer && (
                                        <Flex vertical>
                                            <Typography.Text strong>Customer Information</Typography.Text>
                                            <Descriptions column={1}>
                                                <Descriptions.Item label="Full Name">{customer.name}</Descriptions.Item>
                                                <Descriptions.Item label="Phone Number">{customer.phoneNumber}</Descriptions.Item>
                                                <Descriptions.Item label="Is Available">{customer.isAvailable ? 'Yes' : 'No'}</Descriptions.Item>
                                            </Descriptions>
                                        </Flex>
                                    )}
                                    <Form.Item
                                        name="customerId"
                                        hidden
                                        value={customer?.id}
                                    >
                                    </Form.Item>
                                </Panel>
                                <Panel header={<div style={panelHeaderStyle}>Payment Method</div>} key="3">

                                    <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                                        <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                                            <Card >

                                                {
                                                    Object.values(PaymentMethod).map((method, index) => (
                                                        <>
                                                        <Row gutter={16}>
                                                            <Col span={12} style={{ textAlign: 'start' }}>
                                                                <Typography.Text strong>Credit Card</Typography.Text>
                                                            </Col>
                                                            <Col span={8}></Col>
                                                            <Col span={4}>
                                                                <Radio value={index} />
                                                            </Col>
                                                        </Row>
                                                        <Divider />
                                                        </>
                                                    ))
                                                }
                                            </Card>
                                        </Radio.Group>
                                    </Form.Item>

                                </Panel>
                                <Panel header={<div style={panelHeaderStyle}>Additional Detail</div>} key="3">

                                    <Form.Item layout='horizontal' label="Order Card Number" name="orderCardNumber" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                                        <InputNumber placeholder="Enter order card number" />
                                    </Form.Item>
                                    <Form.Item label='Note' name='note'>
                                        <Input.TextArea placeholder='Enter note' />
                                    </Form.Item>
                                </Panel>

                            </Collapse>
                        </Col>
                    )}
                    <Col vertical span={10} style={{ height: '100%' }}>
                        <Card title='Selected items' style={{ width: '100%', height: '100%' }}>
                            <Flex vertical justify={'space-evenly'} style={{ marginBottom: 16, height: '100%' }}>
                                <Flex flex={1} vertical style={{ height: '100%' }}>
                                    {selectedItems.map((item, index) => (
                                        <Row style={{ marginBottom: 16 }} key={index}>
                                            <Col span={6}>
                                                <Image height={'100%'} width={'100%'} src={item.imageUrl} />
                                            </Col>
                                            <Col span={16} offset={1} style={{ textAlign: 'start' }}>
                                                <Row gutter={16} justify={'space-between'}>
                                                    <Typography strong style={{ fontSize: 20 }}>{item.name}</Typography>
                                                    <Typography.Text type='secondary' style={{ fontSize: 24 }}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                                </Row>
                                                <Row gutter={16}>
                                                    <Typography.Text style={{ fontSize: 12, fontWeight: 300 }}>{item.menuItemCategoryName}</Typography.Text>
                                                </Row>
                                                <Row justify={'end'} gutter={16}>
                                                    <Button onClick={() => handleDecreaseQuantity(item)} >-</Button>
                                                    <Input style={{ width: 50, textAlign: 'center' }} value={item.quantity} readOnly />
                                                    <Button onClick={() => handleIncreaseQuantity(item)} >+</Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    ))}

                                </Flex>

                                <Divider />

                                <Flex flex={1} align='center' style={{ marginBottom: 16 }}>
                                    <Input placeholder='Enter promo code' />
                                    <Button type='primary'>Apply</Button>
                                </Flex>

                                <Flex flex={1} vertical style={{ marginBottom: 16 }}>
                                    <Row justify={'space-between'}>
                                        <Typography.Text >Total items:</Typography.Text>
                                        <Typography.Text strong>{totalItems}</Typography.Text>
                                    </Row>
                                    <Row justify={'space-between'}>
                                        <Typography.Text >Subtotal:</Typography.Text>
                                        <Typography.Text strong>{subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                    </Row>
                                    <Row justify={'space-between'}>
                                        <Typography.Text >Discount:</Typography.Text>
                                        <Typography.Text strong>{discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                    </Row>
                                    <Divider />
                                    <Row justify={'space-between'}>
                                        <Typography.Text >Total:</Typography.Text>
                                        <Typography.Text strong>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                    </Row>
                                    <Divider />
                                    <Row>
                                        {step === 1 && (
                                            <>
                                                <Button type='primary' size='large' style={{ width: '100%' }} onClick={handleNextStep}>Checkout</Button>
                                            </>
                                        )}
                                        {step === 2 && (<>
                                            <Button type='default' size='large' style={{ width: '100%' }} onClick={handlePreviousStep}>Previous</Button>
                                            <Button size='large' htmlType='submit' type='primary' style={{ width: '100%', marginTop: 10 }}>Confirm</Button>
                                        </>
                                        )}
                                    </Row>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>


                </Row>
            </Flex>
        </Form>
    );
};

export default CreateOrder;