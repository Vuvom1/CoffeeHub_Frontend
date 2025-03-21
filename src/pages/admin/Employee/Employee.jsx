import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Menu, Modal, Switch, Table, Typography, Row } from 'antd';
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
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    
    const navigateEmployeeProfile = (id) => () => {
        navigate(endpoints.admin.employeeProfile(id));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
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
            sorter: (a, b) => a.monthlySalary - b.monthlySalary,
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
            setFilteredEmployees(response.data.$values);
        }).catch((error) => {
            message.error(error.response.data);
        });
    }

    const handleSearch = async (value) => {
        setFilteredEmployees(employees.filter(employee => employee.name.toLowerCase().includes(value.toLowerCase())));
    }
    
    const showModalAddEmployee = () => {
        setIsModalAddEmployeeVisible(true);
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
            <Flex 
                vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Employee Management</Typography.Title>
                    <Button type="primary" onClick={showModalAddEmployee}><UserAddOutlined />Add Employee</Button>
                </Flex>
                <Row gutter={16}> 
                    <Input.Search placeholder="Search employee" onSearch={(value)=> handleSearch(value)}/>
                </Row>
            </Flex>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%', marginTop: 24 }}
                dataSource={filteredEmployees}
                columns={columns}
                pagination={true} />

            <Modal title="Add New Employee Account" open={isModalAddEmployeeVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <AddEmployee onSave={handleOk} />
            </Modal>
        </>
    );
};

export default Employee;