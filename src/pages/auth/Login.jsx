import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Image, Col, Row, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Flex from 'antd/lib/flex';
import loginImage from '../../assets/login-image.jpg';
import endpoints from '../../contants/Endpoint';
import axiosInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess } from '../../store/actions/authActions';
import UserRoles from '../../contants/UserRoles';

const Login = () => {
    const {message} = App.useApp();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        dispatch(loginRequest());
        const response = await axiosInstance.post(apiEndpoints.auth.login, values).then((response) => {
            dispatch(loginSuccess(response.data.token));
            message.success("Login successful");
            if (response.data.isVerified === false) {
                if (response.data.userRole === UserRoles.CUSTOMER) {
                    navigate(endpoints.auth.customerVerify);
                } else {
                    navigate(endpoints.auth.employeeVerify);
                }
            } else {
                if (response.data.userRole === UserRoles.CUSTOMER) {
                    navigate(endpoints.customer.base);
                }
                else {
                    navigate(endpoints.admin.menuItem);
                }
            }
        }
        ).catch((error) => {
            message.error(error.response.data)
            console.log(error.response.data);
        }
        );
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Login failed", errorInfo);
    };

    const showMessages = () => {
        message.success("Login successful");
    }

    return (
        <Row align='center' style={{ width: '100%', height: '100vh' }}>
            <Col span={12} style={{ height: '100%', width: '100%' }}>
                <img src={loginImage} alt="Banner 1" style={{ width: '100%', height: '100%' }} />
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 500, width: '100%', padding: 24, margin: 'auto' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Log in</Typography.Title>
                    <Form.Item
                        name="Username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
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
                        <Button style={{ marginBottom: 10 }} block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <a href={endpoints.auth.signup}>Register now!</a>
                    </Form.Item>
                    <Button onClick={showMessages} style={{ marginTop: 20 }} block type="secondary" htmlType="submit">
                        Continue as guest
                    </Button>
                </Form>

            </Col>

        </Row>
    );
};

export default Login;