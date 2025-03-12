import React from 'react';
import { Card, Descriptions, Avatar, Flex, Typography, Tabs, Row, Col } from 'antd';

const CustomerProfile = () => {
    const customer = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        avatar: 'https://via.placeholder.com/150'
    };

    return (
        <Flex vertical align='start'>
            <Typography.Title level={2}>Customer Profile</Typography.Title>
            <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
                <Tabs.TabPane tab="Profile" key="1">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card style={{ height: '100%' }}>
                                <Flex vertical direction='column' align='center'>
                                    <Avatar size={150} src={customer.avatar} />
                                    <Typography.Title level={3}>{customer.name}</Typography.Title>
                                </Flex>
                            </Card>
                        </Col>

                        <Col span={16} >
                            <Row gutter={16}>
                                <Card>
                                    <Descriptions title="Basic Information" column={1}>
                                        <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
                                        <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
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
