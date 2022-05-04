import { Typography, Descriptions, Dropdown } from 'antd';
import { useState } from 'react';
import { CommunityMenu } from './community-menu';
import { DownOutlined } from '@ant-design/icons';
import { Community } from '../../../../generated';

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
