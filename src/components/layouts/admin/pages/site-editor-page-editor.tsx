import React from "react";
import { Editor } from '@craftjs/core';

// CMS components
import * as CmsComponents from "../../../editor/components";

// ui elements
import { ComponentWrapper } from "../../../editor/page/component-wrapper";
import { Download } from "../../../editor/page/download";
import { Row, Col, Typography } from "antd";
import { SettingsPanel } from "../../../editor/page/settings-panel";
import { Toolbox } from "../../../editor/page/toolbox";
import { EditorDetail } from "../../../editor/page/editor-detail";


const { Title } = Typography;

const SiteEditorPageEditor: React.FC<any> = () => {
  
  return <>
    <Editor resolver={{...CmsComponents }} onRender={ComponentWrapper}>
      <Row>
        <Col span={24} style={{marginBottom:'24px'}}>
          <div className='inline-block'>
            <Title level={5}>Editor</Title>
            Design each page of your site
          </div>
          <div className='float-right'>
            <Download/>
          </div>
        </Col>
      </Row>
      <div style={{display:'flex',flexDirection:'row', flex:'1', alignItems:'stretch', overflowY:'scroll' }}>
        <div style={{display:'flex', flex:'0 0 170px', flexDirection:'column', border:'1px solid lightgrey'}}>
          <div style={{flex:'1 1 auto', overflow:'auto', height:'100px', padding:'0 10px 0 5px'}}>
            <Toolbox />
          </div>
        </div>
        <div style={{display:'flex', flex:'1 0 300px', flexDirection:'column', padding:'10px',border:'1px solid lightgrey'}}>
            <EditorDetail/>
        </div>
        <div  style={{display:'flex', flexBasis:'300px', flexDirection:'column', backgroundColor:'gray'}}>
          <div style={{flex:'1 1 auto', overflow:'auto', height:'100px'}}>
            <SettingsPanel/>
          </div>
        </div>
      </div>
    </Editor>
  </>
}
export default SiteEditorPageEditor;