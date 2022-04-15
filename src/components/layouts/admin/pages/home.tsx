import {PageHeader} from 'antd'
import { SubPageLayout } from '../sub-page-layout'

export const Home: React.FC<any> = (props) => {
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

    </SubPageLayout>
    
  )
}