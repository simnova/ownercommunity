import React from 'react';
import { Button } from 'antd';
import { useEditor } from '@craftjs/core';

import * as CmsComponents from "../components/";

interface EditorConfigDefinition {
  categories: {
    categoryName: string;
    components: {
      name: string;
      component: JSX.Element;
    }[]
  }[]
}

export const Toolbox: React.FC<any> = (props) => {
  const { connectors, query } = useEditor();

  const editorConfig:EditorConfigDefinition = {
    categories: [
      {
        categoryName: 'Navigation',
        components: [
          {
            name: 'menu',
            component: <CmsComponents.MenuComponent theme="light" />
          },
          {
            name: 'Breadcrumbs',
            component: <CmsComponents.Breadcrumbs separator="/" />
          },
        ]
      },
      {
        categoryName: 'Layout',
        components: [
          {
            name: 'Grid',
            component: <CmsComponents.Grid />
          },
          {
            name: 'Footer',
            component: <CmsComponents.Footer />
          },
        ]
      },
      {
        categoryName: 'Content',
        components: [
          {
            name: 'TextThing',
            component: <CmsComponents.TextThing title="Add Text" body="addBody" fontSize={14} />
          },
          {
            name: 'TextComponent',
            component: <CmsComponents.TextComponent text="Add Text" fontSize={14} />
          },
        ]
      },
      {
        categoryName: 'Dynamic Content',
        components: [
          {
            name: 'Country Info2',  
            component: <CmsComponents.CountryInfo2 country="US" />
          },
          {
            name: 'Card',
            component: <CmsComponents.Card background="#ff00ff" />
          },
        ]
      }
    ]
  }  


  return (
    <div>
      <div
        style={{
          fontWeight: '600',
          borderBottom: '2px solid black',
          padding: '5px 0px',
        }}
      >
        Drag to add
      </div>

      {editorConfig.categories.map((category, index) => (
        <div 
          key={index}
          >
          <div 
            style={{
              backgroundColor: 'lightgray',
              padding: '0.5rem',
              marginTop: '0.5rem',
            }}
          >
          <h3>{category.categoryName}</h3>

          {category.components.map((component, componentIndex) => (
            <div
              key={componentIndex}
              ref={(ref) =>
                connectors.create(ref as HTMLElement, component.component)
              }
              style={{ cursor:'move', textAlign:'center', margin: '2px', borderColor: 'black', borderStyle: 'solid', borderWidth: '1px', borderRadius: '0.5rem', padding: '0.5rem', backgroundColor: 'white' }}
            >
              <span style={{userSelect:'none' }}>{component.name}</span>
            </div>
          ))}
          </div>
        </div>            
        ))}
    </div>
  );
};