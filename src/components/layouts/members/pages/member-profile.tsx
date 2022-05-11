import { PageHeader, Typography, Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { FormTags } from '../../../ui/organisms/form-tags';
import { ProfilePhotoUploadContainer } from '../../admin/components/profile-photo-upload-container';

import { UsernamePasswordClient } from '@azure/msal-common';
// import { MemberProfile } from '../components/member-profile';
import { MembersProfileContainer } from '../components/member-profile-container';

const { TextArea } = Input;
const { Text } = Typography;

export const MemberProfile: React.FC<any> = (props) => {
  const params = useParams();
  console.log(params);
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Member Settings" />}>
        <Text strong>Member Details</Text>
        
        {/* <ProfilePhotoUploadContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}}/> */}
        <MembersProfileContainer data={{communityId: params.communityId ?? ''}} />
    </SubPageLayout>
  );
};
