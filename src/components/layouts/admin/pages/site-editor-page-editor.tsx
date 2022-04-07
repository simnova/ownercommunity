import React, {useState} from "react";
import { Editor, Frame, Element } from '@craftjs/core';

// CMS components
import { TextThing } from "../../../editor/components/text-thing";
import { TextComponent } from "../../../editor/components/text-component";
import { CountryInfo } from "../../../editor/components/country-info";
import { CountryInfo2 } from "../../../editor/components/country-info2";
import { Container } from "../../../editor/page/container";
import { Breadcrumbs } from "../../../editor/components/breadcrumbs";
import { MenuComponent} from "../../../editor/components/menu-component";

// ui elements
import { ComponentWrapper } from "../../../editor/page/component-wrapper";
import { Download } from "../../../editor/page/download";
import { Button, Input, Row, Col, Typography } from "antd";
import { SettingsPanel } from "../../../editor/page/settings-panel";
import { Toolbox } from "../../../editor/page/toolbox";
import { EditorDetail } from "../../../editor/page/editor-detail";

const { TextArea } = Input;
const { Title } = Typography;

const SiteEditorPageEditor: React.FC = (props) => {
  const [text, setText] = useState("");
  const [json, setJson] = useState("");
  
  return <>
    <Editor resolver={{TextComponent, TextThing, CountryInfo, CountryInfo2,Container,Breadcrumbs,MenuComponent}} onRender={ComponentWrapper}>
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
      <Row style={{display:'flex', flex:'1', alignItems:'stretch'}}>
        <Col span={3} style={{display:'flex', alignItems:'start', textAlign:'left', border:'1px solid lightgrey'}}>
          <Toolbox />
        </Col>
        <Col span={15} style={{display:'flex', flexDirection:'column', padding:'10px',border:'1px solid lightgrey'}}>
            <EditorDetail/>
        </Col>
        <Col span={6} style={{backgroundColor:'gray', minHeight:'100%'}}>
          <SettingsPanel/>
        </Col>
      </Row>

    </Editor>
  </>
}
export default SiteEditorPageEditor;