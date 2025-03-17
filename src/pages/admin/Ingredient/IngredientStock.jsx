import React, { useEffect } from 'react';
import { useState } from 'react';
import { App, Button, Flex, Tabs, Menu, Modal, Table, Typography, Image } from 'antd';
import { ImportOutlined, SettingOutlined } from '@ant-design/icons';
import apiInstance from '../../../services/api';
import apiEndpoints from '../../../contants/ApiEndpoints';
import AddIngredientStock from './AddIngredientStock';
import { MoreOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const IngredientStock = () => {
    const [ingredientStocks, setIngredientStocks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalAddIngredientStockId, setModalAddIngredientStockId] = useState(null);

    const { message } = App.useApp();

    const columns = [
        {
            key: 'imageUrl',
            dataIndex: 'imageUrl',
            render: (_, record) => <Image src={record.ingredient?.imageUrl} style={{ width: 50, height: 50 }} />
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <Flex>
                    <Typography.Text>{record.ingredient?.name}</Typography.Text>
                </Flex>
            )
        },
        {
            key: 'purchaseDate',
            title: 'Date',
            dataIndex: 'purchaseDate',
        },
        {
            key: 'quantity',
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (_, record) => (
                <Flex>
                    <Typography.Text>{record.quantity} {record.ingredient?.unitOfMeasurement}</Typography.Text>
                </Flex>
            )
        },
        {
            key: 'costPrice',
            title: 'Unit Price',
            dataIndex: 'costPrice',
            render: (text) => (
                <Flex>
                    <Typography.Text>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                </Flex>
            )
        },
        {
            key: 'totalCostPrice',
            title: 'Total Price',
            dataIndex: 'totalCostPrice',
            render: (text) => (
                <Flex>
                    <Typography.Text>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
                </Flex>
            )
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link" onClick={() => { setModalAddIngredientStockId(record.id) }}>
                        <MoreOutlined />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchIngredients = async () => {
        await apiInstance.get(apiEndpoints.admin.ingredientStock.getAll).then((response) => {
            setIngredientStocks(response.data.$values);
        }
        ).catch((error) => {
            message.error('Failed to fetch ingredients');
        });
    }

    const handleOk = () => {
        setModalAddIngredientStockId(null);
    };

    const handleCancel = () => {
        setModalAddIngredientStockId(null);
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Imported ingredients</Typography.Title>
                </Flex>
            </Flex>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%' }}
                dataSource={ingredientStocks}
                columns={columns}
                pagination={{}} />
            <Modal title="Import ingredients" footer={null} open={modalAddIngredientStockId} onOk={handleOk} onCancel={handleCancel}>
                <AddIngredientStock onSave={handleOk} ingredientId={modalAddIngredientStockId} />
            </Modal>

        </>
    );
};

export default IngredientStock;
