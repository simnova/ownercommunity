import { Col, Row, Image } from "antd";
import { useParams } from "react-router-dom";

interface PropertiesListingImageListProps {
  data: {
    images?: (string|null)[];
  }
}

export const PropertiesListingImageList: React.FC<PropertiesListingImageListProps> = (props) => {
  const params = useParams();
  
  return (
    <>
      {props.data.images && (
        <Row>
          <Col span={24}>
            {props.data.images.map((image, index) => {   
              if (image !== null) { 
                const url = `https://ownercommunity.blob.core.windows.net/${params.communityId}/${image}`;
                return <Image className="property-listing-image" style={{ padding: "0px 10px", width: "200px" }} src={url} key={index} alt={`listing-image${index+1}`} preview={false} onClick={() => console.log("Hello world")} />
              }
            })}
          </Col>
        </Row>
      )}
    </>
  )
}