
import { useParams } from 'react-router-dom';
import { PropertiesDetailContainer } from '../../shared/components/properties-detail.container';

export const PropertiesGeneral: React.FC<any> = () => {
  const params = useParams();

  return (
    <PropertiesDetailContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}} isAdmin />
  )
}