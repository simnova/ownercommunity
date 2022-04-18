import { UsernamePasswordClient } from '@azure/msal-common'
import {PageHeader, Typography} from 'antd'
import { useParams } from 'react-router-dom'
import { SubPageLayout } from '../sub-page-layout'

const { Text } = Typography


export const Home: React.FC<any> = (props) => {
  const params = useParams();
  console.log(params);
  return (
    // <div>
    //   <h1>Home</h1>
    // </div>

    <SubPageLayout
    fixedHeader={false}
    header={
      <PageHeader 
        title="Home"
      />}
    >
      <Text> Community ID: {params.communityId}</Text>
      
    </SubPageLayout>
    
  )
}