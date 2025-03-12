import React, { useState, useEffect, useRef } from 'react';
import apiInstance from '../../../services/api';
import apiEndpoint from '../../../contants/ApiEndpoints';
import { Form, Input, Button, Select, message, Skeleton, Divider, Space, Typography, Flex, Row, Image, Col, Descriptions, App } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const EditRecipe = ({ menuItem }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [onSaving, setOnSaving] = useState(false);

    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [name, setName] = useState('');

    const { message } = App.useApp();
    const inputRef = useRef(null);

    const fetchRecipesByMenuItemId = async () => {
        setLoading(true);
        await apiInstance.get(apiEndpoint.admin.recipe.getByMenuItemId(menuItem.id)).then((response) => {
            setRecipes(response.data.$values);
            form.setFieldsValue({ recipes: response.data.$values });
        }).catch((e) => {
            message.error('Fetch recipe failed');
        }).finally(() => {  
            setLoading(false);
        }
        );
    };

    const fetchIngredients = async () => {
        await apiInstance.get(apiEndpoint.admin.ingredient.getAll).then((response) => {
            setIngredients(response.data.$values);
        });
    }

    const onFinish = async (values) => {
        setOnSaving(true);
        await apiInstance.put(apiEndpoint.admin.recipe.updateByMenuItemId(menuItem.id), values.recipes).then((response) => {
            message.success(response.data);
            fetchRecipesByMenuItemId();
            form.resetFields();
        }).catch((e) => {
            message.error('Create recipe failed');
            console.log(e.response);
        }).finally(() => {
            setOnSaving(false);
        });
    };

    useEffect(() => {
        fetchRecipesByMenuItemId();
        fetchIngredients();
    }, []);

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${items.length + 1}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleIngredientChange = (value) => {
        const ingredient = ingredients.find((item) => item.id === value);
        setSelectedIngredient(ingredient);
    };

    if (!recipes) {
        return <Skeleton active />;
    }

    return (
        <Flex vertical gap="20px" >
            <Row align="start">
                <Col>
                    <Image src={menuItem.imageUrl} alt={menuItem.name} width={150} />
                </Col >
                <Col style={{ marginLeft: 16 }} span={14}>
                    <Typography.Title level={5}>{menuItem.name}</Typography.Title>
                    <Descriptions column={1}>
                        <Descriptions.Item label="Price">
                            {menuItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">{menuItem.description}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <Col>
                <Typography.Title level={5}>Edit Recipe</Typography.Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ recipes: recipes }}>
                        <Form.Item
                            name="recipes"
                            label="Recipes"
                            rules={[{ required: true, message: 'Please enter recipe name!' }]}
                        >
                    <Form.List name="recipes">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'ingredientId']}
                                            rules={[{ required: true, message: 'Please select ingredient!' }]}
                                        >
                                            <Select
                                                style={{ width: 250 }}
                                                placeholder="Select ingredient"
                                                showSearch
                                                onChange={handleIngredientChange}
                                                dropdownRender={(menu) => (
                                                    <>
                                                        {menu}
                                                        <Divider style={{ margin: '8px 0' }} />
                                                        <Space style={{ padding: '0 8px 4px' }}>
                                                            <Input
                                                                placeholder="Please enter item"
                                                                ref={inputRef}
                                                                value={name}
                                                                onChange={onNameChange}
                                                                onKeyDown={(e) => e.stopPropagation()}
                                                            />
                                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                                Add item
                                                            </Button>
                                                        </Space>
                                                    </>
                                                )}
                                                options={ingredients.map((item) => ({ label: item.name, value: item.id }))}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            rules={[{ required: true, message: 'Missing quantity' }]}
                                        >
                                            <Input placeholder="Quantity" />
                                        </Form.Item>
                                        <Typography.Text>{selectedIngredient?.unitOfMeasurement}</Typography.Text>
                                        <Button type="link" onClick={() => remove(name)}>
                                            <MinusCircleOutlined />
                                        </Button>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Ingredient
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={onSaving}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Flex>
    );
};

export default EditRecipe;