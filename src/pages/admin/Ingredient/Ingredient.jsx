import React, { useEffect } from 'react';
import { useState } from 'react';
import { App, Button, Flex, Tabs, Menu, Modal, Switch, Table, Typography, Select, Image } from 'antd';
import { ImportOutlined, SettingOutlined } from '@ant-design/icons';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import AddIngredientCategory from './AddIngredientCategory';
import AddIngredient from './AddIngredient';
import EditIngredient from './EditIngredient';
import { MoreOutlined } from '@ant-design/icons';
import AddIngredientStocks from './AddIngredientStocks';
import AddIngredientStock from './AddIngredientStock';
import IngredientStock from './IngredientStock';

const { TabPane } = Tabs;

const Ingredient = () => {
    const [ingredientCategories, setIngredientCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalAddIngredientVisible, setIsModalAddIngredientVisible] = useState(false);
    const [modalEditIngredientId, setEditIngredientId] = useState(null);
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false);
    const [modalAddIngredientStockId, setModalAddIngredientStockId] = useState(null);

    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [current, setCurrent] = useState('mail');
    const { message } = App.useApp();

    const columns = [
        // {
        //     key: 'id',
        //     dataIndex: 'id',
        //     title: 'ID',
        // },
        {
            key: 'imageUrl',
            dataIndex: 'imageUrl',
            render: (text) => <Image src={text} style={{ width: 50, height: 50 }} />
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'ingredientCategoryName',
            title: 'Category',
            dataIndex: 'ingredientCategoryName',
        },
        {
            key: 'totalQuantity',
            title: 'In Stock',
            dataIndex: 'totalQuantity'
        },
        {
            key: 'unitOfMeasurement',
            title: 'Unit',
            dataIndex: 'unitOfMeasurement',
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link" onClick={() => { setEditIngredientId(record.id) }}>
                        <MoreOutlined />
                    </Button>
                    <Button type="link" onClick={() => { setModalAddIngredientStockId(record.id) }}>
                        <ImportOutlined />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchIngredientCategories = async () => {
        await apiInstance.get(apiEndpoints.admin.ingredientCategory.getAll).then((response) => {
            setIngredientCategories(response.data.$values);
        }
        ).catch((error) => {
            message.error('Failed to fetch ingredient categories');
        });
    }

    const fetchIngredients = async () => {
        await apiInstance.get(apiEndpoints.admin.ingredient.getAll).then((response) => {
            setIngredients(response.data.$values);
        }
        ).catch((error) => {
            message.error('Failed to fetch ingredients');
        });
    }

    const openIngredientImport = () => {

        setIsModalAddIngredientStockVisible(true);
        console.log(selectedIngredients);
        // ajax request after empty completing
        // setTimeout(() => {
        //     setSelectedIngredients([]);
        //     setLoading(false);
        // }, 1000);

    };

    const rowSelection = {
        selectedIngredients,
        onChange: (newSelectedRowKeys, selectedRow) => {
            setSelectedIngredients(selectedRow.map((ingredient) => ingredient.id));
        },
    };

    const hasSelected = selectedIngredients.length > 0;

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const showModalAddIngredient = () => {
        setIsModalAddIngredientVisible(true);
    };

    const showModalAddCategory = () => {
        setIsModalAddCategoryVisible(true);
    };

    const handleOk = () => {
        setIsModalAddIngredientVisible(false);
        setEditIngredientId(null);
        setIsModalAddCategoryVisible(false);
        setModalAddIngredientStockId(null);
    };

    const handleCancel = () => {
        setIsModalAddIngredientVisible(false);
        setEditIngredientId(null);
        setIsModalAddCategoryVisible(false);
        setModalAddIngredientStockId(null);
    };

    useEffect(() => {
        fetchIngredientCategories();
        fetchIngredients();
    }
        , []);

    return (
        <>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Ingredients" key="1">
                    <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Ingredients</Typography.Title>
                            <Flex gap={10}>
                                <Button type="primary" disabled={!hasSelected} onClick={openIngredientImport} loading={loading}>
                                    Import ingredients
                                </Button>
                                <Button type="primary" onClick={showModalAddIngredient}>Add Ingredient</Button>
                            </Flex>
                        </Flex>
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Menu
                                onClick={handleClick}
                                selectedKeys={[current]}
                                mode="horizontal"
                                style={{ justifyContent: 'flex-start' }}
                            >
                                {
                                    ingredientCategories.map((category) => {
                                        return (
                                            <Menu.Item key={category.id}>
                                                {category.name}
                                            </Menu.Item>
                                        );
                                    })
                                }
                            </Menu>
                            <Button type="default" onClick={showModalAddCategory} >Add Category</Button>
                        </Flex>
                    </Flex>
                    <Table
                        rowSelection={rowSelection}
                        scroll={{ y: '60vh' }}
                        sticky={true}
                        style={{ width: '100%' }}
                        dataSource={ingredients}
                        columns={columns}
                        pagination={{}} />

                    <Modal title="Add New Ingredient" footer={null} open={isModalAddIngredientVisible} onOk={handleOk} onCancel={handleCancel}>
                        <AddIngredient onSave={handleOk} />
                    </Modal>
                    {
                        modalEditIngredientId && (
                            <Modal title="Edit Ingredient" open={modalEditIngredientId} footer={null} onOk={handleOk} onCancel={handleCancel}>
                                <EditIngredient id={modalEditIngredientId} onSave={handleOk} />
                            </Modal>
                        )
                    }
                    <Modal title="Add New Category" footer={null} open={isModalAddCategoryVisible} onOk={handleOk} onCancel={handleCancel}>
                        <AddIngredientCategory onSave={handleOk} />
                    </Modal>
                    <Modal title="Import ingredients" footer={null} open={modalAddIngredientStockId} onOk={handleOk} onCancel={handleCancel}>
                        <AddIngredientStock onSave={handleOk} ingredientId={modalAddIngredientStockId} />
                    </Modal>
                </TabPane>
                <TabPane tab="Stocks" key="2">
                    <IngredientStock />
                </TabPane>
            </Tabs>
        </>
    );
};

export default Ingredient;
