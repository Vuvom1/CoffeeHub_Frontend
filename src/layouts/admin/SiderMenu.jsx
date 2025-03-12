import React from 'react';
import { Menu } from 'antd';
import {

PieChartOutlined,
TeamOutlined,
CoffeeOutlined,
ScheduleOutlined,
ShoppingOutlined,
GiftOutlined,
ContactsOutlined,
ProductOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import endpoints from '../../contants/Endpoint';

const { SubMenu } = Menu;

const SiderMenu = () => {
return (
    <Menu defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to={endpoints.admin.base}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CoffeeOutlined />}>
            <Link to={endpoints.admin.menuItem}>Menu Item</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProductOutlined />}>
            <Link to={endpoints.admin.ingredient}>Ingredient</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ShoppingOutlined />}>
            <Link to={endpoints.admin.order}>Order</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<TeamOutlined />}> 
            <Link to={endpoints.admin.employee}>Employee</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ContactsOutlined />}>
            <Link to={endpoints.admin.customer}>Customer</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<ScheduleOutlined />}>
            <Link to={endpoints.admin.schedule}>Schedule</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<GiftOutlined />}>
            <Link to={endpoints.admin.promotion}>Promotion</Link>
        </Menu.Item>
    </Menu>
);
};

export default SiderMenu;