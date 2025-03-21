import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Descriptions, Spin, Card, Flex, Typography, Row, Col, Divider, Image, Steps, Button, Skeleton, message, App } from 'antd';
import apiInstance from '../../../services/api';
import endpoints from '../../../contants/Endpoint';
import apiEndpoints from '../../../contants/ApiEndpoints';
import OrderStatus from '../../../contants/OrderStatus';
import moment from 'moment';
import UserRoles from '../../../contants/UserRoles';
import EmployeePosition from '../../../contants/EmployeePosition';
import { useSelector } from 'react-redux';

const OrderDetail = () => {
    const { message } = App.useApp();
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const user = useSelector((state) => state.auth.user);

    const fetchOrder = async () => {
        await apiInstance.get(apiEndpoints.admin.order.getById(id)).then((response) => {
            setOrder(response.data);
            setCurrentStep(
                response.data.status === OrderStatus.Pending ? 0 :
                    response.data.status === OrderStatus.Processing ? 1 :
                        response.data.status === OrderStatus.Preparing ? 2 :
                            response.data.status === OrderStatus.ReadyForPickup ? 3 :
                                response.data.status === OrderStatus.Completed ? 4 :
                                    response.data.status === OrderStatus.Cancelled ? 5 : 0
            )
        }
        ).catch((error) => {
            console.error('Failed to fetch order:', error);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleUpdateOrder = async () => {
        var newStatus = 0;

        Object.values(OrderStatus).forEach((status, index) => {
            if (status === order.status) {
                newStatus = index + 1;
            }
        });

        await apiInstance.put(apiEndpoints.admin.order.updateStatus(id, newStatus)).then((response) => {
            message.success('Order updated successfully');
            fetchOrder();
            navigate(endpoints.admin.order);
        }).catch((error) => {
            console.error('Failed to update order:', error);
        });
    }

    const handleCancelOrder = async () => {
        await apiInstance.put(apiEndpoints.admin.order.updateStatus(id, 5)).then((response) => {
            message.success('Order cancelled successfully');
            fetchOrder();
            navigate(endpoints.admin.order);
        }).catch((error) => {
            console.error('Failed to cancel order:', error);
        });
    }

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) {
        return <Spin />
    }

    if (!order) {
        return <Skeleton />
    }

    return (
        <Flex vertical align="start" style={{ height: '100%', paddingBottom: 16 }}>
            <Row justify='space-between' style={{ marginBottom: 16, width: '100%', alignItems: 'center' }}>
                <Typography.Title span={6} level={2}>Order Detail</Typography.Title>
                <Col span={18} style={{ textAlign: 'end' }}>
                    <Steps span={12} current={1} size="small">
                        <Steps.Step title="Pending" />
                        <Steps.Step title="Processing" />
                        <Steps.Step title="Preparing" />
                        <Steps.Step title="Ready for Pickup" />
                        <Steps.Step title="Completed" />
                        <Steps.Step title="Cancelled" />
                    </Steps>
                </Col>

            </Row>
            <Row gutter={16} style={{ height: '100%' }}>
                <Col span={16} style={{ height: '100%' }}>
                    <Card style={{ height: '100%' }}>
                        <Descriptions title="Order Information" column={2}>
                            <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
                            <Descriptions.Item label="Order Date & Time">{moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="Customer Name">{order.customer.name}</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">{order.customer.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Order Card">{order.orderCardNumber}</Descriptions.Item>
                        </Descriptions>
                        <Divider />

                        {order.orderDetails?.$values.map((orderDetail, index) => (
                            <Row gutter={16} style={{ marginTop: 16 }}>
                                <Col span={6}>
                                    <Image width={120} height={120} src={orderDetail.menuItem.imageUrl} />
                                </Col>
                                <Col span={12} style={{ textAlign: 'start' }}>
                                    <Row gutter={16}>
                                        <Col span={24} style={{ textAlign: 'start' }}>
                                            <Typography style={{ fontSize: 20 }}>{orderDetail.menuItem.name}</Typography>
                                            <Typography.Text type='secondary' style={{ fontSize: 20 }}>{orderDetail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={6} style={{ textAlign: 'end' }}>
                                    <Typography style={{ fontSize: 20 }}>x{orderDetail.quantity}</Typography>
                                </Col>
                            </Row>
                        ))}
                    </Card>
                </Col>

                <Col span={8} style={{ height: '100%' }}>
                    <Card style={{ height: '100%' }}>
                        <Typography.Title level={4}>Order Summary</Typography.Title>
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Payment method:</Typography.Text>
                            <Typography.Text strong>{order.paymentMethod}</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Payment status:</Typography.Text>
                            <Typography.Text strong>{order.paymentStatus}</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Voucher Applied:</Typography.Text>
                            <Typography.Text strong>{order.promotionId}</Typography.Text>
                        </Row>
                        <Divider />
                        <Row gutter={16} justify={'space-between'}>

                            <Typography.Text>Total items:</Typography.Text>

                            <Typography.Text strong>{order.totalQuantity}</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>

                            <Typography.Text>Subtotal:</Typography.Text>

                            <Typography.Text strong>{order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                        </Row>
                        <Row gutter={16} justify={'space-between'}>

                            <Typography.Text>Discount:</Typography.Text>

                            <Typography.Text strong>{order.discountAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                        </Row>
                        <Divider />
                        <Row gutter={16} justify={'space-between'}>
                            <Typography.Text>Total:</Typography.Text>
                            <Typography.Text strong>{order.finalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                        </Row>
                        <Divider />
                        <Button onClick={handleCancelOrder} size='large' type='secondary' style={{ width: '100%' }}>Cancel Order</Button>

                        <Flex justify='center' style={{ marginTop: 16 }}>
                            <Button hidden={order.status == OrderStatus.Completed} size='large' onClick={handleUpdateOrder} type='primary' style={{ width: '100%', marginTop: 16 }}>
                                {order.status === OrderStatus.Pending ? 'Start Processing' :
                                    order.status === OrderStatus.Processing ? 'Start Preparing' :
                                        order.status === OrderStatus.Preparing ? 'Ready for Pickup' :
                                            order.status === OrderStatus.ReadyForPickup ? 'Complete Order' : 'Order Completed'}
                            </Button>
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Flex>
    );
};

export default OrderDetail;