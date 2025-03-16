import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Typography, Divider, Radio, App, Flex, Modal, Descriptions } from 'antd';
import { Form, Select, Input } from 'antd';
import { Collapse } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import apiInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import paymentMethod from '../../contants/PaymentMethod';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../contants/Endpoint';
import {clearCart} from '../../store/actions/cartActions';

const { Panel } = Collapse;

const panelHeaderStyle = {
    border: 'none',
    fontWeight: 'bold',
    textAlign: 'start'
};

const Checkout = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalItems = useSelector((state) => state.cart.totalItems);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const userId = user?.nameid;

    const [customerInfo, setCustomerInfo] = useState({});
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [shippingFee, setShippingFee] = useState(0);

    const [isModalSelectPromotionVisible, setIsModalSelectPromotionVisible] = useState(false);
    const [promotions, setPromotions] = useState([]);

    const handleCreateOrderWithDelivery = async (values) => {
        const order = {
            customerId: customerInfo.id,
            paymentMethod: values.paymentMethod,
            promotionId: selectedPromotion?.id,
            orderCardNumber: 0,
            orderDetails: cart.items.map(item => {
                return {
                    menuItemId: item.id,
                    quantity: item.quantity
                }
            }),
            delivery: {
                receiverName: values.receiverName,
                phoneNumber: values.phoneNumber,
                address: values.address,
                note: values.note
            }
        };

        await apiInstance.post(apiEndpoints.customer.order.add, order).then(response => {
            message.success('Order placed successfully');
            dispatch(clearCart());
            navigate(endpoints.customer.base);
        }).catch(error => {
            console.log(error);
        });
    }

    const fetchUsablePromotions = async () => {
        await apiInstance.get(apiEndpoints.customer.promotion.getUsablePromotionsByCustomerId(customerInfo.id)).then(response => {
            setPromotions(response.data.$values);
        }).catch(error => {
            console.log(error);
        });
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const fetchCustomerInfo = async () => {
        await apiInstance.get(apiEndpoints.customer.customer.getByAuthId(userId)).then(response => {
            setCustomerInfo(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOpenPromotionSelection = () => {
        setIsModalSelectPromotionVisible(true);
    }

    const handleSelectPromotion = (promotion) => {
        setSelectedPromotion(promotion);
        setIsModalSelectPromotionVisible(false);
    }

    const handleOk = () => {
        setIsModalSelectPromotionVisible(false);
    }

    const handleCancel = () => {
        setIsModalSelectPromotionVisible(false);
    }

    useEffect(() => {
        fetchCustomerInfo();
    }
        , []);

    useEffect(() => {
        fetchUsablePromotions();
    }
        , [customerInfo]);

    return (
        <>
        
        <Form layout='vertical' onFinish={handleCreateOrderWithDelivery}>
            <Row gutter={16} style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: 24 }}>
                <Col xs={24} lg={16} style={{ marginBottom: 24 }}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<div style={panelHeaderStyle}>Receiver Information</div>} key="1">
                            <Flex vertical>
                                <Form.Item label="Receiver's Name" name="receiverName" rules={[{ required: true, message: 'Please input receiver\'s name!' }]}>
                                    <Input placeholder="Enter receiver's names" />
                                </Form.Item>
                                <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please input receiver\'s phone number!' }]}>
                                    <Input placeholder="Enter receiver's phone number" />
                                </Form.Item>
                            </Flex>
                        </Panel>
                        <Panel header={<div style={panelHeaderStyle}>Shipping Address</div>} key="2">
                            <Flex vertical>
                                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
                                    <Input placeholder="Enter your address" />
                                </Form.Item>
                            </Flex>
                        </Panel>
                        <Panel header={<div style={panelHeaderStyle}>Payment Method</div>} key="3">
                            <Flex vertical>
                                <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                                    <Radio.Group style={{ width: '100%' }} buttonStyle="solid">
                                        {
                                            Object.values(paymentMethod).map((method, index) => (
                                                <Card align='start' key={index} style={{ marginBottom: 16 }}>
                                                    <Radio key={index} value={method}>{method}</Radio>
                                                </Card>
                                            ))
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </Flex>
                        </Panel>
                    </Collapse>
                </Col>
                <Col xs={24} lg={8}>
                    <Card>
                        <Flex flex={1} align='center' style={{ marginBottom: 16 }}>
                            <Input value={selectedPromotion?.code} placeholder='Enter promo code' />
                            <Button onClick={() => handleOpenPromotionSelection()} type='primary'>Select</Button>
                        </Flex>
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
                                <Typography.Text strong>{formatCurrency(totalAmount + shippingFee - (selectedPromotion ? selectedPromotion.discountRate * totalAmount/100 : 0) )}</Typography.Text>
                            </Col>
                        </Row>

                        <Divider />
                        <Form.Item>
                            <Button size='large' type="primary" block htmlType="submit">
                                Place Order
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </Form>

        <Modal title='Select voucher' open={isModalSelectPromotionVisible} onOk={handleOk} onCancel={handleCancel}>
            
            {promotions && 
                
                <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                {
                    promotions.length === 0 && <Flex justify='center' align='center' style={{ height: 200 }}>
                        <Typography.Text>No promotion available</Typography.Text>
                    </Flex>
                }
                {promotions.map((promotion, index) => (
                    <Card onClick={()=>handleSelectPromotion(promotion)} key={index} style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <div style={{ position: 'absolute',  top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontWeight: 'bold', fontSize: '24px' }}>
                                        {promotion.discountRate}%
                                    </div>
                                </div>
                            </Col>
                            <Col span={18}>
                            <Row gutter={16}>
                             <Descriptions title={promotion.code} column={1}>
                                <Descriptions.Item label="End date">{moment(promotion.endDate).format('DD/MM/YYYY')}</Descriptions.Item>
                                <Descriptions.Item label="Minimum amount">{formatCurrency(promotion.minPurchaseAmount)}</Descriptions.Item>
                                <Descriptions.Item >{promotion.description}</Descriptions.Item>
                             </Descriptions>
                        </Row>
                            </Col>
                        </Row>                    
                    </Card>
                ))}
                
            </Radio.Group>              
               
           }
            
        </Modal>
        </>
    );
};

export default Checkout;