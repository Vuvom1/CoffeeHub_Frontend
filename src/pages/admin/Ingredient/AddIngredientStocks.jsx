import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Skeleton, Typography, message, App } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';

const AddIngredientStocks = ({ ingredientIds }) => {
    const [ingredientStocks, setIngredientStocks] = useState([]);
    const [message] = App.useApp();
    const [onSaving, setOnSaving] = useState(false);

    const fetchIngredientById = async () => {
        await apiInstance.get(apiEndpoints.admin.ingredient.getByIds(ingredientIds)).then((response) => {
            setIngredientStocks(response.data.$values);
        }).catch((error) => {
            console.log(error.response);
        });
    };

    const onFinish = async (values) => {
        setOnSaving(true);
        await apiInstance.post(apiEndpoints.admin.ingredient.add, values).then((response) => {
            message.success("Ingredient stock added successfully");
        }
        ).catch((error) => {
            console.log("Error", error.response);
            message.error(error.response.data);
        })
        .finally(() => {
            setOnSaving(false);
        });
    };

    useEffect(() => {
        fetchIngredientById();
    }, [ingredientIds]);

    if (ingredientStocks.length === 0) {
        return <Skeleton active />;
    }

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="ingredients" initialValue={ingredientStocks}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => {
                            const ingredient = ingredientStocks.find((ingredient) => ingredient.id === restField.key);
                            return (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'id']}
                                        // fieldKey={[fieldKey, 'id']}
                                        initialValue={ingredient?.id}
                                        hidden
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        initialValue={ingredient?.name}
                                        hidden
                                    >
                                        <Typography.Text>{ingredient?.name}</Typography.Text>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        // fieldKey={[fieldKey, 'quantity']}
                                        rules={[{ required: true, message: 'Missing quantity' }]}
                                    >
                                        <Input placeholder="Quantity" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            );
                        })}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Ingredient
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddIngredientStocks;