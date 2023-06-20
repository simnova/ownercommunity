import { PageHeader } from '@ant-design/pro-layout';
import { Typography, Input, theme } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { MemberProfileContainer } from '../../shared/components/member-profile.container';

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

  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader 
      title= {
        <span style={{
          color: colorTextBase
        }}>Member Settings</span>
      }
    />}>
        <Text strong>Member Details</Text>
        
        <MemberProfileContainer data={{communityId: params.communityId ?? ''}}/>
    </SubPageLayout>
  );
};
