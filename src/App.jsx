import React from 'react';
import { App as AntdApp, message } from 'antd';
import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes';
import ConfigProvider from './config/ConfigProvider';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <AntdApp>
          <div className="App" style={{ width: '100vw', height: '100vh', backgroundColor: '#F7F7F7' }}>
            <AppRoutes />
          </div>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
