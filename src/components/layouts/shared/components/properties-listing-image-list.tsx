import { Button, Col, Image, Modal, Row, message } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface PropertiesListingImageListProps {
  data: {
    images?: (string | null)[];
    memberId: string;
  };
  setImage: (image: string|undefined) => void;
  image: string|undefined;
  handleRemoveImage: () => Promise<boolean>;
}

export const PropertiesListingImageList: React.FC<PropertiesListingImageListProps> = (props) => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const handleImageClick = (image: any) => {
    props.setImage(image.target.src);
    setOpen(true);
  };

  const handleRemove = async () => {
    const success = await props.handleRemoveImage();
    setOpen(false);
    if (success) await message.success('Image removed successfully');
    else await message.error('Error occurred removing image');
  }

  const handleOk = () => {
    setOpen(false);
    props.setImage(undefined);
  };

  return (
    <>
      {props.data.images && (
        <>
          <Row>
            <Col span={24}>
              {props.data.images.map((image, index) => {
                if (image !== null) {
                  const url = `https://ownercommunity.blob.core.windows.net/${params.communityId}/${image}`;
                  return (
                    <Image
                      className="property-listing-image"
                      style={{ padding: '0px 10px', width: '200px' }}
                      src={url}
                      key={index}
                      alt={`listing-image${index + 1}`}
                      preview={false}
                      onClick={handleImageClick}
                    />
                  );
                }
              })}
            </Col>
          </Row>
          <Modal 
            open={open} 
            onOk={handleOk} 
            style={{
              minWidth: "800px",
              textAlign: "center"
            }}
            footer={[
              <Button style={{ float: "left" }} key="delete" danger type="primary" onClick={async () => await handleRemove()}>
                Delete
              </Button>,
              <Button key="ok" type="primary" onClick={handleOk}>
                OK
              </Button>
            ]}
          >
            <Image width="600px" src={props.image} preview={false} />
          </Modal>
        </>
      )}
    </>
  );
};
