
import { PageHeader } from '@ant-design/pro-layout';
import { SubPageLayout } from '../sub-page-layout';
import { useParams } from 'react-router-dom';
import { PropertiesListSearchContainer } from '../components/properties-list-search.container';
import {theme} from "antd"
export const PropertiesListSearch: React.FC<any> = (_props) => {
  const params = useParams();
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader 
     title= {
      <span style={{
        color: colorTextBase
      }}>Properties Search</span>
    }
    />}>
      <PropertiesListSearchContainer data={{ communityId: params.communityId }} />
    </SubPageLayout>
  );
};
