import { useLazyQuery, useMutation } from '@apollo/client';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AdminMembersAccountsAddContainerMemberAccountAddDocument,
  MemberAccountAddInput
} from '../../../../generated';
import { MembersAccountsAdd } from './members-accounts-add';

export interface MembersAccountsAddContainerProps {
  data: {
    id: string;
  };
}

export const MembersAccountsAddContainer: React.FC<MembersAccountsAddContainerProps> = (props) => {
  const navigate = useNavigate();
  const [memberAccountAdd] = useMutation(AdminMembersAccountsAddContainerMemberAccountAddDocument);

  const defaultValues: MemberAccountAddInput = {
    memberId: props.data.id,
    account: {
      firstName: '',
      lastName: '',
      user: ''
    }
  };

  const handleSave = async (values: MemberAccountAddInput) => {
    console.log('values: ', values);
    values.memberId = props.data.id;
    try {
      let result = await memberAccountAdd({
        variables: {
          input: values
        }
      });

      console.log('result: ', result);
      if (result.data?.memberAccountAdd.status.success) {
        message.success('Member Account Added');
        navigate(`../`);
      } else {
        message.error(`Error Adding Member Account: ${result.data?.memberAccountAdd.status.errorMessage}`);
      }
    } catch (error) {
      message.error(`Error Adding Member Account: ${JSON.stringify(error)}`);
    }
  };

  return <MembersAccountsAdd onSave={handleSave} data={defaultValues} />;
};
