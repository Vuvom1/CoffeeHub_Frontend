import React, { useEffect, useState } from 'react';
import { Carousel, Rate, Slider, Typography, Image } from 'antd';
import { Row, Col, Card } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import ProductCard from '../../components/ProductCard';
import apiInstance from '../../services/api';
import apiEndpoints from '../../contants/ApiEndpoints';

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

    const [popularItems, setPopularItems] = useState([]);
    const [newestItems, setNewestItems] = useState([]);

    const fetchPopularItems = async () => {
        await apiInstance.get(apiEndpoints.customer.menuItems.getPopular(8)).then(response => {
            setPopularItems(response.data.$values);
        }
        ).catch(error => {
            console.log(error);
        });
    }

    const fetchNewestItems = async () => {
        await apiInstance.get(apiEndpoints.customer.menuItems.getNewest(8)).then(response => {
            setNewestItems(response.data.$values);
        }
        ).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchPopularItems();
        fetchNewestItems();
    }
    , []);

    return (
        <div>
            <Carousel autoplay style={{ width: '100%', height: 'calc(100% - 64px)' }}>
                <Image preview={false} src="https://firebasestorage.googleapis.com/v0/b/martialartconnect.appspot.com/o/banners%2Fbanner-1.png?alt=media&token=6f2efe4d-bccd-430f-8fef-48bf35c9b39b" alt="Banner 1" />
               <Image preview={false} src="https://firebasestorage.googleapis.com/v0/b/martialartconnect.appspot.com/o/banners%2Fbanner-2.png?alt=media&token=523127e6-0e18-4534-9db5-b2e833f125c9" alt="Banner 2" />
            </Carousel>

            <Typography style={{ textAlign: 'center', marginTop: 30, fontStyle: 'italic' }}>What happened here</Typography>
            <Typography.Title level={2} style={{ textAlign: 'center', marginTop: 10 }}>COFFEEHUB MERCHANDISE</Typography.Title>

            <Row gutter={[20, 20]} style={{ marginTop: 24, marginLeft: '15%', marginRight: '15%' }}>
                {popularItems.map((item, index) => (
                    <Col key={index} sm={12} md={8} lg={6}>
                        <ProductCard item={item} />
                    </Col>
                ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: 50, position: 'relative' }}>
                <Image preview={false} src="https://firebasestorage.googleapis.com/v0/b/martialartconnect.appspot.com/o/banners%2Fbanner-3.png?alt=media&token=039af74b-1555-4d2f-b589-726d2d628677" alt="Banner 3" style={{ width: '100%', height: 'auto' }} />
            </div>

            <Typography  style={{ textAlign: 'center', marginTop: 30, fontStyle: 'italic', color: '#854836' }}>What happened here</Typography>
            <Typography.Title level={2} style={{ textAlign: 'center', marginTop: 10 }}>NEW REALEASE</Typography.Title>

            <Row gutter={[20, 20]} style={{ marginTop: 24, marginLeft: '15%', marginRight: '15%' }}>
                {newestItems.map((item, index) => (
                    <Col key={index} sm={12} md={8} lg={6}>
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