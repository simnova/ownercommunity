import { PageHeader } from '@ant-design/pro-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { RolesDeleteContainer } from '../components/roles-delete.container';
import { SubPageLayout } from '../sub-page-layout';

export const RolesDelete: React.FC<any> = () => {
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