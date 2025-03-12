import React, { useState } from 'react';
import { Button, Flex, Menu, Modal, Table, Typography } from 'antd';

const { SubMenu } = Menu;

const dataSource = [
    {
        key: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
    },
    {
        key: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '098-765-4321',
    },
    {
        key: '3',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '555-555-5555',
    },
];

const Customer = () => {
    const [isModalAddCustomerVisible, setIsModalAddCustomerVisible] = useState(false);
    const [isModalEditCustomerVisible, setIsModalEditCustomerVisible] = useState(false);
    const [current, setCurrent] = useState('mail');

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link" onClick={showModalEditCustomer}>
                        Edit
                    </Button>
                </Flex>
            ),
        }
    ];

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const showModalAddCustomer = () => {
        setIsModalAddCustomerVisible(true);
    };

    const showModalEditCustomer = () => {
        setIsModalEditCustomerVisible(true);
    };

    const handleOk = () => {
        setIsModalAddCustomerVisible(false);
        setIsModalEditCustomerVisible(false);
    };

    const handleCancel = () => {
        setIsModalAddCustomerVisible(false);
        setIsModalEditCustomerVisible(false);
    };

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Customer Management</Typography.Title>
                    <Button type="primary" onClick={showModalAddCustomer}>Add Customer</Button>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <SubMenu key="sub1" title="Group 1">

                        </SubMenu>
                        <SubMenu key="sub2" title="Group 2">

                        </SubMenu>
                        <SubMenu key="sub3" title="Group 3">

                        </SubMenu>
                    </Menu>
                </Flex>
            </Flex>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%' }}
                dataSource={dataSource}
                columns={columns}
                pagination={{}} />

            {/* <Modal title="Add New Customer" open={isModalAddCustomerVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddCustomer />
            </Modal>
            <Modal title="Edit Customer" open={isModalEditCustomerVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddCustomer />
            </Modal> */}

        </>
    );
};

export default Customer;
