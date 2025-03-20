import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import SiderMenu from './SiderMenu';
import AdminHeader from './AdminHeader';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const headerStyle = {
    position: 'fixed',
    zIndex: 1,
    textAlign: 'center',
    height: 64,
    width: '100%',
    lineHeight: '64px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 8px #f0f1f2',
  };
  
  const contentStyle = {
    paddingTop: 64,
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    overflowY: 'auto',
    paddingLeft: 24,
    paddingRight: 24,
  };
  
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  };

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    position: 'fixed',
    boxShadow: '0 2px 8px #f0f1f2',
    marginTop: 64,
  }

class AdminLayout extends React.Component {
    state = {
        collapsed: false,
    };
    
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={layoutStyle}>
                    <Header style={headerStyle} >
                        <AdminHeader />
                    </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                    style={siderStyle}   
                >
                    <SiderMenu />
                </Sider>
                    <Content style={{...contentStyle, marginLeft: collapsed ? 80 : 200 }}>
                        <Outlet />
                    </Content>
            </Layout>
            </Layout>
        );
    }
}

export default AdminLayout;
