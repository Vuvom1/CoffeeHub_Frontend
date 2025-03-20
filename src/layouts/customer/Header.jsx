import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Layout, Menu, Typography, Divider, Button, Image, Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import endpoints from '../../contants/Endpoint';
import { useSelector } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { useDispatch } from 'react-redux';
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const username = user ? user.username : null;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    }


    return (
        <Row gap={10} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Col xs={0} md={6} lg={9} style={{ textAlign: 'left' }}>
            <Link style={{ color: '#B17457', fontSize: '20px', fontWeight: 700 }} to={endpoints.customer.base}>Coffee HUB</Link>
            </Col>
            <Col xs={12} md={6} lg={9}>
                <Menu xs={12} mode="horizontal" defaultSelectedKeys={['0']} style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Menu.Item key="1"><Link to={endpoints.customer.menu}>Menu</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={endpoints.customer.orderTracking}>Order Tracking</Link></Menu.Item>
                    <Menu.Item key="4" hoverable={true} >
                        <Link to={endpoints.customer.cart}>
                            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>

            {user && (
                <>
                    <Col xs={6} md={6} lg={3} justify='flex-end'>

                        <Image src="https://i.pinimg.com/236x/5b/41/d8/5b41d8759e395d035c67e720fdd345c6.jpg" style={{ width: 50, height: 50, borderRadius: 100 }} />

                    </Col>
                    <Col xs={0} md={0} lg={2} textAlign='start'>
                        <Typography.Text>{username}</Typography.Text>
                    </Col>
                    <Col xs={0} md={6} lg={1} >
                        <Flex gap={14} align='center' justify='flex-end'>
                            <Button type="outline" icon={<LogoutOutlined />} onClick={handleLogout}></Button>
                        </Flex>
                    </Col>
                </>
            )}
        </Row>
    );
};

export default Header;