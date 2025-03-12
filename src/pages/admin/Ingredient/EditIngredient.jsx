import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, Upload, message, App, Skeleton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import { UnitOfMeasurements } from '../../../contants/UnitOfMeasurements';

const { Option } = Select;

const EditIngredient = ({ id, onSave, onCancel }) => {
    const [file, setFile] = useState(null);
    const [ingredientCategories, setIngredientCategories] = useState([]);
    const [ingredient, setIngredient] = useState(null);
    const [onUpdating, setOnUpdating] = useState(false);
    const [onFetching, setOnFetching] = useState(false);
    const [form] = Form.useForm();

    const { message } = App.useApp();

    const fetchIngredient = async () => {
        setOnFetching(true);
        try {
            const response = await apiInstance.get(apiEndpoints.admin.ingredient.getById(id));
            setIngredient(response.data);
            setFile(response.data.imageUrl);
            form.setFieldsValue(response.data);
        } catch (error) {
            message.error('Failed to fetch ingredient data');
            console.error(error);
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
            let imageUrl = ingredient.imageUrl;
            if (file && file instanceof File) {
                const formData = new FormData();
                formData.append('imageFile', file);
                formData.append('imageUrl', ingredient.imageUrl);
                const uploadResponse = await apiInstance.post(apiEndpoints.admin.image.edit, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = uploadResponse.data;
            }

            const updatedIngredientData = {
                ...values,
                imageUrl,
            };

            const response = await apiInstance.put(apiEndpoints.admin.ingredient.update(id), updatedIngredientData);
            message.success(response.data);
            onSave();
        } catch (error) {
            message.error('Update ingredient failed');
            console.error(error);
        } finally {
            setOnUpdating(false);
        }
    };

    const fetchIngredientCategories = async () => {
        try {
            const response = await apiInstance.get(apiEndpoints.admin.ingredientCategory.getAll);
            setIngredientCategories(response.data.$values);
        } catch (error) {
            message.error('Failed to fetch ingredient categories');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchIngredientCategories();
        fetchIngredient();
    }, []);

    useEffect(() => {
        form.setFieldsValue(ingredient);
    }, [id]);

    if (!ingredient || onFetching) {
        return <Skeleton active />;
    }

    return (
        <Form
            form={form}
            initialValues={ingredient}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            name="editIngredient"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name of the ingredient!' }]}
                style={{ marginBottom: 16 }}
            >
                <Input placeholder="Enter Name" />
            </Form.Item>
            <Form.Item
                label="Category"
                name="ingredientCategoryId"
                rules={[{ required: true, message: 'Please select the category of the ingredient!' }]}
                style={{ marginBottom: 16 }}
            >
                <Select placeholder="Enter Category">
                    {ingredientCategories.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Unit of Measurement"
                name="unitOfMeasurement"
                rules={[{ required: true, message: 'Please input the unit of measurement!' }]}
                style={{ marginBottom: 16 }}
            >
                <Select placeholder="Enter Unit">
                    {Object.values(UnitOfMeasurements).map((unit) => (
                        <Option key={unit} value={unit}>
                            {unit}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please upload the image of the ingredient!' }]}
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
                rules={[{ required: true, message: 'Please input the description of the ingredient!' }]}
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

export default EditIngredient;