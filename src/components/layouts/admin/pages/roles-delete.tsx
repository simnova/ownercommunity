import { SubPageLayout } from '../sub-page-layout';
import { PageHeader, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { RolesDeleteContainer } from '../components/roles-delete-container';

export const RolesDelete: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <SubPageLayout 
    header={
      <PageHeader 
        title="Role Delete"  
        onBack={() => navigate(-1)}
        />
    }>
    <RolesDeleteContainer key={params.id ?? ''} data={{id:params.id ?? ''}} />
  </SubPageLayout>
  )
}