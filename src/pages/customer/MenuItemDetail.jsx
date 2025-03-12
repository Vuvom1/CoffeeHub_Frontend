import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Spin, Flex, Image, Rate, Divider, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MenuItemDetail = () => {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const sampleItems = [
        {
            id: 1,
            name: 'Sample Coffee 1',
            description: 'A delicious sample coffee 1.',
            price: 4.99,
            image: 'src/assets/sample-menu-item-1.jpg'
        },
        {
            id: 2,
            name: 'Sample Coffee 2',
            description: 'A delicious sample coffee 2.',
            price: 5.49,
            image: 'src/assets/sample-menu-item-2.jpg'
        },
        {
            id: 3,
            name: 'Sample Coffee 3',
            description: 'A delicious sample coffee 3.',
            price: 5.99,
            image: 'src/assets/sample-menu-item-3.jpg'
        }
    ];

    useEffect(() => {
        // Simulate fetching data
        const sampleData = {
            id: 1,
            name: 'Sample Coffee',
            description: 'A delicious sample coffee.',
            price: 4.99,
            image: 'src/assets/sample-menu-item-1.jpg'
        };

        setTimeout(() => {
            setMenuItem(sampleData);
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!menuItem) {
        return <Text>Menu item not found</Text>;
    }

    return (
        <Flex justify='center' vertical align='middle' style={{ width: '100%', height: '100%' }}>
            <img src="src/assets/coffee-detail.jpg" alt="Banner 1" style={{ width: '50%', height: '100%' }} />
            <Flex direction='column' align='start' style={{ paddingLeft: '10%', paddingRight: '10%', width: '100%' }}>
                <Image src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' alt={menuItem.name} style={{maxWidth: 600, maxHeight: 800}} width={'100%'} height={'100%'} />
                <Flex vertical align='start' style={{ width: '100%', paddingLeft: 24 }}>
                    <Title level={3}>{menuItem.name.toUpperCase()}</Title>
                    <Rate disabled defaultValue={4} style={{ display: 'block', textAlign: 'start', color: '#854836' }} />
                    <Title level={1} type='secondary' >${menuItem.price}</Title>
                    <Text>{menuItem.description}</Text>

                    <Flex align='middle' style={{ marginTop: '6%' }}>
                        <Button style={{ marginRight: '10px' }}>-</Button>
                        <Typography.Text style={{fontSize: 20}}>1</Typography.Text>
                        <Button style={{ marginLeft: '10px' }}>+</Button>
                        

                        <Button size='large' type='primary' style={{ marginLeft: '20px' }}>Add to Cart</Button>


                    </Flex>

                    <Divider style={{ width: '100%' }} />
                    
                    <Flex direction='row' align='center' style={{ width: '100%' }}>
                        <Text style={{ fontWeight: 800, fontSize: 16, marginRight: 8 }}>INGREDIENTS:</Text>
                        <Text>Milk, Nuts</Text>
                    </Flex>

                    <Flex direction='row' align='center' style={{ width: '100%', marginBottom: 16 }}>
                        <Text style={{ fontWeight: 800, fontSize: 16, marginRight: 8 }}>CATEGORY:</Text>
                        <Text>Coffee</Text>
                    </Flex>

                    <Flex direction='row' align='center' style={{ width: '100%' }}>
                        <Text style={{ fontWeight: 800, fontSize: 16, marginRight: 8 }}>SKU:</Text>
                        <Text>10</Text>
                    </Flex>

                    

                </Flex>
            </Flex>

            <Divider style={{}} />

            <Tabs defaultActiveKey="1" centered justify='center' style={{ width: '100%', padding: 24 }}>
                <TabPane tab="Details" key="1">
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec tincidunt ex. Sed nec libero
                        sit amet nunc ultricies tincidunt. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
                        </Text>
                </TabPane>
                <TabPane tab="Reviews" key="2">
                    <Text>No reviews yet.</Text>
                </TabPane>
            </Tabs>

            <Divider style={{}} />

            <Typography.Title style={{paddingLeft: 100}} level={3} align='start'>RELATED PRODUCTS</Typography.Title>
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
            </Row>

        </Flex>
    );
};

export default MenuItemDetail;