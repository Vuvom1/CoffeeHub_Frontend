import React, { useState } from 'react';
import { Button, Flex, Menu, Modal, Switch, Table, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../contants/Endpoint';

const { SubMenu } = Menu;

const dataSource = [
    {
        key: '1',
        orderNumber: '12345',
        customerName: 'John Doe',
        status: 'Pending',
    },
    {
        key: '2',
        orderNumber: '67890',
        customerName: 'Jane Smith',
        status: 'Completed',
    },
];

const columns = [
    {
        title: 'Order Number',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    },
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Available',
        dataIndex: 'available',
        key: 'available',
        render: (text) => <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={text} />,
    },
    {
        key: 'action',
        render: (text, record) => (
            <Flex justify="center">
                <Button type="link">
                    <SettingOutlined />
                </Button>
            </Flex>
        ),
    }
];

const Order = () => {
    const navigate = useNavigate();

    const [isModalAddOrderVisible, setIsModalAddOrderVisible] = useState(false);
    const [isModalEditOrderVisible, setIsModalEditOrderVisible] = useState(false);
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false);
    const [current, setCurrent] = useState('mail');

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
                dataSource={dataSource}
                columns={columns}
                pagination={{}} />

            {/* <Modal title="Add New Order" open={isModalAddOrderVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddOrder />
            </Modal>
            <Modal title="Edit Order" open={isModalEditOrderVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddOrder />
            </Modal>
            <Modal title="Add New Category" open={isModalAddCategoryVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddOrderCategory />
            </Modal>  */}

        </>
    );
};

export default Order;