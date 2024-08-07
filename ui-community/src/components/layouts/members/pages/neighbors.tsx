import { PageHeader } from '@ant-design/pro-layout';
import { theme } from 'antd';
import { useParams } from 'react-router-dom';
import { NeighborsCardListContainer } from '../components/neighbors-card-list.container';
import { SubPageLayout } from '../sub-page-layout';
import { Helmet } from 'react-helmet-async';

export const Neighbors: React.FC<any> = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();
  const { communityId } = useParams();
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
              Neighbors
            </span>
          }
        />
      }
    >
      <Helmet>
        <title>Neighbors</title>
      </Helmet>
      <NeighborsCardListContainer data={{ communityId: communityId ?? '' }} />
    </SubPageLayout>
  );
};
