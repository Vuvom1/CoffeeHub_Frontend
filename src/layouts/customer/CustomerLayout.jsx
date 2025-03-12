import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import { Layout } from "antd";

const { Content } = Layout;

const headerStyle = {
  position: 'fixed',
  zIndex: 1,
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  width: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 8px #f0f1f2',
};

const contentStyle = {
  paddingTop: 64,
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  overflowY: 'auto',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
};

const CustomerLayout = () => {
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
      <Layout.Header style={headerStyle}>
        <Header />
      </Layout.Header>

      <Layout style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <Content style={{ ...contentStyle, flex: 1 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default CustomerLayout;
