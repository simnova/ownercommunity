import { PageHeader } from '@ant-design/pro-layout';
import { Typography,theme } from 'antd';
import { SubPageLayout } from '../sub-page-layout'
import { NeighborsCardListContainer } from '../components/neighbors-card-list.container'
import { useParams } from 'react-router-dom'

const { Text } = Typography


export const Neighbors: React.FC<any> = (props) => {
  const {
    token:{
      colorTextBase,
      colorBgContainer
    }
  }=theme.useToken()
  const { communityId } = useParams();
  return (
    <SubPageLayout
        fixedHeader={false}
        header={<PageHeader 
          title= {
            <span style={{
              color: colorTextBase
            }}>Neighbors</span>
          }
        />}
    >
      <NeighborsCardListContainer data={{ communityId: communityId ?? ''}}/>
      
    </SubPageLayout>
    
  )
}