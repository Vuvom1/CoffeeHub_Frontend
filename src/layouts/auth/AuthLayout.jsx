import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
};

const AuthLayout = () => {
    const location = useLocation();
    const hideLayout = location.pathname === '/login' || location.pathname === '/signup';

    if (hideLayout) {
        return (
            <Layout style={{ ...layoutStyle, display: 'flex', flexDirection: 'row', flex: 1, width: '100vw', height: '100vh' }}>
                <Content style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Outlet />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ ...layoutStyle, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Layout style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                <Content style={{ ...contentStyle, flex: 1 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AuthLayout;
