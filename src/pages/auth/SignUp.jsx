import React from 'react';
import {App, Form, Input, Button, Checkbox, Row, Col, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import loginImage from '../../assets/login-image.jpg';
import endpoints from '../../contants/Endpoint';
import apiEndpoints from '../../contants/ApiEndpoints';
import axiosInstance from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess } from '../../store/actions/authActions';


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {message} = App.useApp();

    const onFinish = async (values) => {
        const response = await axiosInstance.post(apiEndpoints.auth.signupCustomer, values).then((response) => {
            message.success("Signup successful");
            login(values);
            navigate(endpoints.auth.customerVerify);
        });
    };

    const login = async (values) => {
        dispatch(loginRequest());
        const response = await axiosInstance.post(apiEndpoints.auth.login, values).then((response) => {
            dispatch(loginSuccess(response.data.token));           
        }
        ).catch((error) => {
            message.error(error.response.data)
            console.log(error.response.data);
        }
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row align='center' style={{ width: '100%', height: '100vh' }}>
            <Col span={12} style={{ height: '100%', width: '100%' }}>
                <img src={loginImage} alt="Banner 1" style={{ width: '100%', height: '100%' }} />
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <Form
                    name="signup"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 500, width: '100%', padding: 24, margin: 'auto' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginBottom: 0, marginTop: 24 }}>
                        <Button style={{ marginBottom: 10 }} block type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                        or <a href={endpoints.auth.login}>Log in now!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Signup;