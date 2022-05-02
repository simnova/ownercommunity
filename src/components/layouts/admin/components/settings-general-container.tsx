import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  AdminSettingsGeneralContainerCommunityDocument,
  AdminSettingsGeneralContainerCommunityUpdateDocument,
  CommunityUpdateInput
} from '../../../../generated';
import { SettingsGeneral } from './settings-general';
import PropTypes from 'prop-types';
import { message, Skeleton } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

interface ComponentPropInterface {
  data: {
    id: string;
  };
}

export type SettingsGeneralContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> &
  ComponentPropInterface;

export const SettingsGeneralContainer: React.FC<SettingsGeneralContainerPropTypes> = (props) => {
  const [communityUpdate, { error }] = useMutation(
    AdminSettingsGeneralContainerCommunityUpdateDocument
  );
  const params = useParams();
  const {
    data: communityData,
    loading: accountLoading,
    error: accountError
  } = useQuery(AdminSettingsGeneralContainerCommunityDocument, {
    variables: { id: params.communityId ?? '' }
  });

  // const [
  //   gqlGetCommunityDetail,
  //   { called, loading: accountLoading, data: communityData, error: accountError }
  // ] = useLazyQuery(AdminSettingsGeneralContainerCommunityDocument, {
  //   fetchPolicy: 'cache-and-network'
  // });

  // useEffect(() => {
  //   if (!called) {
  //     (async () =>
  //       await gqlGetCommunityDetail({ variables: { id: params.communityId as never } }))();
  //   }
  // }, [params.communityId]);

  const handleSave = async (values: CommunityUpdateInput) => {
    values.id = communityData!.communityById!.id;
    try {
      await communityUpdate({
        variables: {
          input: values
        }
      }).then((result) => {
        if (result.data?.communityUpdate?.status?.success) {
          message.success('Saved');
        } else {
          message.error(result.data?.communityUpdate.status.errorMessage);
        }
      });
    } catch (saveError) {
      message.error(`Error updating user: ${JSON.stringify(saveError)}`);
    }
  };

  const content = () => {
    if (accountLoading) {
      return (
        <div>
          <Skeleton active />
        </div>
      );
    } else if (error || accountError) {
      return (
        <div>
          {error}
          {accountError}
        </div>
      );
    } else if (communityData && communityData.communityById) {
      console.log(communityData.communityById);
      return <SettingsGeneral onSave={handleSave} data={communityData.communityById} />;
    } else {
      return <div>No Data...</div>;
    }
  };

  return <>{content()}</>;
};
