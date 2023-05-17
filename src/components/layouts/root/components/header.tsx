import { useContext } from 'react';
import styles from './header.module.css';
import { Button } from 'antd';
import { ThemeContext } from '../../../../contexts/ThemeContext';

export const Header: React.FC<any> = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_AAD_REDIRECT_URI}/login/`;
  };
  const abc = useContext(ThemeContext);
  console.log(abc);
  return (
    <>
      <div className={`${styles['top-bar']} flex gap-2`}>
        <Button type="primary" onClick={handleLogin}>
          Log In
        </Button>
        <Button type="primary" onClick={() => {}}>
          Change Theme
        </Button>
      </div>
    </>
  );
};
