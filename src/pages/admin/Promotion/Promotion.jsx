import React, { useEffect, useState } from 'react';
import { App, Button, Flex, Menu, Modal, Switch, Table, Typography, message } from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import apiEndpoints from '../../../contants/ApiEndpoints';
import apiInstance from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../contants/Endpoint';
import AddPromotion from './AddPromotion';
import EditPromotion from './EditPromotion';

const { SubMenu } = Menu;

const Promotion = () => {
    const {message} = App.useApp();
    const navigate = useNavigate();
    const [promotions, setPromotions] = useState([]);
    const [isModalAddPromotionVisible, setIsModalAddPromotionVisible] = useState(false);
    const [modalPromotionEditId, setModalPromotionEditId] = useState(null);  

    const handleUpdateActivation = async (id, isActive) => {
        await apiInstance.put(apiEndpoints.admin.promotion.updateActivation(id), isActive).then((response) => {
            message.success(response.data);
        }).catch((error) => {
            message.error(error.response.data);
            console.log(error.response.data);
        }
        );
    }

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text) => new Date(text).toLocaleDateString('vi-VN')
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (text) => new Date(text).toLocaleDateString('vi-VN')
        },
        {
            title: 'IsActive',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text, record) => {
                return <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={()=>handleUpdateActivation(record.id, !text)} defaultChecked={text} />
            }
        },
        {
            key: 'action',
            render: (text, record) => (
                <Flex justify="center">
                    <Button type="link" onClick={() => {
                        setModalPromotionEditId(record.id)}}>
                        <MoreOutlined />
                    </Button>
                </Flex>
            ),
        }
    ];

    const fetchPromotions = async () => {    
        await apiInstance.get(apiEndpoints.admin.promotion.getAll).then((response) => {
            setPromotions(response.data.$values);
        }).catch((error) => {
            message.error(error.response.data);
        });
    }

    const showModalAddPromotion = () => {
        setIsModalAddPromotionVisible(true);
    };

    const handleOk = () => {
        setIsModalAddPromotionVisible(false);
        setModalPromotionEditId(null);
    };

    const handleCancel = () => {
        setIsModalAddPromotionVisible(false);
        setModalPromotionEditId(null);
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    return (
        <>
            <Flex vertical style={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Flex style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Promotion Management</Typography.Title>
                    <Button type="primary" onClick={showModalAddPromotion}><PlusOutlined />Add Promotion</Button>
                </Flex>
            </Flex>
            <Table
                scroll={{ y: '60vh' }}
                sticky={true}
                style={{ width: '100%' }}
                dataSource={promotions}
                columns={columns}
                pagination={{}} />

            <Modal width={800} title="Add New Promotion" open={isModalAddPromotionVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <AddPromotion onSave={handleOk} />
            </Modal>
            <Modal width={800} title="Edit Promotion" footer={null} open={modalPromotionEditId} onOk={handleOk} onCancel={handleCancel}>
                <EditPromotion promotionId={modalPromotionEditId} onSave={handleOk} />
            </Modal>
        </>
    );
};

export default Promotion;
