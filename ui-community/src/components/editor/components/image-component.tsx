import { gql, useQuery } from '@apollo/client';
import { useNode } from '@craftjs/core';
import { Button, Col, Form, Image, InputNumber, Modal, Row, Skeleton, Slider } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


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

const ImageComponent: any = ({ src, width }: ImageProp) => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <div
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
        <Image src={src} fallback="https://joeschmoe.io/api/v1/random" preview={false} width={width} />
    </div>
  )
}

const ImageComponentSettings = () => {
  const params = useParams();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { actions: { setProp}, src, width } = useNode((node) => ({
    src: node.data.props.src,
    width: node.data.props.width,
  }));

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
      (<div>
        <Form layout="vertical">
          <Form.Item>
            <Button type='primary' onClick={() => {
              setImageUrl(src);
              setModalVisible(true);
            }} >
              Select an image
            </Button>
            <Modal 
              title="Select an image" 
              open={isModalVisible} 
              onOk={() => { 
                setProp((props: any) => props.src = imageUrl); 
                setModalVisible(false)
              }} 
              onCancel={() => setModalVisible(false)}
            >
              {data.communityById.filesByType.map((file: any) => (
                  <Image 
                    src={file.url} 
                    fallback="https://joeschmoe.io/api/v1/random" 
                    preview={false} 
                    onClick={(e: any) => setImageUrl(e.target.src)} 
                    className={imageUrl === file.url ? 'selected-img' : ''}
                    style={{ margin: '0 5px', maxWidth: '100px', minWidth: '32px' }}
                  />
              ))}
            </Modal>
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
      </div>)
    );
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
};
