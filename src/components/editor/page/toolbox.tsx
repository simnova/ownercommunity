
import { useEditor } from '@craftjs/core';

import * as CmsComponents from "../components/";
import React from "react";

interface EditorConfigDefinition {
  categories: {
    categoryName: string;
    components: {
      name: string;
      component: React.JSX.Element;
    }[]
  }[]
}

export const Toolbox: React.FC<any> = () => {
  const { connectors } = useEditor();

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
          {
            name: 'Image',
            component: <CmsComponents.ImageComponent />
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
          }
        ]
      }
    ]
  }  


  return (
    <div

    
    >
      

      {editorConfig.categories.map((category, index) => (
        <div 
          key={index}
          
          >
          <div 
          className={'bg-neutral-700'}

            style={{
              minHeight:'100%',
              padding: '0.3rem 0.5rem 0.5rem 0.5rem',
              marginBottom: '3px',
            }}
          >
          <h3 className={'text-white text-left'}>{category.categoryName}</h3>

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