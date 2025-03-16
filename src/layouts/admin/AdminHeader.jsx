import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Flex, Layout, Menu, Row, Typography, Image, Button, Divider } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';

const AdminHeader = () => {
    const user = useSelector((state) => state.auth.user);
    const username = user ? user.unique_name : null;
    const userRole = user ? user.role : null;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        console.log("Logout");
        window.location.reload();
    }
    
    return (
        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/admin/dashboard">
                <Typography.Title level={4} style={{ color: '#B17457' }}>COFFEE Hub</Typography.Title>
            </Link>
           
            <Flex gap={14} align='center'>
                <Image src="https://i.pinimg.com/236x/5b/41/d8/5b41d8759e395d035c67e720fdd345c6.jpg" style={{ width: 50, height: 50, borderRadius: 100 }} />
                <Flex vertical style={{ marginRight: 24, textAlign: 'right', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography.Text>{username}</Typography.Text>
                    <Typography.Text>{userRole}</Typography.Text>
                </Flex>
                <Divider type="vertical" style={{ height: 50 }} />
                <Button type="outline" icon={<LogoutOutlined />} onClick={handleLogout}></Button>
            </Flex>
           
        </Flex>
    );
};

export default AdminHeader;