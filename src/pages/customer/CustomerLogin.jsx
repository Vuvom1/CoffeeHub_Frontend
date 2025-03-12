import React from 'react';
import { Form, Input, Button, Checkbox, Flex, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const CustomerLogin = () => {
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
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 500, width: '100%', padding: 24, margin: 'auto' }}
                onFinish={onFinish}
            >
                <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Log in</Typography.Title>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item style={{ marginBottom: 16 }}>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                    <Button style={{marginBottom: 10}} block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <a href="">Register now!</a>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default CustomerLogin;