import styles from './header.module.css';
import { Button } from 'antd';

export const Header: React.FC<any> = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_AAD_REDIRECT_URI}/login/`;
  };
  return <>
    <div className={styles['top-bar']}>
      <Button type="primary" onClick={handleLogin}>Log In</Button>
    </div>
  </>
}