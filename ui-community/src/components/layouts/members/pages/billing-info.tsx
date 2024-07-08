import { PageHeader } from '@ant-design/pro-layout';
import { Typography, theme } from 'antd';
import { useParams } from 'react-router-dom';
import { BillingInfoContainer } from '../../shared/components/billing-info.container';
import { SubPageLayout } from '../sub-page-layout';

export const BillingInfo: React.FC<any> = () => {
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  const params = useParams();

  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader 
      title= {
        <span style={{
          color: colorTextBase
        }}>Billing Info</span>
      }
    />}>
      <BillingInfoContainer data={''}/>
    </SubPageLayout>
  );
}