import { useMutation } from "@apollo/client";
import React from "react";
import { AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderDocument } from "../../../../generated";
import { SiteEditor } from "./site-editor";
import { AuthResult } from "../../../ui/molecules/azure-upload";

export interface SiteEditorContainerProps {
  data :{
    communityId: string;
  }
}

export const SiteEditorContainer: React.FC<SiteEditorContainerProps> = (props) => {
  const [communityPublicContentCreateAuthHeader] = useMutation(AdminSiteEditorContainerCommunityPublicContentCreateAuthHeaderDocument);

  const handleAuthorizeRequest = async (file:File): Promise<AuthResult>  => {
    const result = await communityPublicContentCreateAuthHeader({
      variables: {
        input: {
          communityId: props.data.communityId,
          contentType: file.type,
          contentLength: file.size
        }
      }
    });
    return result.data?(({authHeader: result.data.communityPublicContentCreateAuthHeader.authHeader, ...{isAuthorized:true}})as AuthResult):{isAuthorized:false} as AuthResult;
  }

  return (
    <div>
      <SiteEditor
        authorizeRequest={handleAuthorizeRequest}
        blobPath={`https://ownercommunity.blob.core.windows.net/${props.data.communityId}`}
        />
    </div>
  )
}