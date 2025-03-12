import React from 'react';
import { Card, Typography, Rate } from 'antd';

const ProductCard = ({ item }) => {
    return (
        <Card
            hoverable
            cover={<img style={{padding: 10, paddingBottom: 0}} alt={item.title} src={'https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-10-1-633x633.jpg'} />}
            style={{ width: '100%', height: '100%', border: 'none' }}
        >
            <Card.Meta 
                title={<Typography.Title level={4} style={{ textAlign: 'start', marginBottom: 0 }}>{item.name.toLocaleUpperCase()}</Typography.Title>} 
            />
            <Rate disabled defaultValue={4} style={{ display: 'block', marginTop: 10, textAlign: 'start', color: '#854836'}} />
            <Typography.Text type='secondary' strong style={{fontWeight: 2, display: 'block', marginTop: 10, fontSize: 24, textAlign: 'start', color: '#854836' }}>
                $4.99
            </Typography.Text>
        </Card>
    );
};

export default ProductCard;