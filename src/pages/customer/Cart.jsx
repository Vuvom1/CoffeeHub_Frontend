import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, InputNumber, Row, Col, Card, Typography, Divider, Flex, Image } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/actions/cartActions';
import endpoints from '../../contants/Endpoint';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalItems = useSelector((state) => state.cart.totalItems);

    const handleQuantityChange = (value, key) => {
        dispatch(updateQuantity({ key, quantity: value }));
    };

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
        
    };

    const handleNavigateCheckout = () => {
        navigate(endpoints.customer.checkout);
    }

    return (
        <Row gutter={[16, 16]} style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: 24 }}>
            <Col xs={24} md={16}>
                {
                    cartItems.map((item, index) => (
                        <Row key={index} style={{ marginBottom: 16 }}>
                            <Col span={6}>
                                <Image height={'100%'} width={'100%'} src={item.imageUrl} />
                            </Col>
                            <Col span={17} offset={1} style={{ textAlign: 'start' }}>
                                <Row gutter={16} justify={'space-between'}>
                                    <Row>
                                        <Typography.Text style={{ marginBottom: 0, fontSize: 20 }}>{item.name}</Typography.Text>
                                    </Row>
                                    <Row>
                                        <Typography.Text style={{ fontSize: 20 }} type="secondary">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                    </Row>
                                </Row>
                                <Row gutter={16}>
                                    <Typography.Text style={{ fontSize: 16, fontWeight: 300 }}>{item.description}</Typography.Text>
                                </Row>
                                <Row gutter={16} style={{ marginTop: 10, justifyContent: 'end' }}>
                                    <ButtonGroup>
                                        <Button disabled={item.quantity <= 0} onClick={() => handleQuantityChange(item.quantity - 1, item.key)}>-</Button>
                                        <InputNumber style={{ width: 50, textAlign: 'center' }} value={item.quantity} min={1} defaultValue={item.quantity} onChange={(value) => handleQuantityChange(value, item.key)} />
                                        <Button onClick={() => handleQuantityChange(item.quantity + 1, item.key)}>+</Button>
                                    </ButtonGroup>
                                    <Button type="link" onClick={() => handleRemove(item.id)}>
                                        Remove
                                    </Button>
                                </Row>
                            </Col>

                        </Row>
                    ))
                }
            </Col>
            <Col xs={24} md={8}>
                <Card>
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text style={{ textAlign: 'start' }}>Total item</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text strong>{totalItems}</Typography.Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text>Total Amount</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text strong>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Button onClick={()=>handleNavigateCheckout()} size='large' type="primary" block>
                        Process to Checkout
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default Cart;