import React, { useState } from 'react';
import { Button, Flex, Menu, Modal, Switch, Table, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
// import AddIngredient from './AddIngredient';
// import AddIngredientCategory from './AddIngredientCategory';

const { SubMenu } = Menu;

const dataSource = [
    {
        key: '1',
        name: 'Sugar',
        category: 'Sweetener',
        quantity: '10kg',
    },
    {
        key: '2',
        name: 'Milk',
        category: 'Dairy',
        quantity: '20L',
    },
    {
        key: '3',
        name: 'Coffee Beans',
        category: 'Coffee',
        quantity: '50kg',
    },
    {
        key: '4',
        name: 'Green Tea Leaves',
        category: 'Tea',
        quantity: '15kg',
    },
    {
        key: '5',
        name: 'Black Tea Leaves',
        category: 'Tea',
        quantity: '15kg',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Available',
        dataIndex: 'available',
        key: 'available',
        render: (text) => <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={text} />,
    },
    {
        key: 'action',
        render: (text, record) => (
            <Flex justify="center">
                <Button type="link">
                    <SettingOutlined />
                </Button>
            </Flex>
        ),
    }
];

const IngredientStock = () => {
    const [isModalAddIngredientVisible, setIsModalAddIngredientVisible] = useState(false);
    const [isModalEditIngredientVisible, setIsModalEditIngredientVisible] = useState(false);
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false);
    const [current, setCurrent] = useState('mail');

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const showModalAddIngredient = () => {
        setIsModalAddIngredientVisible(true);
    };

    const showModalEditIngredient = () => {
        setIsModalEditIngredientVisible(true);
    };

    const showModalAddCategory = () => {
        setIsModalAddCategoryVisible(true);
    };

    const handleOk = () => {
        setIsModalAddIngredientVisible(false);
        setIsModalEditIngredientVisible(false);
        setIsModalAddCategoryVisible(false);
    };

    const handleCancel = () => {
        setIsModalAddIngredientVisible(false);
        setIsModalEditIngredientVisible(false);
        setIsModalAddCategoryVisible(false);
    };

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Ingredients</Typography.Title>
                    <Button type="primary" onClick={showModalAddIngredient}>Add Ingredient</Button>
                </Flex>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        style={{ justifyContent: 'flex-start' }}
                    >
                        <SubMenu key="sub1" title="Category 1">

                        </SubMenu>
                        <SubMenu key="sub2" title="Category 2">

                        </SubMenu>
                        <SubMenu key="sub3" title="Category 3">

                        </SubMenu>
                    </Menu>
                    <Button type="default" onClick={showModalAddCategory} >Add Category</Button>
                </Flex>
            </Flex>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%' }}
                dataSource={dataSource}
                columns={columns}
                pagination={{}} />

            {/* <Modal title="Add New Ingredient" open={isModalAddIngredientVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddIngredient />
            </Modal>
            <Modal title="Edit Ingredient" open={isModalEditIngredientVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddIngredient />
            </Modal>
            <Modal title="Add New Category" open={isModalAddCategoryVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddIngredientCategory />
            </Modal>  */}

        </>
    );
};

export default IngredientStock;
