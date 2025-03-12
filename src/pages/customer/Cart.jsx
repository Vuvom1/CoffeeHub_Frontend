import React from 'react';
import { Table, Button, InputNumber, Row, Col, Card, Typography, Divider } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';

const dataSource = [
    {
        key: '1',
        name: 'Coffee Latte',
        imageUri: 'src/assets/sample-menu-item-1.jpg',
        price: 5,
        quantity: 1,
    },
    {
        key: '2',
        name: 'Cappuccino',
        imageUri: 'https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-10-1-633x633.jpg',
        price: 6,
        quantity: 2,
    },
];

const columns = [
    {
        title: 'Image',
        dataIndex: 'imageUri',
        key: 'imageUri',
        render: (text) => <img src={text} alt="Product" style={{ width: 150 }} />,
    },
    {
        title: 'Product',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => (
            <div>
                <Typography.Text style={{ fontSize: 24 }} strong>{record.name}</Typography.Text>
                <br />
                <Typography.Text style={{fontSize: 20}} type="secondary">${record.price}</Typography.Text>
                <br />
                <Typography.Text type="secondary">Category</Typography.Text>
            </div>
        ),
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text, record) => (
            <Row gutter={16}>
                <Col span={6}>
                    <InputNumber style={{ width: 80, textAlign: 'center' }} min={1} defaultValue={record.quantity} onChange={(value) => handleQuantityChange(value, record.key)} />
                </Col>
                <Col span={12}>
                    <ButtonGroup>
                        <Button onClick={() => handleQuantityChange(record.quantity - 1, record.key)}>-</Button>
                        <Button onClick={() => handleQuantityChange(record.quantity + 1, record.key)}>+</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        ),
    },
    {
        title: 'Total',
        key: 'total',
        render: (text, record) => `$${record.price * record.quantity}`,
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Button type="link" onClick={() => handleRemove(record.key)}>
                Remove
            </Button>
        ),
    },
];

const handleQuantityChange = (value, key) => {
    console.log(`Quantity changed to ${value} for item with key ${key}`);
};

const handleRemove = (key) => {
    console.log(`Remove item with key ${key}`);
};

const Cart = () => {
    const totalAmount = dataSource.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Row gutter={16} style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: 24 }}>
            <Col span={16}>
                <Table
                    
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    showHeader={false}
                    title={() => <Typography.Title level={3} style={{ textAlign: 'start' }}>SHOPPING CART</Typography.Title>}
                />
            </Col>
            <Col span={8}>
                <Card >
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text style={{textAlign: 'start'}}>Total item</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text  strong >${totalAmount}</Typography.Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={12} align='start'>
                            <Typography.Text>Total Amount</Typography.Text>
                        </Col>
                        <Col span={12} align='end'>
                            <Typography.Text s strong>$23</Typography.Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Button size='large' type="primary" block>
                        Process to Checkout 
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default Cart;