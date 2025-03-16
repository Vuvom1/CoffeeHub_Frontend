import React from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';

const primaryColor = '#B17457';

const ConfigProvider = ({ children }) => {
    return (
        <AntdConfigProvider
            theme={{
                token: {
                    colorPrimary: primaryColor,
                    colorTextBase: '#000000',
                    colorTextSecondary: primaryColor,
                    colorBgBase: '#FFFFFF',
                    colorBgSecondary: '#F5F5F5',
                    colorBgTextActive: '#A65E2E',
                    colorTextActive: primaryColor,
                    colorTextDescription: '#A65E2E',

                    colorButtonText: '#FFFFFF',
                    colorButtonBg: '#A65E2E',

                    itemSelectedColor: '#A65E2E',
                    itemHoverColor: '#F5F5F5',
                    itemActiveColor: '#F5F5F5',

                    colorBgLayout: '#FFFFFF',

                    borderRadius: 4,
                    
                    
                },
            }}
        >
            {children}
        </AntdConfigProvider>
    );
};

export default ConfigProvider;