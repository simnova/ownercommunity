import { useNode } from '@craftjs/core'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Form, Image, Skeleton, Select, Row, Col, Slider, InputNumber } from 'antd'
import { gql, useQuery } from '@apollo/client';

const { Option } = Select;

const GET_IMAGES_IN_COMMUNITY = gql`
  query GetImagesInCommunity($communityId: ID!) {
    communityById(id: $communityId) {
      filesByType(type: "image") {
        name
        type
        url
        size
      }
    }
  }
`;

interface ImageProp {
  src: string;
  width: number;
}

let ImageComponent: any;

ImageComponent = ({ src, width }: ImageProp) => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
    >
        <Image src={src} fallback="https://joeschmoe.io/api/v1/random" preview={false} width={width} />
    </div>
  )
}

var ImageComponentSettings = () => {
  const params = useParams();
  const [inputValue, setInputValue] = useState(1);

  const { actions: { setProp}, src, width } = useNode((node) => ({
    src: node.data.props.src,
    width: node.data.props.width,
  }));

  console.log("COMMUNITY ID: ", params.communityId);

  const { data, loading, error } = useQuery(GET_IMAGES_IN_COMMUNITY, {
    variables: { communityId: params.communityId}
  });

  if (loading) {
    return <Skeleton active />
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (data) {
    return (
      <div>
        <Form layout="vertical">
          <Form.Item label="Source File">
            <Select defaultValue={src === '' ? "Select an image" : src} onChange={(inputElement) => setProp((props: any) => props.src = inputElement)}>
              {data.communityById.filesByType.map((file: any) => (
                <Option value={file.url}>{file.name.slice(13)}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Width">
            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={1000}
                  onChange={(inputElement) => setProp((props: any) => props.width = inputElement)}
                  value={width}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={1000}
                  style={{ margin: '0 16px' }}
                  value={width}
                  onChange={(inputElement) => setProp((props: any) => props.width = inputElement)}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    )
  }
  return <div>Upload images to your community using the Files tab above</div>
}

ImageComponent.craft = {
  props: {
    src: 'Select an image',
    width: 100,
  },
  related: {
    settings: ImageComponentSettings
  }
}

export {
  ImageComponent
}