import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Layout, Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import endpoints from '../../contants/Endpoint';

const Header = () => {

    return (
        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">CoffeeHub</Link>
            <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Menu.Item key="1"><Link to={endpoints.customer.menu}>Menu</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/about">About Us</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/contact">Contact</Link></Menu.Item>
                <Menu.Item key="4" hoverable={true} >
                    <Link to={endpoints.customer.cart}>
                        <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                    </Link>
                </Menu.Item>
            </Menu>
        </Flex>
    );
};

export default Header;