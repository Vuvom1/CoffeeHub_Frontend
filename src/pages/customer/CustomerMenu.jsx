import React, {useState, useEffect} from 'react';
import { Col, Layout, Menu, Row, Typography, Image, Button} from 'antd';
import apiInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';

const CustomerMenu = () => {

    const [categoriesWithItems, setCategoriesWithItems] = useState([]);

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const fetchCategoriesWithItems = async () => {
        await apiInstance.get(apiEndpoints.customer.categories.getAllWithItems).then(response => {
            setCategoriesWithItems(response.data);
        }
        ).catch(error => {
            console.log(error);
        });
    }

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }

    useEffect(() => {
        fetchCategoriesWithItems();
    }
    , []);

    return (
        <Row gutter={16} style={{ padding: 16, paddingLeft: '10%', paddingRight: '10%' }}> 
            {
                categoriesWithItems.map((category, index) => (
                    <Col span={12} key={index}>  
                        <Typography.Title style={{textAlign: 'start'}} strong level={1}>{category.name}</Typography.Title>
                        {
                            category.menuItems.$values.map((item, index) => (
                                <Row style={{ marginBottom: 16 }} key={index}>
                                    <Col span={6}>
                                    <Image height={120} width={120} src={item.imageUrl} />
                                    </Col>
                                    <Col xs={20} lg={12} offset={2} style={{ textAlign: 'start' }}>
                                        
                                        <Row gutter={16} justify={'space-between'}>
                                        <Typography strong style={{ fontSize: 24 }}>{item.name}</Typography>
                                        <Typography.Text type='secondary' style={{ fontSize: 24 }}>$10</Typography.Text>
                                        <Row gutter={16} >
                                            <Typography.Text style={{ fontSize: 16, fontWeight: 300 }}>{item.description}</Typography.Text>
                                        </Row>
                                        </Row>
                                        <Row gutter={16} justify={'end'} align={'end'} >
                                            <Button disabled={
                                                cart.items.findIndex(cartItem => cartItem.id === item.id) >= 0
                                            } onClick={()=> handleAddToCart(item)} variant='outlined'><PlusOutlined /></Button>
                                        </Row>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Col>
                ))
            }
        </Row>
    );
};

export default CustomerMenu;