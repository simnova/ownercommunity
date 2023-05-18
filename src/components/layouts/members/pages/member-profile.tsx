import { PageHeader } from '@ant-design/pro-layout';
import { Typography, Form, Input, Button, Checkbox, theme } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { FormTags } from '../../../ui/organisms/form-tags';


import { UsernamePasswordClient } from '@azure/msal-common';
import { MembersProfileContainer } from '../components/member-profile.container';
import { ProfilePhotoUploadContainer } from '../components/profile-upload.container';
import { useQuery } from '@apollo/client';
import { MemberPhotoUploadContainerContainerMemberDocument } from '../../../../generated';

const { TextArea } = Input;
const { Text } = Typography;

export const MemberProfile: React.FC<any> = (props) => {
  const {
    token:{
      colorTextBase,
      colorBgContainer
    }
  }=theme.useToken()
  const params = useParams();

  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(MemberPhotoUploadContainerContainerMemberDocument,{
    variables: {
      communityId: params.communityId
    }
  });

  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader 
      title= {
        <span style={{
          color: colorTextBase
        }}>Member Settings</span>
      }
    />}>
        <Text strong>Member Details</Text>
        
        <ProfilePhotoUploadContainer data={{id: memberData?.memberForCurrentUser?.id ?? '', communityId:params.communityId ?? ''}}/>
        <MembersProfileContainer data={{communityId: params.communityId ?? ''}} />
    </SubPageLayout>
  );
};
