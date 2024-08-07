import { PageHeader } from '@ant-design/pro-layout';
import { SubPageLayout } from '../sub-page-layout';
import { useParams } from 'react-router-dom';
import { theme } from 'antd';
import { PropertiesListContainer } from '../components/properties-list.container';
import { Helmet } from 'react-helmet-async';

export const PropertiesList: React.FC<any> = (_props) => {
  const {
    token: { colorTextBase }
  } = theme.useToken();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
          title={
            <span
              style={{
                color: colorTextBase
              }}
            >
              Properties
            </span>
          }
        />
      }
    >
      <Helmet>
        <title>Properties</title>
      </Helmet>
      <PropertiesListContainer data={{ memberId: params.memberId }} />
    </SubPageLayout>
  );
};
