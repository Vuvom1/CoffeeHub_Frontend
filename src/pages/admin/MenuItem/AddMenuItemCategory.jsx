import React, { useState } from 'react';
import { Form, Input, Button, message, App } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoint from '../../../contants/ApiEndpoints';

const AddMenuItemCategory = ({onSave}) => {
    const {message} = App.useApp();
    const [onSaving, setOnSaving] = useState(false);

    const onFinish = async (values) => {
        setOnSaving(true);
        const response = await apiInstance.post(apiEndpoint.admin.menuItemCategory.add, values).then((response) => {
            message.success(response.data);
            onSave();
        }
        ).catch((error) => {
            message.error(error.response.data.message);
        }
        ).finally(() => {
            setOnSaving(false);
        }
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="add_category"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
        >
            <Form.Item
                label="Category Name"
                name="name"
                rules={[{ required: true, message: 'Please input the category name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button loading={onSaving} type="primary" htmlType="submit">
                    Add Category
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddMenuItemCategory;