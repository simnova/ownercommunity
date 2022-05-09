import { Typography, Descriptions } from 'antd';

const { Text } = Typography;

export const CommunityDetail: React.FC<any> = (props) => {
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="Community ID">
        <Text strong>{props.data.id}</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Community Name">
        <Text strong>{props.data.name}</Text>
      </Descriptions.Item>
    </Descriptions>
  );
};
