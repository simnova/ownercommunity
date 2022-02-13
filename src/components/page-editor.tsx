import React, {useState} from "react";
import { Editor, Frame, Element } from '@craftjs/core';

// CMS components
import { TextThing } from "./editor/text-thing";
import { TextComponent } from "./text-component";
import { CountryInfo } from "./country-info";
import { CountryInfo2 } from "./country-info2";
import { Container } from "./editor/container";
import { Breadcrumbs } from "./editor/components/breadcrumbs";
import {MenuComponent} from "./editor/components/menu-component";

// ui elements
import { ComponentWrapper } from "./editor/component-wrapper";
import { Download } from "./download";
import { Button, Input, Row, Col } from "antd";



import { SettingsPanel } from "./editor/settings-panel";
import { Toolbox } from "./editor/toolbox";




import { EditorDetail } from "./editor/editor-detail";

const { TextArea } = Input;

const PageEditor: React.FC = (props) => {
  const [text, setText] = useState("");
  const [json, setJson] = useState("");


  /*

<Element is="div" canvas={true}>
                  <h1 className="text-lg leading-6 font-medium text-gray-900" style={{ background: 'white' }}>Hi There</h1>
                  <TextThing text={'lala22'} fontSize={22}  />
                  <h2 style={{ background: 'white' }}>Tomorrow</h2>
                  <h3 style={{ background: 'white' }}>Lala</h3>
                  <CountryInfo2 country={'US'} />
                </Element>
*/
  
  return <>
    
    
    <Editor resolver={{TextComponent, TextThing, CountryInfo, CountryInfo2,Container,Breadcrumbs,MenuComponent}} onRender={ComponentWrapper}>
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
      <Row>
        <Col span={24}>
        <Download/>
        </Col>
      </Row>
    </Editor>


  </>
}
export default PageEditor;
