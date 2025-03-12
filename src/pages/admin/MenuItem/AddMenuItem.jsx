import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, Upload, message, App } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';

const { Option } = Select;

const AddMenuItem = ({ onSave }) => {
    const [file, setFile] = useState(null);
    const [menuItemCategories, setMenuItemCategories] = useState([]);
    const [onCreating, setOnCreating] = useState(false);
   
    const { message } = App.useApp();

    const onFinish = async (values) => {
        if (!file) {
            message.error('Please upload an image');
            return;
        }
        if (onCreating) {
            return;
        }
        setOnCreating(true);
        try {
            const formData = new FormData();
            formData.append('imageFile', file);
            const uploadResponse = await apiInstance.post(apiEndpoints.admin.image.upload, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imageUrl = uploadResponse.data; 

            const newItemData = {
                ...values,
                imageUrl,
            };

            const response = await apiInstance.post(apiEndpoints.admin.menuItem.add, newItemData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success('Add menu item successfully');
            onSave();
        }
        catch (error) {
            message.error('Add menu item failed');
        }
        setOnCreating(false);
        onSave();
    };

    const fetchMenuItemCategories = async () => {
        await apiInstance.get(apiEndpoints.admin.menuItemCategory.getAll).then((response) => {
            setMenuItemCategories(response.data.$values);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchMenuItemCategories();
    }
        , []);

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            name="addMenuItem"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="Name"
                rules={[{ required: true, message: 'Please input the name of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <Input placeholder="Enter Name" />
            </Form.Item>
            <Form.Item
                label="Category"
                name="menuItemCategoryId"
                rules={[{ required: true, message: 'Please select the category of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <Select placeholder="Enter Category">
                    {menuItemCategories.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Price"
                name="Price"
                rules={[{ required: true, message: 'Please input the price of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter Price" />
            </Form.Item>
            <Form.Item
                label="Available"
                name="Available"
                valuePropName="checked"
                style={{ marginBottom: 16 }}
            >
                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={false} />
            </Form.Item>
            <Form.Item
                label="Image"
                name="Image"
                rules={[{ required: true, message: 'Please input the image of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <Upload beforeUpload={(file) => {
                    setFile(file);
                    return false;
                }}
                >
                    <Button>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="Description"
                name="Description"
                rules={[{ required: true, message: 'Please input the description of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
                <Button loading={onCreating} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddMenuItem;