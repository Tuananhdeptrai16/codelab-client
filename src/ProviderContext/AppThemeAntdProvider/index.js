import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { useThemeState } from '../AppThemeContext.js';

const { darkAlgorithm, defaultAlgorithm } = theme;

const AppThemeAntdProvider = ({ children }) => {
  const { theme: currentTheme } = useThemeState(); 


  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme !== 'light' ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#ffb900',
          // colorPrimary: '#4d6bfe',

        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AppThemeAntdProvider;
