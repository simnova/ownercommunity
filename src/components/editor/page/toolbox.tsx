import React from "react";
import {Button} from "antd";
import { Element, useEditor } from "@craftjs/core";
import { TextThing } from "../components/text-thing";
import { CountryInfo2 } from "../components/country-info2";
import { CountryInfo } from "../components/country-info";
import { Breadcrumbs } from "../components/breadcrumbs";
import { MenuComponent } from "../components/menu-component";
import { Grid } from "../components/grid";

export const Toolbox: React.FC<any> = (props) => {
  const { connectors, query } = useEditor();
  return (
    <div>
      <div style={{ fontWeight: "600", borderBottom: "2px solid black", padding: "5px 0px"}}>Drag to add</div>

      <h3>Navigation</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <Breadcrumbs separator="/" />)
          }>Breadcrumbs</Button>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <MenuComponent theme="light" />)
          }>Menu</Button>
      </div>

      <h3>Layout</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <Grid />)
          }>Grid</Button>
      </div>


      <h3>Content</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <TextThing text="Add Text" fontSize="14" />)
          }>
          TextThing
        </Button>
      </div>

      <h3>Dynamic Content</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <CountryInfo2 country="US" />)
          }>
            CountryInfo2
        </Button>
      </div>

    </div>
  )
}