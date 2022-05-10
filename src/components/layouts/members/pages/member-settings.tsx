import { PageHeader, Typography, Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { FormTags } from '../../../ui/organisms/form-tags';

const { TextArea } = Input;
const { Text } = Typography;

export const MemberSettings: React.FC<any> = (props) => {

  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Member Settings" />}>
        <Text strong>Member Details</Text>
        
    </SubPageLayout>
  );
};
