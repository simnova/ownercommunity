import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  const { memberId } = useParams();
  const path = props.isAdmin ? `/admin/${memberId}` : `/member/${memberId}`;

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
