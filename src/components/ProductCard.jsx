import React from 'react';
import { Card, Typography, Rate } from 'antd';
import endpoints from '../contants/Endpoint';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(endpoints.customer.menuItemDetail(item.id));
    }

    return (
        <Card
            onClick={handleClick}
            hoverable
            cover={<img style={{padding: 10, paddingBottom: 0}} alt={item.name} src={item.imageUrl} />}
            style={{ width: '100%', height: '100%', border: 'none' }}
        >
            <Card.Meta 
                title={<Typography.Title level={4} style={{ textAlign: 'start', marginBottom: 0 }}>{item.name?.toLocaleUpperCase()}</Typography.Title>} 
            />
            <Rate disabled defaultValue={4} style={{ display: 'block', marginTop: 10, textAlign: 'start', color: '#854836'}} />
            <Typography.Text type='secondary' strong style={{fontWeight: 2, display: 'block', marginTop: 10, fontSize: 24, textAlign: 'start', color: '#854836' }}>
            {
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)
            }
            </Typography.Text>
        </Card>
    );
};

export default ProductCard;