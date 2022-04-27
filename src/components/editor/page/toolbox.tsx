import React from "react";
import {Button} from "antd";
import { useEditor } from "@craftjs/core";
import { TextThing } from "../components/text-thing";
import { CountryInfo2 } from "../components/country-info2";
import { Breadcrumbs } from "../components/breadcrumbs";
import { MenuComponent } from "../components/menu-component";
import { Grid } from "../components/grid";
import { Card } from "../components/card";
import { TextComponent } from "../components/text-component";

export const Toolbox: React.FC<any> = (props) => {
  const { connectors, query } = useEditor();
  return (
    <div>
      <div style={{ fontWeight: "600", borderBottom: "2px solid black", padding: "5px 0px"}}>Drag to add</div>

      <h3>Navigation</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem', textAlign: 'center'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <Breadcrumbs separator="/" />)
          }
          style={{width:'98%'}}
        >
          Breadcrumbs
        </Button>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <MenuComponent theme="light" />)
          }
          style={{width:"98%"}}
        >
          Menu
        </Button>
      </div>

      <h3>Layout</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem', textAlign: 'center'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <Grid />)
          }
          style={{width: "98%"}}  
        >
          Grid
        </Button>
      </div>


      <h3>Content</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem', textAlign: 'center'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <TextThing text="Add Text" fontSize="14" />)
          }
          style={{width: "98%"}}  
        >
          TextThing
        </Button>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <TextComponent text="Add Text" fontSize="14" />)
          }
          style={{width: "98%"}}  
        >
          Text
        </Button>
      </div>

      <h3>Dynamic Content</h3>
      <div style={{backgroundColor:'lightgray', borderRadius:'0.5rem', padding:'0.5rem', margin:'0.5rem', textAlign: 'center'}}>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <CountryInfo2 country="US" />)
          }
          style={{width: "98%"}}  
        >
            CountryInfo2
        </Button>
        <Button ref={(ref) => 
            connectors.create(ref as HTMLElement, <Card background="#ff00ff" />)
          }
          style={{width: "98%"}}  
        >
            Card
        </Button>
      </div>

    </div>
  )
}