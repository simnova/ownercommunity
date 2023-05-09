import { PageHeader } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import { SubPageLayout } from '../sub-page-layout'
import { NeighborsCardListContainer } from '../components/neighbors-card-list.container'
import { useParams } from 'react-router-dom'

const { Text } = Typography


export const Neighbors: React.FC<any> = (props) => {
  const { communityId } = useParams();
  return (
    <SubPageLayout
        fixedHeader={false}
        header={<PageHeader title="Neighbors"/>}
    >
      <NeighborsCardListContainer data={{ communityId: communityId ?? ''}}/>
      
    </SubPageLayout>
    
  )
}