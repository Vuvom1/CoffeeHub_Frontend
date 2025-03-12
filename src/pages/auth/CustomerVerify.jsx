import React, {useState} from 'react';
import {App, Form, Input, Button, DatePicker, Typography, Card } from 'antd';
import axiosInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import endpoints from '../../contants/Endpoint';

const CustomerVerify = () => {
    const navigate = useNavigate(); 
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.nameid : null;
    const [onSaving, setOnSaving] = useState(false);
    const {message} = App.useApp();

    const onFinish = async (values) => {
        setOnSaving(true);
        values.authId = userId;

        const response = await axiosInstance.post(apiEndpoints.customer.verifyCustomer, values).then((response) => {
            message.success("Verification successful");
            navigate(endpoints.customer.base);
        }
        ).catch((error) => {
            message.error(error.response.data)
            console.log(error.response);
        }
        ).finally(() => {
            setOnSaving(false);
        });
    };

    return (
        <Card style={{ width: '100%', maxWidth: 500, margin: 'auto', marginTop: 24, padding: 24 }}>
            <Typography.Title level={2}>Customer Verification</Typography.Title>
            <Form
                name="customer_verify"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
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
                    <Button loading={onSaving} type="primary" htmlType="submit">
                        Verify
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CustomerVerify;
