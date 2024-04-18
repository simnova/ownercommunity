import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Cascader } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Member } from '../../../../generated';

interface CommunitiesDropdownProps {
  data: {
    members: Member[];
  };
}

export const CommunitiesDropdown: React.FC<CommunitiesDropdownProps> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const currentMember = props.data.members?.find((member) => member.id === params.memberId);

  let items: MenuProps['items'] = [];

  function isAdminMember(member: Member) {
    return member?.community?.userIsAdmin;
  }

  const populateItems = (member: Member) => {
    if (items?.[member?.community?.id] !== null) {
      const memberProps = {
        key: member?.community?.id,
        label: member?.community?.name,
        children: [
          {
            key: member?.id,
            label: member?.memberName,
            path: `/community/${member?.community?.id}/member/${member?.id}`
          }
        ]
      };
      if (isAdminMember(member)) {
        memberProps.children.push({
          key: memberProps.key + '-admin',
          label: member?.memberName + ' (Admin)',
          path: `/community/${member?.community?.id}/admin/${member?.id}`
        });
      }
      items?.push(memberProps);
      return;
    }
    
    let tempCommunity: any = items[member?.community?.id];
    tempCommunity.children.push({
      key: member?.id,
      label: member?.memberName,
      path: `/community/${member?.community?.id}/member/${member?.id}`
    });
    if (isAdminMember(member)) {
      tempCommunity.children.push({
        key: tempCommunity.key + '-admin',
        label: member?.memberName + ' (Admin)',
        path: `/community/${member?.community?.id}/admin/${member?.id}`
      });
    }
    items[member?.community?.id] = tempCommunity;
  };

  props.data.members?.forEach((member: Member) => populateItems(member));

  const onMenuItemClicked = (e: any) => {
    setDropdownVisible(false);
    navigate(e.item.props.path);
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [params.memberId ?? ''],
        onClick: onMenuItemClicked
      }}
      open={dropdownVisible}
      onOpenChange={(visible) => setDropdownVisible(visible)}
    >
      <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link" style={{ minHeight: '50px' }}>
        {currentMember?.community?.name} | {currentMember?.memberName} <DownOutlined />
      </a>
    </Dropdown>
  );
};
