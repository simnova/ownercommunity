import React from "react";
import {Button} from "antd";
import { Element, useEditor } from "@craftjs/core";
import { TextThing } from "../components/text-thing";
import { CountryInfo2 } from "../components/country-info2";
import { CountryInfo } from "../components/country-info";
import { Breadcrumbs } from "../components/breadcrumbs";
import { MenuComponent } from "../components/menu-component";

export const Toolbox: React.FC<any> = (props) => {
  const { connectors, query } = useEditor();
  return (
    <div>
      <div>Drag to add</div>

      <h3>Navigation</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <Breadcrumbs separator="/" />)
          }>Breadcrumbs</Button>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <MenuComponent theme="light" />)
          }>Menu</Button>
      </div>


      <h3>Content</h3>

      <Button ref={(ref) => 
          connectors.create(ref as HTMLElement, <TextThing text="Add Text" fontSize="14" />)
        }>
        TextThing
      </Button>
      

      <h3>Dynamic Content</h3>

      <Button ref={(ref) => 
          connectors.create(ref as HTMLElement, <CountryInfo2 country="US" />)
        }>CountryInfo2</Button>

    </div>
  )
}