import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Typography, Flex, DatePicker, message, App } from 'antd';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';

const AddIngredientStock = ({ingredientId, onSave}) => {
    const [ingredient, setIngredient] = useState(null);
    const [onSaving, setOnSaving] = useState(false);
    const {message} = App.useApp();

    const fetchIngredientById = async () => {
        await apiInstance.get(apiEndpoints.admin.ingredient.getById(ingredientId)).then((response) => {
            setIngredient(response.data);
        }).catch((error) => {
            console.log(error.response);
        });
    }

    const onFinish = async (values) => {
        setOnSaving(true);

        values.ingredientId = ingredientId;

        await apiInstance.post(apiEndpoints.admin.ingredientStock.add, values).then((response) => {
            message.success(response.data);
            onSave();
        }
        ).catch((error) => {
            console.log(error.response);
        }).finally(() => {
            setOnSaving(false);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchIngredientById();
    }
    , [ingredientId]);

    return (
        <Form
            name="add_ingredient_stock"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Ingredient Name"
                name="ingredientName"
            >
                <Typography.Text>{ingredient?.name}</Typography.Text>
            </Form.Item>
            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please input the quantity!' }]}
            >
                <Flex gap={8} align='center'>
                    <InputNumber min={1} />
                    <Typography.Text>{ingredient?.unitOfMeasurement}</Typography.Text>
                </Flex>
               
            </Form.Item>
            <Form.Item
                label="Price"
                name="costPrice"
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <Flex align='center' gap={8}>
                    <InputNumber min={0} />
                    <Typography.Text>VND</Typography.Text>
                </Flex>
            </Form.Item>
            <Form.Item
                label="Manufactured Date"
                name="manufacturedDate"
                rules={[{ required: true, message: 'Please input the manufactured date!' }]}
            >
                <DatePicker type="date" />
            </Form.Item>
            <Form.Item 
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: 'Please input the expiry date!' }]}
            >
                <DatePicker type="date" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Add Stock
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddIngredientStock;