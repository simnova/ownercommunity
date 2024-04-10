import { Button, theme } from 'antd';
import { useFeatureFlags } from '../../../shared/feature-flag-react-lite';
import styles from './header.module.css';

export const Header: React.FC<any> = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_AAD_REDIRECT_URI}/login/`;
  };
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const {GetFeatureFlagByName}=useFeatureFlags()
  console.log("Printing from feature falg")
  console.log(GetFeatureFlagByName("SEASON_ID"))
    return (
    <>
      <div className={`${styles['top-bar']} flex gap-2`} style={{
        backgroundColor:colorBgContainer
      }}>
        <Button type="primary" onClick={handleLogin}>
          Log In v6
        </Button>
       
      </div>
    </>
  );
};
