import React, {useState} from "react";
import { Editor, Frame, Element } from '@craftjs/core';

// CMS components
import { TextThing } from "./editor/text-thing";
import { TextComponent } from "./text-component";
import { CountryInfo } from "./country-info";
import { CountryInfo2 } from "./country-info2";
import { Container } from "./editor/container";

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
    
    
    <Editor resolver={{TextComponent, TextThing, CountryInfo, CountryInfo2,Container}} onRender={ComponentWrapper}>
      <Row>
        <Col span={6}>
          <Toolbox />
        </Col>
        <Col span={12}>
            <EditorDetail />
            <Download/>
        </Col>
        <Col span={6}>
          <SettingsPanel/>
        </Col>
      </Row>
    </Editor>


    Reconstituted from JSON Below:
    <TextArea rows={4} value={text} onChange={(el) => setText(el.target.value)} />
    <Button onClick={() => setJson(JSON.parse(text))}>Load Json</Button>
    {json.length > 0 ? 
    <Editor resolver={{TextComponent, TextThing, CountryInfo, CountryInfo2,Container}} >
      <Frame data={json}>
        
      </Frame>
    </Editor>
    : <div>no Json</div>}

  </>
}
export default PageEditor;
