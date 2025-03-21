import React, {useState} from 'react';
import {App, Form, Input, Button, Checkbox, Row, Col, Typography, Image, DatePicker } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import loginImage from '../../assets/register-page-image.png';
import endpoints from '../../contants/Endpoint';
import apiEndpoints from '../../contants/ApiEndpoints';
import axiosInstance from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess } from '../../store/actions/authActions';


const Signup = () => {
    const navigate = useNavigate();
    const {message} = App.useApp();
    const [onSaving, setOnSaving] = useState(false);

    const onFinish = async (values) => {
        setOnSaving(true);
        values = {
            ...values,
            customer: {
                name: values.name,
                address: values.address,
                phoneNumber: values.phoneNumber,
                dateOfBirth: values.dateOfBirth
            }
        }

        await axiosInstance.post(apiEndpoints.auth.signupCustomer, values).then((response) => {
            message.success(response.data);
            navigate(endpoints.customer.login);
        }).catch((error) => {
            message.error(error.response.data)
            console.log(error.response);
        }
        ).finally(() => {
            setOnSaving(false);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
       
        <Row align='center' style={{ width: '100%', height: '100vh' }}>
            <Col xs={0} lg={12} style={{ height: '100vh', width: '100%' }}>
                <Image preview={false} src={loginImage} alt="Banner 1" style={{ padding: 10, width: '100%', height: '100vh' }} />
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Form 
                    wrapperCol={{ span: 24 }}
                    labelCol={{ span: 10 }}
                    name="signup"
                    labelAlign='left'
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 500, width: '100%', padding: 24, margin: 'auto' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Create new account</Typography.Title>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
    
                    >
                        <Input prefix={<UserOutlined />} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please input your address!' }]}                    >
                        <Input prefix={<UserOutlined />} placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="dateOfBirth"
                        label="Date of Birth"
                        rules={[{ required: true, message: 'Please select your date of birth!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginBottom: 0, marginTop: 24 }}>
                        <Button loading={onSaving} size='large' style={{ marginBottom: 10 }} block type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                        or <Link to={endpoints.auth.login}>Login now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
      
    );
};

export default Signup;