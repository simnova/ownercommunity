import React, { useState } from 'react';
import { Editor } from '@craftjs/core';
import './site-editor-page-editor.css';

// CMS components
import * as CmsComponents from '../../../editor/components';

// ui elements
import { ComponentWrapper } from '../../../editor/page/component-wrapper';
import { Download } from '../../../editor/page/download';
import { Row, Col, Typography, Drawer } from 'antd';
import { SettingsPanel } from '../../../editor/page/settings-panel';
import { Toolbox } from '../../../editor/page/toolbox';
import { EditorDetail } from '../../../editor/page/editor-detail';

const { Title } = Typography;

const SiteEditorPageEditor: React.FC<any> = () => {
  const [showToolbox, setShowToolbox] = useState(false);

  return (
    <>
      <Editor resolver={{ ...CmsComponents }} onRender={ComponentWrapper}>
        <Row>
          <Col span={24} style={{ marginBottom: '24px' }}>
            <div className="inline-block">
              <Title level={5}>Editor</Title>
              Design each page of your site
            </div>
            <div className="float-right">
              <Download />
            </div>
          </Col>
        </Row>
        <div style={{ display: 'flex', flexDirection: 'row', flex: '1', alignItems: 'stretch', overflowY: 'scroll' }}>
          {/*}
        <div style={{display:'flex', flex:'0 0 170px', flexDirection:'column', border:'1px solid lightgrey'}}>
          <div style={{flex:'1 1 auto', overflow:'auto', height:'100px', padding:'0 10px 0 5px'}}>
            <Toolbox />
          </div>
        </div>
        <div style={{display:'flex', flex:'1 0 300px', flexDirection:'column',border:'1px solid lightgrey'}}>
        */}

          <div
            className={'bg-neutral-500 border-b-2 border-neutral-600'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '0 0 40px'
            }}
          >
            <div style={{ writingMode: 'vertical-lr' }}>
              <div
                className={'bg-white border-b-2 border-neutral-600'}
                onMouseEnter={() => setShowToolbox(true)}
                style={{
                  writingMode: 'vertical-lr',
                  display: 'block',
                  padding: '8px',
                  textAlign: 'center',
                  margin: '4px',
                  width: '34px'
                }}
                onClick={() => setShowToolbox(!showToolbox)}
              >
                Show Toolbox
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
              flexGrow: '1'
            }}
          >
            <div
              className={'site-drawer-render-in-current-wrapper'}
              style={{
                minHeight: '100%',
                display: 'flex',
                zIndex: '1'
              }}
            >
              <Drawer
                placement="left"
                closable={false}
                onClose={() => setShowToolbox(false)}
                open={showToolbox}
                width={200}
                getContainer={false}
                mask={false}
                rootStyle={{ position: 'absolute' }}
              >
                <div
                  onMouseLeave={() => setShowToolbox(false)}
                  className={'bg-neutral-800'}
                  style={{
                    padding: '20px 15px 10px 10px',
                    minWidth: '100%',
                    minHeight: '100%'
                  }}
                >
                  <Toolbox />
                </div>
              </Drawer>
              <EditorDetail />
            </div>
            {/*}
          </div>
           */}
          </div>
          <div style={{ display: 'flex', flexBasis: '300px', flexDirection: 'column', backgroundColor: 'gray' }}>
            <div style={{ flex: '1 1 auto', overflow: 'auto', height: '100px' }}>
              <SettingsPanel />
            </div>
          </div>
        </div>
      </Editor>
    </>
  );
};
export default SiteEditorPageEditor;
