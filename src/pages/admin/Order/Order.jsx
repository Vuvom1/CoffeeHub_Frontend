import React, { useEffect, useState } from 'react';
import { Button, Flex, Menu, Modal, Switch, Table, Typography, App, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../contants/Endpoint';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';
import { message } from 'antd';
import orderStatus from '../../../contants/OrderStatus';

const { SubMenu } = Menu;



const Order = () => {
    const navigate = useNavigate();
    const {message} = App.useApp();

    const [orders, setOrders] = useState([]);

    const [isModalAddOrderVisible, setIsModalAddOrderVisible] = useState(false);
    const [isModalEditOrderVisible, setIsModalEditOrderVisible] = useState(false);
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false);
    const [current, setCurrent] = useState('mail');
    
    const navigateOrderDetail = (orderId) => {
        navigate(endpoints.admin.orderDetail(orderId));
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date and Time',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text) => {
                return new Date(text).toLocaleString();
            }
        },
        
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => {
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            }
        },
        {
            title: 'Final Amount',
            dataIndex: 'finalAmount',
            key: 'finalAmout',
            render: (text) => {
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            }
        },
        {
            title: 'Card Number',
            dataIndex: 'orderCardNumber',
            key: 'orderCardNumber',
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
            }
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link">
                        <SettingOutlined onClick={()=>navigateOrderDetail(record.id)} />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchOrders = async () => {
        await apiInstance.get(apiEndpoints.admin.order.getAll).then((response) => {
            setOrders(response.data.$values);
        }).catch((error) => {
            message.error(error.response.data);
        });
    }

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleNavigateCreateOrder = () => {
        console.log('navigate to create order');    
        navigate(endpoints.admin.createOrder);
    }

    const showModalAddOrder = () => {
        setIsModalAddOrderVisible(true);
    };

    const showModalEditOrder = () => {
        setIsModalEditOrderVisible(true);
    };

    const showModalAddCategory = () => {
        setIsModalAddCategoryVisible(true);
    };

    const handleOk = () => {
        setIsModalAddOrderVisible(false);
        setIsModalEditOrderVisible(false);
        setIsModalAddCategoryVisible(false);
    };

    const handleCancel = () => {
        setIsModalAddOrderVisible(false);
        setIsModalEditOrderVisible(false);
        setIsModalAddCategoryVisible(false);
    };

    useEffect(() => {
        fetchOrders();
    }
    , []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Order Management</Typography.Title>
                    <Button type="primary" onClick={handleNavigateCreateOrder}>Add Order</Button>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <SubMenu key="sub1" title="Category 1">

                        </SubMenu>
                        <SubMenu key="sub2" title="Category 2">

                        </SubMenu>
                        <SubMenu key="sub3" title="Category 3">

                        </SubMenu>
                    </Menu>
                    <Button type="default" onClick={showModalAddCategory} >Add Category</Button>
                </Flex>
            </Flex>
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