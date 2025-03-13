import React, { use, useEffect, useState } from 'react';
import { Button, Flex, Menu, Modal, Table, Typography } from 'antd';
import apiEndpoints from '../../../contants/ApiEndpoints';  
import apiInstance from '../../../services/api';
import { ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import endpoints from '../../../contants/Endpoint';
import { useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const [isModalAddCustomerVisible, setIsModalAddCustomerVisible] = useState(false);
    const [isModalEditCustomerVisible, setIsModalEditCustomerVisible] = useState(false);
    const [current, setCurrent] = useState('mail');

    const handleNavigateToProfile = (id) => {
        console.log(id);
        navigate(endpoints.admin.customerProfile(id));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'auth',
            key: 'auth',
            render: (text) => text.username ? text.username : 'N/A'
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Level',
            dataIndex: 'customerLevel',
            key: 'customerLevel',
        },
        {
            key: 'action',
            render: (_, record) => (
                <Flex justify="center">
                    <Button type="link" onClick={showModalEditCustomer}>
                        <ProfileOutlined onClick={()=>handleNavigateToProfile(record.id)} />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchCustomers = async () => { 
        await apiInstance.get(apiEndpoints.admin.customer.getAll).then((response) => {
            setCustomers(response.data.$values);
        }
        ).catch((error) => {
            message.error(error.response.data);
        }
        );
    }

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

    useEffect(() => {
        fetchCustomers();
    }
    , []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Customer Management</Typography.Title>
                    {/* <Button type="primary" onClick={showModalAddCustomer}>Add Customer</Button> */}
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
                dataSource={customers}
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
