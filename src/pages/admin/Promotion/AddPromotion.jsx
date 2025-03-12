import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, message, App, DatePicker, Flex, Row, Col } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import customerLevel from '../../../contants/CustomerLevel';

const { Option } = Select;

const AddPromotion = ({ onSave }) => {
    const [promotionCategories, setPromotionCategories] = useState([]);
    const [onCreating, setOnCreating] = useState(false);

    const { message } = App.useApp();

    const onFinish = async (values) => {
        if (onCreating) {
            return;
        }
        setOnCreating(true);
        try {
            const response = await apiInstance.post(apiEndpoints.admin.promotion.add, values);
            message.success(response.data);
            onSave();
        }
        catch (error) {
            message.error('Add promotion failed');
            console.log(error);
        }
        setOnCreating(false);
        onSave();
    };

    const fetchPromotionCategories = async () => {
        await apiInstance.get(apiEndpoints.admin.promotionCategory.getAll).then((response) => {
            setPromotionCategories(response.data.$values);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchPromotionCategories();
    }
        , []);

    return (
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="addPromotion"
            layout='horizontal'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{ required: true, message: 'Please input the name of the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input placeholder="Enter Name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Code"
                        name="Code"
                        rules={[{ required: true, message: 'Please input the code of the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input placeholder="Enter Code" />
                    </Form.Item>
                </Col>
            </Row>
    
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Start Date"
                        name="StartDate"
                        rules={[{ required: true, message: 'Please input the start date of the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <DatePicker type="date" placeholder="Enter Start Date" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="End Date"
                        name="EndDate"
                        rules={[{ required: true, message: 'Please input the end date of the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <DatePicker type="date" placeholder="Enter End Date" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
            <Form.Item
                label="Discount Rate"
                name="DiscountRate"
                rules={[{ required: true, message: 'Please input the discount of the promotion!' }]}
                style={{ marginBottom: 16 }}
            >
                <Flex gap={8} align="center">
                    <InputNumber style={{ width: '100%' }} placeholder="Enter Discount Rate" />
                    <span>%</span>
                </Flex>
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                label="Ussage Limit"
                name="UssageLimit"
                rules={[{ required: true, message: 'Please input the ussage limit of the promotion!' }]}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter Ussage Limit" />
            </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Min Purchase Amount"
                        name="MinPurchaseAmount"
                        rules={[{ required: true, message: 'Please input the minimum purchase amount for the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter Min Purchase Amount" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Max Discount Amount"
                        name="MaxDiscountAmount"
                        rules={[{ required: true, message: 'Please input the maximum discount value for the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter Max Discount Value" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Customer Level"
                name="CustomerLevel"
                rules={[{ required: true, message: 'Please input the customer level of the promotion!' }]}
                style={{ marginBottom: 16 }}
            >
                <Select placeholder="Select Customer Level">
                    {Object.values(customerLevel).map((level) => (
                        <Option key={level} value={level}>{level}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Active"
                name="Active"
                valuePropName="checked"
                style={{ marginBottom: 16 }}
            >
                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="Description"
                style={{ marginBottom: 16 }}
            >
                <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
            <Form.Item style={{marginTop: 16}} wrapperCol={{ span: 24 }}>
                <Button loading={onCreating} type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddPromotion;
