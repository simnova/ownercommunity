import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Member } from '../../../../generated';
import { isMemberAdmin } from '../../../../constants';


interface CommunitiesDropdownProps {
  data: {
    members: Member[];
  };
  isAdmin?: boolean;
}

export const CommunitiesDropdown: React.FC<CommunitiesDropdownProps> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const currentMember = props.data.members?.find((member) => member.id === params.memberId);

  const items: MenuProps["items"] = props.data.members?.map((member: Member) => {
    const memberProps = {
      key: member?.id,
      label: `${member?.community?.name} | ${member?.memberName}`,
      path: `/community/${member?.community?.id}/member/${member?.id}`,
    };

    if (isMemberAdmin(member)) {
      return [
        { ...memberProps },
        { ...memberProps, key: memberProps.key + '-admin', label: memberProps.label + ' (Admin)', path: `/community/${member?.community?.id}/admin/${member?.id}` },
      ];
    }

    return memberProps;
  }).flat();

  console.log(items)

  const onMenuItemClicked = (e: any) => {
    console.log("onMenuItemClicked", e)
    setDropdownVisible(false);
    navigate(e.item.props.path);
  };

  return (
    (<Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [params.memberId ?? ''],
        onClick: onMenuItemClicked,
      }}
      open={dropdownVisible}
      onOpenChange={(visible) => setDropdownVisible(visible)}
    >
      <a
        onClick={(e) => e.preventDefault()}
        className="ant-dropdown-link"
        style={{ minHeight: '50px' }}
      >
        {currentMember?.memberName} <DownOutlined />
      </a>
    </Dropdown>)
  );
};
