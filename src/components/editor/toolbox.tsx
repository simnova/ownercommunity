import React from "react";
import {Button} from "antd";
import { Element, useEditor } from "@craftjs/core";
import { TextThing } from "../editor/text-thing";
import { CountryInfo2 } from "../country-info2";
import { CountryInfo } from "../country-info";
import { Breadcrumbs } from "./components/breadcrumbs";
import { MenuComponent } from "./components/menu-component";

export const Toolbox: React.FC<any> = (props) => {
  const { connectors, query } = useEditor();
  return (
    <div>
      <div>Drag to add</div>
      <Button ref={(ref) => 
          connectors.create(ref as HTMLElement, <TextThing text="Add Text" fontSize="14" />)
        }>
        TextThing
      </Button>
      <Button ref={(ref) => 
          connectors.create(ref as HTMLElement, <CountryInfo2 country="US" />)
        }>CountryInfo2</Button>
      <Button ref={(ref) => 
          connectors.create(ref as HTMLElement, <Breadcrumbs separator="/" />)
        }>Breadcrumbs</Button>
      <Button ref={(ref) => 
          connectors.create(ref as HTMLElement, <MenuComponent theme="light" />)
        }>Menu</Button>
    </div>
  )
}