import { Typography, Descriptions } from 'antd';

const { Text } = Typography;

export const CommunityDetail: React.FC<any> = (props) => {

  const whiteLabel = () => {
    if (props.data.whiteLabelDomain){
      return (
      <Descriptions.Item label="White Label Name">
        <Text strong>{props.data.whiteLabelDomain}</Text>
      </Descriptions.Item>
      )
    } else {
      return <></>
    }
  }

  const hasDomain = () => {
    if (props.data.domain) {
      return (
        <Descriptions.Item label="Domain Name">
          <Text strong>{props.data.domain}</Text>
        </Descriptions.Item>
        )
    }
  }

  const hasHandle = () => {
    if (props.data.handle){
      return (
      <Descriptions.Item label="Handle Name">
        <Text strong>{props.data.handle}</Text>
      </Descriptions.Item>
      )
    } else {
      return <></>
    }
  }



  

  return (
    <Descriptions column={1}>
      <Descriptions.Item label="Community ID">
        <Text strong>{props.data.id}</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Community Name">
        <Text strong>{props.data.name}</Text>
      </Descriptions.Item>
      {whiteLabel()}
      {hasDomain()}
      {hasHandle()}
    </Descriptions>
  );
};
