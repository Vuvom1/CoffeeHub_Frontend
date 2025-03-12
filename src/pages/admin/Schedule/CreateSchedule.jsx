import React from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button } from 'antd';

const { Option } = Select;

const CreateSchedule = ({ onSave }) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            name="createSchedule"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title of the schedule!' }]}
                style={{ marginBottom: 16 }}
            >
                <Input placeholder="Enter Title" />
            </Form.Item>
            <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select the date of the schedule!' }]}
                style={{ marginBottom: 16 }}
            >
                <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
            </Form.Item>
            <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: 'Please select the time of the schedule!' }]}
                style={{ marginBottom: 16 }}
            >
                <TimePicker style={{ width: '100%' }} placeholder="Select Time" />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description of the schedule!' }]}
                style={{ marginBottom: 16 }}
            >
                <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
        </Form>
    );
};

export default CreateSchedule;
