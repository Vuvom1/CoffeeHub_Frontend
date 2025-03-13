import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Flex, Typography, Tabs, Row, Col, Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';
import { message } from 'antd';

const CustomerProfile = () => {
    const id = useParams().id;

    const [customer, setCustomer] = useState({});

    const fetchCustomer = async () => {
        await apiInstance.get(apiEndpoints.admin.customer.getById(id)).then((response) => {
            setCustomer(response.data);
        }).catch((error) => {
            message.error(error.response.data);
        });
    }

    useEffect(() => {
        fetchCustomer();
    }, []);

    return (
        <Flex vertical align='start'>
            <Typography.Title level={2}>Customer Profile</Typography.Title>
            <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                <Tabs.TabPane tab="Profile" key="1">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card style={{ height: '100%' }}>
                                <Flex vertical direction='column' align='center'>
                                    <Avatar size={150} src={''} />
                                    <Typography.Text style={{ marginTop: 10 }}>@{customer.auth?.username}</Typography.Text>
                                    <Typography.Title level={3}>{customer.name}</Typography.Title>
                                    <Typography.Text>{customer.role}</Typography.Text>
                                </Flex>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Row gutter={16}>
                                <Card>
                                    <Descriptions title="Basic Information" column={1}>
                                        <Descriptions.Item label="Email">{customer.auth?.email}</Descriptions.Item>
                                        <Descriptions.Item label="Phone">{customer.phoneNumber}</Descriptions.Item>
                                        <Descriptions.Item label="Date of birth">                                            {new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 16 }}>
                                <Card>
                                    <Descriptions title="Customer Information" column={1}>
                                        <Descriptions.Item label="Point">{customer.point}</Descriptions.Item>
                                        <Descriptions.Item label="Account Level">{customer.customerLevel}</Descriptions.Item>
                                        <Descriptions.Item label="Total spent">{customer.totalSpent} VND</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Orders" key="2">
                    <Card>
                        <Typography.Text>Orders</Typography.Text>
                    </Card>
                </Tabs.TabPane>
            </Tabs>
        </Flex>
    );
};

export default CustomerProfile;
