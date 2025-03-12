import React from 'react';
import { Carousel, Rate, Slider, Typography } from 'antd';
import { Row, Col, Card } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import ProductCard from '../../components/ProductCard';

const menuItems = [
    { name: 'Espresso', description: 'Strong and bold coffee', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Latte', description: 'Smooth and creamy coffee', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Cappuccino', description: 'Rich and foamy coffee', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Americano', description: 'Classic black coffee', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Mocha', description: 'Chocolate flavored coffee', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Macchiato', description: 'Espresso with a dash of milk', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Flat White', description: 'Velvety smooth coffee', image: 'src/assets/sample-menu-item-1.jpg' },
    { name: 'Affogato', description: 'Espresso with ice cream', image: 'src/assets/sample-menu-item-1.jpg' },
];

const Home = () => {

    return (
        <div>
            <Carousel autoplay style={{ width: '100%', height: 'calc(100% - 64px)' }}>
                <img src="src/assets/banner-1.jpg" alt="Banner 1" />
                <img src="src/assets/banner-1.jpg" alt="Banner 1" />
            </Carousel>

            <Typography style={{ textAlign: 'center', marginTop: 30, fontStyle: 'italic' }}>What happened here</Typography>
            <Typography.Title level={2} style={{ textAlign: 'center', marginTop: 10 }}>COFFEEHUB MERCHANDISE</Typography.Title>

            <Row gutter={[20, 20]} style={{ marginTop: 24, marginLeft: '15%', marginRight: '15%' }}>
                {menuItems.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <ProductCard item={item} />
                    </Col>
                ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: 50, position: 'relative' }}>
                <img src="src/assets/banner-1.jpg" alt="Rectangle" style={{ width: '70%', height: '300px' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <button style={{ fontSize: '16px', cursor: 'pointer' }}>Read More</button>
                </div>
            </div>

            <Typography  style={{ textAlign: 'center', marginTop: 30, fontStyle: 'italic', color: '#854836' }}>What happened here</Typography>
            <Typography.Title level={2} style={{ textAlign: 'center', marginTop: 10 }}>MERCHANDISE SALE</Typography.Title>

            <Row gutter={[20, 20]} style={{ marginTop: 24, marginLeft: '15%', marginRight: '15%' }}>
                {menuItems.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <ProductCard item={item} />
                    </Col>
                ))}
            </Row>

            <Footer style={{ textAlign: 'center', padding: '20px 0', backgroundColor: '#f0f0f0', marginTop: 50 }}>
                <Typography.Text>&copy; 2023 CoffeeHub. All rights reserved.</Typography.Text>
            </Footer>
        </div>
    );
};

export default Home;