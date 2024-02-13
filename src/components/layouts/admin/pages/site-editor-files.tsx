import { Col, Row, Typography } from 'antd';

import { useParams } from 'react-router-dom';
import { SiteEditorFilesListContainer } from '../components/site-editor-files-list.container';
import { SiteEditorFilesUploadContainer } from '../components/site-editor-files-upload.container';

const { Title } = Typography;

const SiteEditorFiles: React.FC = (_props) => {
  const params = useParams();
  
  return <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
    <Row>
      <Col span={24} style={{marginBottom: '24px'}}>
        <div className='inline-block'>
          <Title level={5}>Files</Title>
          Manage files available on your site
        </div>
        <div className='float-right'>
          <SiteEditorFilesUploadContainer data={{communityId: params.communityId ?? '',}}/>
        </div>
      </Col>
    </Row>
    <Row style={{display: 'flex', flexGrow: 1}}>
      <Col span={24} style={{border: '1px solid lightgrey'}}>
        <SiteEditorFilesListContainer data={{communityId: params.communityId ?? ''}}/>
      </Col>
    </Row>
  </div>
}
export { SiteEditorFiles };
