import { Dropdown } from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Community } from '../../../../generated';
import { CommunityMenu } from '../../../layouts/shared/components/community-menu';
import { LocalSettingsKeys } from '../../../../constants';


interface CommunitiesDropdownProps {
  data: {
    community?: Community;
  };
  isAdmin?: boolean;
}

export const CommunitiesDropdown: React.FC<CommunitiesDropdownProps> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const CommunityMenuList = () => {
    const userId = localStorage.getItem(LocalSettingsKeys.UserId);
    const path = props.isAdmin ? `/admin` : `/member/${userId}`;
    return <CommunityMenu onItemSelectedCallback={() => setDropdownVisible(false)} path={path} />;
  }

  return (
    (<Dropdown
      overlay={<CommunityMenuList />}
      open={dropdownVisible}
      onOpenChange={(visible) => setDropdownVisible(visible)}
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
