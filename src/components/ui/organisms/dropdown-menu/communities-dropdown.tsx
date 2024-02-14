import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalSettingsKeys } from '../../../../constants';
import { Community } from '../../../../generated';


interface CommunitiesDropdownProps {
  data: {
    community: Community;
    communities: Community[];
  };
  isAdmin?: boolean;
}

export const CommunitiesDropdown: React.FC<CommunitiesDropdownProps> = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem(LocalSettingsKeys.UserId);
  const path = props.isAdmin ? `/admin` : `/member/${userId}`;

  const items: MenuProps["items"] = props.data.communities?.map((community) => {
    return {
      key: community?.id,
      label: community?.name,
      path: `/community/${community?.id}/` + path,
    };
  });

  const onMenuItemClicked = (e: any) => {
    setDropdownVisible(false);
    navigate(`/community/${e.key}` + path);
  };

  return (
    (<Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [props.data.community?.id ?? ''],
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
        {props.data.community?.name} <DownOutlined />
      </a>
    </Dropdown>)
  );
};
