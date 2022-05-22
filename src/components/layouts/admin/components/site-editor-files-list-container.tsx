import { useQuery, useMutation } from '@apollo/client';
import { Skeleton } from 'antd';
import { AdminSiteEditorFilesListContainerCommunityByIdDocument, FileInfo, AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument } from '../../../../generated';
import { SiteEditorFilesList } from './site-editor-files-list';

export const SiteEditorFilesListContainer: React.FC<any> = (props) => {
  const { data: communityData, loading: communityLoading, error: communityError} = useQuery(
    AdminSiteEditorFilesListContainerCommunityByIdDocument, {
    variables: { id: props.data.communityId ?? '' }
  });

  const [communityPublicFileRemove] = useMutation(AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument);

  if (communityLoading) {
    return (
      <div>
        <Skeleton active />
      </div>  
    );
  }
  if (communityError) {
    return <div>{JSON.stringify(communityError)}</div>;
  }
  if (communityData && communityData.communityById ) {
    return (
      <SiteEditorFilesList 
        data={(communityData.communityById?.files??[]) as FileInfo[]} 
        onRemove={(fileName:string) => { communityPublicFileRemove({variables:{
          input: {fileName: fileName, communityId: props.data.communityId}}}
        )}}
      />
    );
  } else {
    return <div>No Data...</div>;
  }
};