import React, { useEffect, useState } from 'react';
import { App, Button, Flex, Tabs, Menu, Modal, Switch, Table, Typography, Select, Image, Row, Col, Input } from 'antd';
import { EditOutlined, ImportOutlined, SettingOutlined, MoreOutlined, PlusCircleOutlined } from '@ant-design/icons';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import AddIngredientCategory from './AddIngredientCategory';
import AddIngredient from './AddIngredient';
import EditIngredient from './EditIngredient';
import AddIngredientStocks from './AddIngredientStocks';
import AddIngredientStock from './AddIngredientStock';
import IngredientStock from './IngredientStock';

const { TabPane } = Tabs;

const Ingredient = () => {
    const [ingredientCategories, setIngredientCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [isModalAddIngredientVisible, setIsModalAddIngredientVisible] = useState(false);
    const [modalEditIngredientId, setEditIngredientId] = useState(null);
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false);
    const [modalAddIngredientStockId, setModalAddIngredientStockId] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const { message } = App.useApp();

    const [loadingIngredients, setLoadingIngredients] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const columns = [
        {
            key: 'imageUrl',
            dataIndex: 'imageUrl',
            render: (text) => <Image src={text} style={{ width: 50, height: 50 }} />
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'ingredientCategoryName',
            title: 'Category',
            dataIndex: 'ingredientCategoryName',
            sorter: (a, b) => a.ingredientCategoryName.localeCompare(b.ingredientCategoryName),
        },
        {
            key: 'totalQuantity',
            title: 'In Stock',
            dataIndex: 'totalQuantity',
            sorter: (a, b) => a.totalQuantity - b.totalQuantity,
        },
        {
            key: 'unitOfMeasurement',
            title: 'Unit',
            dataIndex: 'unitOfMeasurement',
            sorter: (a, b) => a.unitOfMeasurement.localeCompare(b.unitOfMeasurement),
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="outlined" onClick={() => { setEditIngredientId(record.id) }}>
                        <EditOutlined />
                    </Button>
                    <Button type="outlined" onClick={() => { setModalAddIngredientStockId(record.id) }}>
                        <ImportOutlined />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchIngredientCategories = async () => {
        setLoadingCategories(true);
        await apiInstance.get(apiEndpoints.admin.ingredientCategory.getAll).then((response) => {
            setIngredientCategories(response.data.$values);
        }).catch((error) => {
            message.error('Failed to fetch ingredient categories');
        }).finally(() => {  
            setLoadingCategories(false);
        });
    }

    const fetchIngredients = async () => {
        setLoadingIngredients(true);
        await apiInstance.get(apiEndpoints.admin.ingredient.getAll).then((response) => {
            setIngredients(response.data.$values);
            setFilteredIngredients(response.data.$values);
        }).catch((error) => {
            message.error('Failed to fetch ingredients');
        }).finally(() => {
            setLoadingIngredients(false);
        });
    }

    // const openIngredientImport = () => {
    //     setIsModalAddIngredientVisible(true);
    //     console.log(selectedIngredients);
    // };

    const rowSelection = {
        selectedIngredients,
        onChange: (newSelectedRowKeys, selectedRow) => {
            setSelectedIngredients(selectedRow.map((ingredient) => ingredient.id));
        },
    };

    const hasSelected = selectedIngredients.length > 0;

    const handleSelectCategory = (e) => {
        setCurrentCategory(e.key);
        filterIngredients(e.key, searchValue);
    };

    const handleSearch = (value) => {
        setSearchValue(value);
        filterIngredients(currentCategory, value);
    };

    const filterIngredients = (category, search) => {
        let filtered = ingredients;

        if (category !== 'all') {
            filtered = filtered.filter((ingredient) => ingredient.ingredientCategoryId === category);
        }

        if (search) {
            filtered = filtered.filter((ingredient) => ingredient.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredIngredients(filtered);
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

        fetchIngredientCategories();
        fetchIngredients();
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
    }, []);

    return (
        <>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Ingredients" key="1">
                    <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Ingredients</Typography.Title>
                            <Flex gap={10}>
                                {/* <Button type="primary" disabled={!hasSelected} onClick={openIngredientImport}>
                                    Import ingredients
                                </Button> */}
                                <Button size='large' type="primary" onClick={showModalAddIngredient}><PlusCircleOutlined/> Ingredient</Button>
                            </Flex>
                        </Flex>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Col span={18}>
                                <Input.Search onSearch={handleSearch} placeholder="Search ingredients" />
                            </Col>
                            <Col span={6}>
                                
                            </Col>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Col span={18}>
                            <Menu 
                                loading={loadingCategories}
                                defaultSelectedKey={"all"}
                                wrap={true}
                                onClick={handleSelectCategory}
                                selectedKeys={[currentCategory]}
                                mode="horizontal"
                                style={{ justifyContent: 'flex-start' }}
                            >
                                <Menu.Item key="all">All</Menu.Item>
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
                            </Col>
                            <Col span={6} style={{ textAlign: 'end' }}>
                            <Button type="default" onClick={showModalAddCategory} ><PlusCircleOutlined/>Category</Button>
                            </Col>
                        </Row>
                    </Flex>
                    <Table
                        loading={loadingIngredients}
                        rowSelection={rowSelection}
                        scroll={{ y: '60vh' }}
                        sticky={true}
                        style={{ width: '100%' }}
                        dataSource={filteredIngredients}
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
