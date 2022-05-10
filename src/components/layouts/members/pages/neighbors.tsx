import {PageHeader, Typography} from 'antd'
import { SubPageLayout } from '../sub-page-layout'
import { NeighborsCardListContainer } from '../components/neighbors-card-list-container'

const { Text } = Typography


export const Neighbors: React.FC<any> = (props) => {
  return (
    <SubPageLayout
        fixedHeader={false}
        header={<PageHeader title="Neighbors"/>}
    >
      <NeighborsCardListContainer />
      
    </SubPageLayout>
    
  )
}