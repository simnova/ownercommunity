import { Col, Row, Typography } from 'antd';

import { useParams } from 'react-router-dom';
import { SiteEditorFilesListContainer } from '../components/site-editor-files-list.container';
import { SiteEditorFilesUploadContainer } from '../components/site-editor-files-upload.container';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const { Title } = Typography;

export const SiteEditorFiles: React.FC = (_props) => {
  const params = useParams();

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
  };

  const resetUploadSuccess = () => setUploadSuccess(false);
  
  return <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
    <Helmet>
        <title>Site Editor Files</title>
    </Helmet>
    <Row>
      <Col span={24} style={{marginBottom: '24px'}}>
        <div className='inline-block'>
          <Title level={5}>Files</Title>
          Manage files available on your site
        </div>
        <div className='float-right'>
          <SiteEditorFilesUploadContainer data={{communityId: params.communityId ?? '',}} onUploadSuccess={handleUploadSuccess}/>
        </div>
      </Col>
    </Row>
    <Row style={{display: 'flex', flexGrow: 1}}>
      <Col span={24} style={{border: '1px solid lightgrey'}}>
        <SiteEditorFilesListContainer 
        data={{communityId: params.communityId ?? ''}} 
        uploadSuccess={uploadSuccess}
        resetUploadSuccess={resetUploadSuccess}/>
      </Col>
    </Row>
  </div>
}
