import { Dropdown } from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Community } from '../../../../generated';
import { CommunityMenu } from '../../../layouts/admin/components/community-menu';

interface CommunitiesDropdownProps {
  data: Community;
}

export const CommunitiesDropdown: React.FC<any> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <Dropdown
      overlay={<CommunityMenu onItemSelectedCallback={() => setDropdownVisible(false)} />}
      visible={dropdownVisible}
      onVisibleChange={(visible) => setDropdownVisible(visible)}
    >
      <a
        onClick={(e) => e.preventDefault()}
        className="ant-dropdown-link"
        style={{ minHeight: '50px' }}
      >
        {props.data.name} <DownOutlined />
      </a>
    </Dropdown>
  );
};
