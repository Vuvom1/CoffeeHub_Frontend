import React, { useEffect, useState } from 'react';
import { Button, Flex, Menu, Modal, Switch, Table, Typography, App, Tag, Row, Input, Col } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../contants/Endpoint';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';
import { message } from 'antd';
import orderStatus from '../../../contants/OrderStatus';
import { useSelector } from 'react-redux';
import UserRoles from '../../../contants/UserRoles';
import EmployeePosition from '../../../contants/EmployeePosition';

const { SubMenu } = Menu;

const Order = () => {
    const navigate = useNavigate();
    const { message } = App.useApp();
    const user = useSelector(state => state.auth.user);

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [current, setCurrent] = useState('all');

    const navigateOrderDetail = (orderId) => {
        navigate(endpoints.admin.orderDetail(orderId));
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Date and Time',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text) => {
                return new Date(text).toLocaleString();
            },
            sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
        },

        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => {
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: 'Final Amount',
            dataIndex: 'finalAmount',
            key: 'finalAmout',
            render: (text) => {
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
            sorter: (a, b) => a.finalAmount - b.finalAmount,
        },
        {
            title: 'Card Number',
            dataIndex: 'orderCardNumber',
            key: 'orderCardNumber',
            sorter: (a, b) => a.orderCardNumber - b.orderCardNumber,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case orderStatus.Pending:
                        return <Tag color='yellow'>{text}</Tag>
                    case orderStatus.Preparing:
                        return <Tag color='blue'>{text}</Tag>
                    case orderStatus.ReadyForPickup:
                        return <Tag color='purple'>{text}</Tag>
                    case orderStatus.Completed:
                        return <Tag color='green'>{text}</Tag>
                    case orderStatus.Cancelled:
                        return <Tag color='red'>{text}</Tag>
                    default:
                        return <Tag color='orange'>{text}</Tag>
                }
            },
            sorter: (a, b) => a.status - b.status,
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link">
                        <SettingOutlined onClick={() => navigateOrderDetail(record.id)} />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchOrders = async () => {
        if (user.role == UserRoles.ADMIN) {
            await apiInstance.get(apiEndpoints.admin.order.getAll).then((response) => {
                setOrders(response.data.$values);
            }).catch((error) => {
                message.error(error.response.data);
            });
        } else {
            if (user.position == EmployeePosition.CASHIER) {
                await apiInstance.get(apiEndpoints.admin.order.getPendingOrProcessing).then((response) => {
                    setOrders(response.data.$values);
                }).catch((error) => {
                    message.error(error.response.data);
                });
            }
            if (user.position == EmployeePosition.BARISTA) {
                await apiInstance.get(apiEndpoints.admin.order.getProcessingOrPreparing).then((response) => {
                    setOrders(response.data.$values);
                }).catch((error) => {
                    message.error(error.response.data);
                });
            }
            if (user.position == EmployeePosition.WAITER) {
                await apiInstance.get(apiEndpoints.admin.order.getReadyOrders).then((response) => {
                    setOrders(response.data.$values);
                }).catch((error) => {
                    message.error(error.response.data);
                });
            }
        }
    }

    const handleNavigateCreateOrder = () => {
        console.log('navigate to create order');
        navigate(endpoints.admin.createOrder);
    }

    useEffect(() => {
        fetchOrders();
    }
        , []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Order Management</Typography.Title>
                    <Button size='large' type="primary" onClick={handleNavigateCreateOrder}>Add Order</Button>
                </Flex>
            </Flex>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Input.Search
                        styles={{ width: '60%' }}
                        placeholder="Search orders"
                    />
            </Row>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Menu selectedKeys={[current]} mode="horizontal" style={{ width: '100%' }}>
                    <Menu.Item key="all">All</Menu.Item>
                    <Menu.Item key={orderStatus.Pending}>Pending</Menu.Item>
                    <Menu.Item key={orderStatus.Preparing}>Preparing</Menu.Item>
                    <Menu.Item key={orderStatus.ReadyForPickup}>Ready For Pickup</Menu.Item>
                    <Menu.Item key={orderStatus.Completed}>Completed</Menu.Item>
                    <Menu.Item key={orderStatus.Cancelled}>Cancelled</Menu.Item>
                </Menu>
            </Row>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%' }}
                dataSource={orders}
                columns={columns}
                pagination={{}} />
        </>
    );
};

export default Order;