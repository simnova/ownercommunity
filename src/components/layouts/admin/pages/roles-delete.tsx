import { SubPageLayout } from '../sub-page-layout';
import { PageHeader, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

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
    Something here
  </SubPageLayout>
  )
}