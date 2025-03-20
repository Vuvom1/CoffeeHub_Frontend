import React, { useState, useEffect, use } from 'react';
import { Card, Row, Col, Typography, Button, Spin, Flex, Image, Rate, Divider, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import apiInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../../store/actions/cartActions';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MenuItemDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [menuItem, setMenuItem] = useState(null);
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);

    const cartItems = useSelector(state => state.cart.items);
    const item = cartItems.find(item => item.id === id);

    const fetchMenuItem = async () => {
        await apiInstance.get(apiEndpoints.customer.menuItems.getById(id)).then(response => {
            setMenuItem(response.data);
        }
        ).catch(error => {
            console.log(error);
        }
        );
    };

    const fetchIngredients = async () => {
        await apiInstance.get(apiEndpoints.customer.recipe.getByMenuItemId(id)).then(response => {
            setRecipe(response.data.$values);
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart(menuItem));
    };

    const handleQuantityChange = (value) => {
        const key = cartItems.findIndex(item => item.id === id);
        console.log(item.quantity);
        dispatch(updateQuantity({ key: item.key, quantity: value }));
    };

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));

    };

    useEffect(() => {
        fetchMenuItem();
        fetchIngredients();
        setLoading(false);
    }, []);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!menuItem) {
        return <Text>Menu item not found</Text>;
    }

    return (
        <Flex justify='center' vertical align='middle' style={{ width: '100%', marginTop: 24 }}>
            <Row direction='column' align='start' style={{ textAlign: 'start', paddingLeft: '10%', paddingRight: '10%', width: '100%' }}>
                <Col xs={24} lg={12} style={{ width: '100%' }}>
                    <Image src={menuItem.imageUrl} alt={menuItem.name} style={{ maxWidth: 600, maxHeight: 800 }} width={'100%'} height={'100%'} />
                </Col>
                <Col xs={24} lg={11} offset={1} style={{ width: '100%' }}>
                    <Title level={3}>{menuItem.name.toUpperCase()}</Title>
                    <Rate disabled defaultValue={4} style={{ display: 'block', textAlign: 'start', color: '#854836' }} />
                    <Title level={1} type='secondary' >{menuItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Title>
                    <Text>{menuItem.description}</Text>

                    <Flex align='middle' style={{ marginTop: '6%' }}>
                        {
                            item ? (<>
                                <Button disabled={item.quantity <= 0} onClick={() => handleQuantityChange(item.quantity - 1)} style={{ marginRight: '10px' }}>-</Button>
                                <Typography.Text style={{ fontSize: 20 }}>{item.quantity ?? 0}</Typography.Text>
                                <Button onClick={() => handleQuantityChange(item.quantity + 1)} style={{ marginLeft: '10px' }}>+</Button>
                                <Button onClick={() => handleRemove(item.id)} style={{ marginLeft: '20px' }}>Remove</Button>
                            </>
                            ) : (
                                <Button onClick={handleAddToCart} size='large' type='primary' style={{ marginLeft: '20px' }}>Add to Cart</Button>
                            )
                        }
                    </Flex>

                    <Divider style={{ width: '100%' }} />

                    <Flex direction='row' align='center' style={{ width: '100%' }}>
                        <Text style={{ fontWeight: 800, fontSize: 16, marginRight: 8 }}>INGREDIENTS:</Text>
                        <Text>{recipe.map((ingredient) => ingredient.ingredient.name).join(', ')}</Text>
                    </Flex>

                    <Flex direction='row' align='center' style={{ width: '100%', marginBottom: 16 }}>
                        <Text style={{ fontWeight: 800, fontSize: 16, marginRight: 8 }}>CATEGORY:</Text>
                        <Text>{menuItem.menuItemCategoryName}</Text>
                    </Flex>

                    <Flex direction='row' align='center' style={{ width: '100%' }}>
                        <Text style={{ fontWeight: 800, fontSize: 16, marginRight: 8 }}>SKU:</Text>
                        <Text>??</Text>
                    </Flex>

                </Col>
            </Row>

            <Divider style={{}} />

            <Tabs defaultActiveKey="1" centered justify='center' style={{ width: '100%', padding: 24 }}>
                <TabPane tab="Details" key="1">
                    <Text>
                        No details
                    </Text>
                </TabPane>
                <TabPane tab="Reviews" key="2">
                    <Text>No reviews yet.</Text>
                </TabPane>
            </Tabs>

            <Divider style={{}} />

            {/* <Typography.Title style={{ paddingLeft: 100 }} level={3} align='start'>RELATED PRODUCTS</Typography.Title>
            <Row gutter={[16, 16]} justify="center" style={{ width: '100%', paddingLeft: 100, paddingRight: 100, marginTop: 24 }}>
                
                <Col span={6}>
                    <ProductCard item={sampleItems[0]} />
                </Col>
                <Col span={6}>
                    <ProductCard item={sampleItems[0]} />
                </Col>
                <Col span={6}>
                    <ProductCard item={sampleItems[0]} />
                </Col>
                <Col span={6}>
                    <ProductCard item={sampleItems[0]} />
                </Col>
            </Row> */}

        </Flex>
    );
};

export default MenuItemDetail;