import React from 'react';
import { Card, Typography, Rate, Image, Flex, Button } from 'antd';
import endpoints from '../contants/Endpoint';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';


const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        navigate(endpoints.customer.menuItemDetail(item.id));
    }

    const cartItems = useSelector((state) => state.cart.items);
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

  

    const handleAddToCart = (e) => {
        dispatch(addToCart(item));
        console.log(item);
    }

    return (
        <Card
            onClick={handleClick}
            hoverable
            cover={
            <Image 
                preview={false}
                style={{padding: 10, paddingBottom: 0}} 
                alt={item.name} 
                src={item.imageUrl} />}
                style={{border: 'none', borderRadius: 12, cursor: 'pointer'}}
        >
            <Card.Meta 
                title={<Typography.Title level={4} style={{ textAlign: 'start', marginBottom: 0 }}>{item.name?.toLocaleUpperCase()}</Typography.Title>} 
            />
            <Rate disabled defaultValue={4} style={{ display: 'block', marginTop: 10, textAlign: 'start', color: '#854836'}} />
            <Flex align='center' justify='space-between'>
            <Typography.Text type='secondary' strong style={{fontWeight: 2, display: 'block', marginTop: 10, fontSize: 24, textAlign: 'start', color: '#854836' }}>
            {
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)
            }
            </Typography.Text>
            <Button onClick={(e) => {e.stopPropagation(), handleAddToCart(e); }} disabled={isInCart}>
                <PlusOutlined/>
            </Button>

            </Flex>
            
        </Card>
    );
};

export default ProductCard;