
import { useParams } from 'react-router-dom';
import { PropertiesLocationContainer } from '../components/properties-location.container';


export const PropertiesLocation: React.FC<any> = (_props) => {
  const params = useParams();

  return (
    <PropertiesLocationContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}} />
  )
}