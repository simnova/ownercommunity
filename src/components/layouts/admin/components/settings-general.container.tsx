import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import PropTypes from 'prop-types';
import {
    AdminSettingsGeneralContainerCommunityDocument,
    AdminSettingsGeneralContainerCommunityUpdateDocument,
    CommunityUpdateInput
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { SettingsGeneral } from './settings-general';

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
  const [communityUpdate, { error }] = useMutation(AdminSettingsGeneralContainerCommunityUpdateDocument);
  const {
    data: communityData,
    loading: accountLoading,
    error: accountError
  } = useQuery(AdminSettingsGeneralContainerCommunityDocument, {
    variables: { id: props.data.id ?? '' }
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

  return (
    <ComponentQueryLoader
      loading={accountLoading}
      hasData={communityData?.communityById}
      hasDataComponent={<SettingsGeneral onSave={handleSave} data={communityData?.communityById} />}
      error={accountError ?? error}
    />
  );
};
