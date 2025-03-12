import React, { useState } from 'react';
import { Form, Input, Button, message, App, Result } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoint from '../../../contants/ApiEndpoints';

const AddEmployee = ({ onSave }) => {
    const { message } = App.useApp();
    const [onSaving, setOnSaving] = useState(false);
    const [onCreated, setOnCreated ] = useState(false);

    const onFinish = async (values) => {
        setOnSaving(true);
        await apiInstance.post(apiEndpoint.auth.AddEmployee, values).then((response) => {
            message.success(response.data);
            setOnCreated(true);
        }).catch((error) => {
            message.error(error.response.data.message);
            console.log(error.response.data);
        }).finally(() => {
            setOnSaving(false);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (onCreated == true) {
        return (
            <Result
                title="Successfully Added Employee"
                subTitle="You have successfully added a new employee. Please wait for the employee to verify their account."
                extra={
                    <Button onClick={() => onSave()} type="primary" key="console">
                        Go back to employee list
                    </Button>
                }
            />
        )
    } else {
        return (
            <Form
                name="add_employee"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input the username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button loading={onSaving} type="primary" htmlType="submit">
                        Add Account
                    </Button>
                </Form.Item>
            </Form>
        );
    }


};

export default AddEmployee;