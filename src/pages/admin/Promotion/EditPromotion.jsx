import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, message, App, DatePicker, Flex, Row, Col, Skeleton } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import customerLevel from '../../../contants/CustomerLevel';
import moment from 'moment';

const { Option } = Select;

const EditPromotion = ({promotionId, onSave }) => {
    const [onUpdating, setOnUpdating] = useState(false);
    const [promotion, setPromotion] = useState(null);

    const { message } = App.useApp();

    const fetchPromotion = async () => {
        response = await apiInstance.get(apiEndpoints.admin.promotion.getById(promotionId)).then((response) => {
            setPromotion({
                ...response.data,
                startDate: moment(response.data.startDate),
                endDate: moment(response.data.endDate)
            });
            console.log(response.data);
        }
        ).catch((error) => {
            message.error(error.response.data);
        }
        );
    }

    const onFinish = async (values) => {
        setOnUpdating(true);
        await apiInstance.put(apiEndpoints.admin.promotion.update(promotionId), values).then((response) => {
            setOnUpdating(false);
            message.success(response.data);
            onSave();
        }).catch((error) => {
            setOnUpdating(false);
            message.error(error.response.data);
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchPromotion();
    }
    , []);

    if (!promotion) {
        return <Skeleton active />
    }

    return (
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="addPromotion"
            layout='horizontal'
            initialValues={promotion}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name of the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input placeholder="Enter Name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Code"
                        name="code"
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
                        name="startDate"
                        rules={[{ required: true, message: 'Please input the start date of the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <DatePicker type="date" placeholder="Enter Start Date" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="End Date"
                        name="endDate"
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
                name="discountRate"
                rules={[{ required: true, message: 'Please input the discount of the promotion!' }]}
                style={{ marginBottom: 16 }}
            >
                   <InputNumber style={{ width: '100%' }} placeholder="Enter Discount Rate" />       
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                label="Ussage Limit"
                name="ussageLimit"
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
                        name="minPurchaseAmount"
                        rules={[{ required: true, message: 'Please input the minimum purchase amount for the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter Min Purchase Amount" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Max Discount Amount"
                        name="maxDiscountAmount"
                        rules={[{ required: true, message: 'Please input the maximum discount value for the promotion!' }]}
                        style={{ marginBottom: 16 }}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="Enter Max Discount Value" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Customer Level"
                name="customerLevel"
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
                name="isActive"
                valuePropName="checked"
                style={{ marginBottom: 16 }}
            >
                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                style={{ marginBottom: 16 }}
            >
                <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
            <Form.Item style={{marginTop: 16}} wrapperCol={{ span: 24 }}>
                <Button loading={onUpdating} type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditPromotion;
