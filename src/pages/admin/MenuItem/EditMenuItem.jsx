import React, { use, useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, Upload, message, App, Skeleton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';

const { Option } = Select;

const EditMenuItem = ({ id, onSave, onCancel }) => {
    const [file, setFile] = useState(null);
    const [menuItemCategories, setMenuItemCategories] = useState([]);
    const [menuItem, setMenuItem] = useState(null);
    const [onUpdating, setOnUpdating] = useState(false);
    const [onFetching, setOnFetching] = useState(false);    
    const [form] = Form.useForm();

    const { message } = App.useApp();

    const fetchMenuItem = async () => {
        setOnFetching(true);
        try {
            const response = await apiInstance.get(apiEndpoints.admin.menuItem.getById(id));
            setMenuItem(response.data);
            setFile(response.data.imageUrl);
            form.setFieldsValue(response.data);
        } catch (error) {
            message.error('Failed to fetch menu item data');
        } finally {
            setOnFetching(false);
        }
    };

    const onFinish = async (values) => {
        if (onUpdating) {
            return;
        }
        setOnUpdating(true);
        try {
            let imageUrl = menuItem.imageUrl;
            if (file && file instanceof File) {
                const formData = new FormData();
                formData.append('imageFile', file);
                formData.append('imageUrl', menuItem.imageUrl);
                const uploadResponse = await apiInstance.post(apiEndpoints.admin.image.edit, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = uploadResponse.data;
            }

            const updatedItemData = {
                ...values,
                imageUrl,
            };

            const response = await apiInstance.put(apiEndpoints.admin.menuItem.update(id), updatedItemData);
            message.success(response.data);
            onSave();
        } catch (error) {
            message.error('Update menu item failed');
            console.error(error);   
        } finally {
            setOnUpdating(false);
        }
    };

    const fetchMenuItemCategories = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.menuItemCategory.getAll);
            setMenuItemCategories(response.data.$values);
        } catch (error) {
            message.error('Failed to fetch menu item categories');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchMenuItemCategories();
        fetchMenuItem();
    }, []);

    useEffect(() => {   
        form.setFieldsValue(menuItem);
    }, [id]);

    if (!menuItem || onFetching) {
        return <Skeleton active />;
    }

    return (
        <Form
            form={form}
            initialValues={menuItem}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            name="editMenuItem"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
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
                name="price"
                rules={[{ required: true, message: 'Please input the price of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <InputNumber style={{ width: '100%' }} placeholder="Enter Price" />
            </Form.Item>
            <Form.Item
                label="Available"
                name="isAvailable"
                valuePropName="checked"
                style={{ marginBottom: 16 }}
            >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please upload the image of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <Upload
                    beforeUpload={(file) => {
                        setFile(file);
                        return false;
                    }}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description of the item!' }]}
                style={{ marginBottom: 16 }}
            >
                <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
                <Button loading={onUpdating} type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditMenuItem;