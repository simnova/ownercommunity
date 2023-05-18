import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import MsalProvider from './components/shared/msal-react-lite';
import msalProviderConfig from './config/msal-config';
import ApolloConnection from './components/shared/apollo-connection';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { StyleProvider } from '@ant-design/cssinjs';
import { Button } from 'antd';
import { set } from 'lodash';

function ConfigProviderWrapper() {
// generate number rither 1 2 or 3
  // const {
  //   themeType,
  
  // }=useContext(ThemeContext)
  // const themeToShow=themeType
  const {
    themeType,
    changeThemeType
  }=useContext(ThemeContext)
  
  // setThemeToShow(themeType)
  const configProviderTheme = {
    ...theme,
    // token: {
    //   colorPrimary: themeType==="light"?"#1890ff":"#f5222d",
    // },
    algorithm: themeType==="light"?theme.defaultAlgorithm:theme.darkAlgorithm
  };

  return (
    <ConfigProvider theme={configProviderTheme}>
      
      {/* <StyleProvider hashPriority="high"> */}
      
        <MsalProvider config={msalProviderConfig}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MsalProvider>
      {/* </StyleProvider> */}
    </ConfigProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ConfigProviderWrapper />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
