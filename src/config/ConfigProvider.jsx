import React from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';

const ConfigProvider = ({ children }) => {
    return (
        <AntdConfigProvider
            theme={{
                token: {
                    colorPrimary: '#854836',
                    colorTextBase: '#000000',
                    colorTextSecondary: '#854836',
                    colorBgBase: '#FFFFFF',
                    colorBgSecondary: '#F5F5F5',
                    colorBgTextActive: '#854836',
                    colorTextActive: '#854836',
                    colorTextDescription: '#854836',

                    colorButtonText: '#FFFFFF',
                    colorButtonBg: '#854836',

                    itemSelectedColor: '#854836',
                    itemHoverColor: '#F5F5F5',
                    itemActiveColor: '#F5F5F5',

                    colorBgLayout: '#FFFFFF',

                    borderRadius: 0,
                    
                    
                },
            }}
        >
            {children}
        </AntdConfigProvider>
    );
};

export default ConfigProvider;