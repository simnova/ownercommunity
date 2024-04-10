import { useQuery } from '@apollo/client';
import { MemberPropertyByPropertyIdDocument } from '../../../../generated';
import { CommunityPropertyDetail } from './community-property-detail';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

export const CommunityPropertyDetailContainer: React.FC<any> = (props) => {
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(MemberPropertyByPropertyIdDocument, {
    variables: { propertyId: props.data.propertyId }
  });

  return (
    <ComponentQueryLoader
      loading={propertyLoading}
      hasData={propertyData}
      hasDataComponent={<CommunityPropertyDetail data={propertyData} />}
      error={propertyError}
    />
  );
};
