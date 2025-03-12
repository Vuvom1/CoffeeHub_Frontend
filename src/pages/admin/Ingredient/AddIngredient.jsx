import React, { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, Switch, Button, Upload, message, App } from 'antd';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import { UnitOfMeasurements} from '../../../contants/UnitOfMeasurements';

const { Option } = Select;

const AddIngredient = ({ onSave }) => {
    const [file, setFile] = useState(null);
    const [ingredientCategories, setIngredientCategories] = useState([]);
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

            const newIngredientData = {
                ...values,
                imageUrl,
            };

            const response = await apiInstance.post(apiEndpoints.admin.ingredient.add, newIngredientData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            message.success(response.data);
            onSave();
        }
        catch (error) {
            message.error('Add ingredient failed');
            console.log(error);
        }
        setOnCreating(false);
        onSave();
    };

    const fetchIngredientCategories = async () => {
        await apiInstance.get(apiEndpoints.admin.ingredientCategory.getAll).then((response) => {
            setIngredientCategories(response.data.$values);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchIngredientCategories();
    }
        , []);

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            name="addIngredient"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="Name"
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
                name="Image"
                rules={[{ required: true, message: 'Please input the image of the ingredient!' }]}
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
                rules={[{ required: true, message: 'Please input the description of the ingredient!' }]}
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

export default AddIngredient;