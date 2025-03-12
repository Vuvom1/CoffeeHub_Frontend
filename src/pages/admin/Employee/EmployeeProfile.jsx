import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Flex, Typography, Tabs, Row, Col, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';
import { message } from 'antd';

const EmployeeProfile = () => {
    const id = useParams().id;

    const [employee, setEmployee] = useState({});

    const fetchEmployee = async () => {
        await apiInstance.get(apiEndpoints.admin.employee.getById(id)).then((response) => {
            setEmployee(response.data);
            
        }
        ).catch((error) => {
            message.error(error.response.data);
            console.log(error.response);
        }
        );
    }

    useEffect(() => {
        fetchEmployee();
    }, []);

    return (
        <Flex vertical align='start'>
            <Typography.Title level={2}>Employee Profile</Typography.Title>
            <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                <Tabs.TabPane tab="Profile" key="1">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card style={{ height: '100%' }}>
                                <Flex vertical direction='column' align='center'>
                                    <Avatar size={150} src={''} />
                                    <Typography.Text style={{marginTop: 10}}>@{employee.auth?.username}</Typography.Text>
                                    <Typography.Title level={3}>{employee.name}</Typography.Title>
                                    <Typography.Text>{employee.role}</Typography.Text>
                                </Flex>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Card>
                                    <Descriptions title="Basic Information" column={1}>
                                        {/* <Descriptions.Item label="Department">{employee.department}</Descriptions.Item> */}
                                        <Descriptions.Item label="Email">{employee.auth?.email}</Descriptions.Item>
                                        <Descriptions.Item label="Phone">{employee.phoneNumber}</Descriptions.Item>
                                        <Descriptions.Item label="Date of birth">{employee.dateOfBirth}</Descriptions.Item>
                                        <Descriptions.Item label="Address">{employee.address}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 16 }}>
                                <Card>
                                    <Descriptions title="Employee Information" column={1}>
                                        <Descriptions.Item label="Role">{employee.role}</Descriptions.Item>
                                        <Descriptions.Item label="Date start work">{employee.dateStartWork}</Descriptions.Item>
                                        <Descriptions.Item label="Salary">{employee.monthlySalary} VND</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Salaries Paid" key="2">
                    <Card>
                        <Typography.Text>Orders</Typography.Text>
                    </Card>
                </Tabs.TabPane>
            </Tabs>
        </Flex>
    );
};

export default EmployeeProfile;