import { useLazyQuery, useMutation } from '@apollo/client';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AdminMembersAccountsAddContainerMemberAccountAddDocument,
  AdminMembersAccountsAddContainerMemberForUserDocument,
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
  const [loadUser] = useLazyQuery(AdminMembersAccountsAddContainerMemberForUserDocument);

  const defaultValues: MemberAccountAddInput = {
    memberId: props.data.id,
    account: {
      firstName: '',
      lastName: '',
      user: ''
    }
  };

  const handleCheckUserId = async (userId: string): Promise<{ success: boolean; errorMessage: string }> => {
    const user = await loadUser({ variables: { userId } });
    if (user.data?.memberForUser) {
      return {
        success: false,
        errorMessage: `User already exists as a Member as ${user.data.memberForUser.memberName} `
      };
    }
    return { success: true, errorMessage: '' };
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

  return <MembersAccountsAdd onSave={handleSave} onCheckUserId={handleCheckUserId} data={defaultValues} />;
};
