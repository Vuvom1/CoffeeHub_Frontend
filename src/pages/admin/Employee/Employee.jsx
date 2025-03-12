import React, { useEffect, useState } from 'react';
import { Button, Flex, Menu, Modal, Switch, Table, Typography } from 'antd';
import { MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import AddEmployee from './AddEmployee';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../contants/Endpoint';

const { SubMenu } = Menu;

const Employee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [isModalAddEmployeeVisible, setIsModalAddEmployeeVisible] = useState(false);
    const [isModalEditEmployeeVisible, setIsModalEditEmployeeVisible] = useState(false);
    const [current, setCurrent] = useState('mail');

    
    const navigateEmployeeProfile = (id) => () => {
        navigate(endpoints.admin.employeeProfile(id));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Monthly Salary',
            dataIndex: 'monthlySalary',
            key: 'monthlySalary',
            render: (text, record) => (
                <Flex>
                    {text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}  
                </Flex>
            ),
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link" onClick={navigateEmployeeProfile(record.id)}>
                        <MoreOutlined />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchEmployees = async () => {    
        await apiInstance.get(apiEndpoints.admin.employee.getAll).then((response) => {
            setEmployees(response.data.$values);
        }).catch((error) => {
            message.error(error.response.data);
        });
    }

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const showModalAddEmployee = () => {
        setIsModalAddEmployeeVisible(true);
    };

    const showModalEditEmployee = () => {
        setIsModalEditEmployeeVisible(true);
    };

    const handleOk = () => {
        setIsModalAddEmployeeVisible(false);
        setIsModalEditEmployeeVisible(false);
    };

    const handleCancel = () => {
        setIsModalAddEmployeeVisible(false);
        setIsModalEditEmployeeVisible(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Employee Management</Typography.Title>
                    <Button type="primary" onClick={showModalAddEmployee}><UserAddOutlined />Add Employee</Button>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <SubMenu key="sub1" title="Department 1">

                        </SubMenu>
                        <SubMenu key="sub2" title="Department 2">

                        </SubMenu>
                        <SubMenu key="sub3" title="Department 3">

                        </SubMenu>
                    </Menu>
                </Flex>
            </Flex>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%' }}
                dataSource={employees}
                columns={columns}
                pagination={{}} />

            <Modal title="Add New Employee Account" open={isModalAddEmployeeVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <AddEmployee onSave={handleOk} />
            </Modal>
            {/* <Modal title="Edit Employee" open={isModalEditEmployeeVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddEmployee />
            </Modal> */}

        </>
    );
};

export default Employee;