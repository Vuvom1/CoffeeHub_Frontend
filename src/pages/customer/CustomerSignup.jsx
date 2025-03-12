import React from 'react';
import { Form, Input, Button, Checkbox, Flex, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const CustomerSignup = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Flex justify='between' align='center' style={{ padding: 24, width: '100%', height: '100vh' }}>
            <img src="src/assets/login-image.jpg" alt="Banner 1" style={{ width: '50%', height: '100%' }} />

            <Form
                name="signup"
                initialValues={{ remember: true }}
                style={{ maxWidth: 500, width: '100%', padding: 24, margin: 'auto' }}
                onFinish={onFinish}
            >
                <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Sign Up</Typography.Title>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginBottom: 0, marginTop: 24 }}>
                    <Button style={{marginBottom: 10}} block type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                    or <a href="">Log in now!</a>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default CustomerSignup;