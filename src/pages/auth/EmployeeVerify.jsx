import React from 'react';
import { Form, Input, Button, DatePicker, Select, Typography, Card } from 'antd';
import axiosInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import endpoints from '../../contants/Endpoint';

const { Option } = Select;

const EmployeeVerify = () => {
    const navigate = useNavigate(); 
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.nameid : null;

    const onFinish = async (values) => {
        values.authId = userId;

        const response = await axiosInstance.post(apiEndpoints.admin.employee.add, values).then((response) => {
            message.success("Login successful");
            navigate(endpoints.admin.menuItem);
        }
        ).catch((error) => {
            message.error(error.response.data)
            console.log(error.response);
        }
        );
    };

    return (
        <Card style={{ width: '100%', maxWidth: 500, margin: 'auto', marginTop: 24, padding: 24 }}>
            <Typography.Title level={2}>Employee Verification</Typography.Title>
            <Form
                name="employee_verify"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[{ required: true, message: 'Please select your date of birth!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input />
                    </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Verify
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default EmployeeVerify;
