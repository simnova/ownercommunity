import { Dropdown } from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Community } from '../../../../generated';
import { CommunityMenu as AdminCommunityMenu } from '../../../layouts/admin/components/community-menu';
import { CommunityMenu } from '../../../layouts/members/components/community-menu';

interface CommunitiesDropdownProps {
  data: {
    community?: Community;
  };
  isAdmin?: boolean;
}

export const CommunitiesDropdown: React.FC<CommunitiesDropdownProps> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    (<Dropdown
      overlay={ props.isAdmin ? <AdminCommunityMenu onItemSelectedCallback={() => setDropdownVisible(false)}/> : <CommunityMenu onItemSelectedCallback={() => setDropdownVisible(false)} />}
      open={dropdownVisible}
      onVisibleChange={(visible) => setDropdownVisible(visible)}
    >
      <a
        onClick={(e) => e.preventDefault()}
        className="ant-dropdown-link"
        style={{ minHeight: '50px' }}
      >
        {props.data.community?.name} <DownOutlined />
      </a>
    </Dropdown>)
  );
};
