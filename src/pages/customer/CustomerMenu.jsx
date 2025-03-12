import React from 'react';
import { Col, Layout, Menu, Row, Typography, Image} from 'antd';

const { Header, Content, Footer } = Layout;

const CustomerMenu = () => {
    return (
      

       
        <Row gutter={16} style={{ padding: 16, paddingLeft: '10%', paddingRight: '10%' }}> 
            <Col span={12}>  
                <Typography.Title style={{textAlign: 'start'}} strong level={1}>COFFEE MENU 1</Typography.Title>
                <Row style={{ marginBottom: 16 }}>
                    <Col span={6}>
                    <Image height={120} width={120} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                    </Col>
                    <Col span={12} offset={1} style={{ textAlign: 'start' }}>
                        <Row gutter={16} justify={'space-between'}>
                                <Typography strong style={{ fontSize: 24 }}>Product Name</Typography>
                                <Typography.Text type='secondary' style={{ fontSize: 24 }}>$10</Typography.Text>
                        </Row>
                        <Row gutter={16}>
                            <Typography.Text style={{ fontSize: 16, fontWeight: 300 }}>Beverage</Typography.Text>
                        </Row>
                    </Col>

                </Row>
                <Row style={{ marginBottom: 16 }}>
                    <Col span={6}>
                    <Image height={120} width={120} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                    </Col>
                    <Col span={12} offset={1} style={{ textAlign: 'start' }}>
                        <Row gutter={16} justify={'space-between'}>
                                <Typography strong style={{ fontSize: 24 }}>Product Name</Typography>
                                <Typography.Text type='secondary' style={{ fontSize: 24 }}>$10</Typography.Text>
                        </Row>
                        <Row gutter={16}>
                            <Typography.Text style={{ fontSize: 16, fontWeight: 300 }}>Beverage</Typography.Text>
                        </Row>
                    </Col>

                </Row>
            </Col>


            <Col span={12} >  
                <Typography.Title style={{textAlign: 'start'}} strong level={1}>COFFEE MENU 1</Typography.Title>
                <Row style={{ marginBottom: 16 }}>
                    <Col span={6}>
                    <Image height={120} width={120} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                    </Col>
                    <Col span={12} offset={1} style={{ textAlign: 'start' }}>
                        <Row gutter={16} justify={'space-between'}>
                                <Typography strong style={{ fontSize: 24 }}>Product Name</Typography>
                                <Typography.Text type='secondary' style={{ fontSize: 24 }}>$10</Typography.Text>
                        </Row>
                        <Row gutter={16}>
                            <Typography.Text style={{ fontSize: 16, fontWeight: 300 }}>Beverage</Typography.Text>
                        </Row>
                    </Col>

                </Row>
                <Row style={{ marginBottom: 16 }}>
                    <Col span={6}>
                    <Image height={120} width={120} src='https://barista.qodeinteractive.com/wp-content/uploads/2016/03/product-image-3-633x633.jpg' />
                    </Col>
                    <Col span={12} offset={1} style={{ textAlign: 'start' }}>
                        <Row gutter={16} justify={'space-between'}>
                                <Typography strong style={{ fontSize: 24 }}>Product Name</Typography>
                                <Typography.Text type='secondary' style={{ fontSize: 24 }}>$10</Typography.Text>
                        </Row>
                        <Row gutter={16}>
                            <Typography.Text style={{ fontSize: 16, fontWeight: 300 }}>Beverage</Typography.Text>
                        </Row>
                    </Col>

                </Row>
            </Col>
            
        </Row>
         
    
    );
};

export default CustomerMenu;