
import { useParams } from 'react-router-dom';
import { PropertiesListingContainer } from '../components/properties-listing.container';



export const PropertiesListing: React.FC<any> = (_props) => {
  const params = useParams();

  return (
    <PropertiesListingContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}} />
  )
}