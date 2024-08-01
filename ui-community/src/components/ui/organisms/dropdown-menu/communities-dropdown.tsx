import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
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

  const populateItems = (member: Member, itemsMap: { [key: string]: any }) => {
    const communityId = member?.community?.id;
    if (!communityId) return;
  
    // Initialize community in itemsMap if it doesn't exist
    if (!itemsMap[communityId]) {
      itemsMap[communityId] = {
        key: communityId,
        label: member?.community?.name,
        children: []
      };
    }
  
    // Add member to the community's children
    const memberItem = {
      key: member?.id,
      label: member?.memberName,
      path: `/community/${communityId}/member/${member?.id}`
    };
    itemsMap[communityId].children.push(memberItem);
  
    // Add admin variant if applicable
    if (member?.isAdmin) {
      itemsMap[communityId].children.push({
        key: `${member?.id}-admin`,
        label: `${member?.memberName} (Admin)`,
        path: `/community/${communityId}/admin/${member?.id}`
      });
    }
  };

  const itemsMap: { [key: string]: any } = {};
  props.data.members?.forEach((member: Member) => populateItems(member, itemsMap));

  items = Object.values(itemsMap);

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
