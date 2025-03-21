import React, { useEffect } from 'react';
import { useState } from 'react';
import {App, Button, Flex, Form, Menu, Modal, Switch, Table, Typography, Select, Input, InputNumber, message, Row, Col } from 'antd';
import { EditOutlined, MoreOutlined, PlusCircleOutlined, ReadFilled } from '@ant-design/icons';
import AddMenuItem from './AddMenuItem';
import AddMenuItemCategory from './AddMenuItemCategory';
import apiInstance from '../../../services/api';    
import apiEndpoint from '../../../contants/ApiEndpoints';
import EditMenuItem from './EditMenuItem';
import EditRecipe from './Recipe';

const MenuItem = () => {
    const [menuItemCategories, setMenuItemCategories] = useState([]);
    const [isModalAddMenuItemVisible, setIsModalAddMenuItemVisible] = useState(false);
    const [modalEditMenuItemId, setModalEditMenuItemId] = useState(null);
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false);
    const [modalMenuItemRecipe, setModalMenuItemRecipe] = useState(null);

    const [currentCategory, setCurrentCategory] = useState('all');
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    const [menuItems, setMenuItems] = useState([]);
    const {message} = App.useApp();

    const fetchMenuItemCategories = async () => {
        await apiInstance.get(apiEndpoint.admin.menuItemCategory.getAll).then((response) => {
            setMenuItemCategories(response.data.$values);
        }
        );
    }

    const fetchMenuItems = async () => {
        await apiInstance.get(apiEndpoint.admin.menuItem.getAll).then((response) => {
            setMenuItems(response.data.$values);
            setFilteredMenuItems(response.data.$values);
        });
    }

    const updateAvailability = async (id) => {
        await apiInstance.put(apiEndpoint.admin.menuItem.updateAvailability(id)).then((response) => {  
            fetchMenuItems();
            message.success('Updated successfully');
         }).catch((error) => {
            message.error('Update failed');
         });
    }

    const columns = [
        {
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => <img src={text} alt="Product" style={{ width: 80 }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name), 
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <Typography.Text>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Available',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            render: (text, record) => <Switch checkedChildren="Yes" onChange={ 
                () => updateAvailability(record.id)
             } unCheckedChildren="No" defaultChecked={text} />,
            sorter: (a, b) => a.isAvailable - b.isAvailable,
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type='outlined' onClick={() => setModalMenuItemRecipe(record)}><ReadFilled/></Button> 

                    <Button type="outlined" onClick={() => {setModalEditMenuItemId(record.id)}}>
                        <EditOutlined />
                    </Button>
                </Flex>
            ),
        }
    ];

    const handleChangeCurrentCategory = (category) => {
        setCurrentCategory(category);
        
        if (category === 'all') {
            setFilteredMenuItems(menuItems);
        } else {
            setFilteredMenuItems(menuItems.filter((item) => item.menuItemCategoryId === category));
        }
    };

    const handleSearch = (value) => {
        if (value === '') {
            setFilteredMenuItems(menuItems);
        } else {
            setFilteredMenuItems(menuItems.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
        }
    }

    const showModalAddMenuItem = () => {
        setIsModalAddMenuItemVisible(true);
    };

    const showModalAddCategory = () => {
        setIsModalAddCategoryVisible(true);
    };

    const handleOk = () => {
        setIsModalAddMenuItemVisible(false);
        setModalEditMenuItemId(null);
        setIsModalAddCategoryVisible(false);

        fetchMenuItems();
    };

    const handleCancel = () => {
        setIsModalAddMenuItemVisible(false);
        setModalEditMenuItemId(null);
        setIsModalAddCategoryVisible(false);
        setModalMenuItemRecipe(null);
    };

    useEffect(() => {
        fetchMenuItemCategories();
        fetchMenuItems();
    }, []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Menu Item</Typography.Title>
                    <Button size='large' type="primary" onClick={showModalAddMenuItem}><PlusCircleOutlined/>Add Item</Button>
                </Flex>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Input.Search onSearch={(value)=>handleSearch(value)} placeholder="Search menu items" />
                </Row>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Col span={18}>
                    <Menu 
                        defaultSelectedKeys={['all']}
                        wrap={true}
                        onClick={(e) => handleChangeCurrentCategory(e.key)}
                        selectedKeys={[currentCategory]}
                        mode="horizontal"
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <Menu.Item key="all">All</Menu.Item>
                        {menuItemCategories.map((category) => (
                            <Menu.Item key={category.id}>{category.name}</Menu.Item>
                        ))}
                    </Menu>
                    </Col>
                    <Col span={6}>
                    <Button type="default" onClick={showModalAddCategory} >Add Category</Button>
                    </Col>  
                    
                    
                </Row>

                <Table
                    scroll={{ y: '60vh' }}
                    sticky={true}
                    style={{ width: '100%' }}
                    dataSource={filteredMenuItems}
                    columns={columns}
                    pagination={{}} />
            </Flex>
            <Modal title="Add New Menu Item" open={isModalAddMenuItemVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <AddMenuItem onSave={handleOk} />
            </Modal>
            {
                modalEditMenuItemId!=null && <Modal title="Edit Menu Item" open={modalEditMenuItemId!=null} footer={null} onCancel={handleCancel}>
                    <EditMenuItem id={modalEditMenuItemId} onSave={handleOk} />
                </Modal>
            }
            <Modal title="Add New Category" open={isModalAddCategoryVisible} footer={null} onCancel={handleCancel}>
                <AddMenuItemCategory onSave={handleOk} />
            </Modal>
            <Modal title="Recipe" open={modalMenuItemRecipe!=null} width={600} footer={null} onCancel={handleCancel} >
                <EditRecipe menuItem={modalMenuItemRecipe} />
            </Modal>
        </>
    );
};

export default MenuItem;