import { useContext } from 'react';
import styles from './header.module.css';
import { Button, theme } from 'antd';
import { ThemeContext } from '../../../../contexts/ThemeContext';

export const Header: React.FC<any> = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_AAD_REDIRECT_URI}/login/`;
  };
  const abc = useContext(ThemeContext);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <>
      <div className={`${styles['top-bar']} flex gap-2`} style={{
        backgroundColor:colorBgContainer
      }}>
        <Button type="primary" onClick={handleLogin}>
          Log In
        </Button>
       
      </div>
    </>
  );
};
