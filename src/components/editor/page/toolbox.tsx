import { useEditor } from '@craftjs/core';
import React from 'react';
import * as CmsComponents from '../components/';

interface EditorConfigDefinition {
  categories: {
    categoryId: number;
    categoryName: string;
    components: {
      id: number;
      name: string;
      component: React.JSX.Element;
    }[];
  }[];
}

export const Toolbox: React.FC<any> = () => {
  const { connectors } = useEditor();

  const editorConfig: EditorConfigDefinition = {
    categories: [
      {
        categoryId: 1,
        categoryName: 'Navigation',
        components: [
          {
            id: 1,
            name: 'menu',
            component: <CmsComponents.MenuComponent theme="light" />
          },
          {
            id: 2,
            name: 'Breadcrumbs',
            component: <CmsComponents.Breadcrumbs separator="/" />
          }
        ]
      },
      {
        categoryId: 2,
        categoryName: 'Layout',
        components: [
          {
            id: 3,
            name: 'Grid',
            component: <CmsComponents.Grid />
          },
          {
            id: 4,
            name: 'Footer',
            component: <CmsComponents.Footer />
          }
        ]
      },
      {
        categoryId: 3,
        categoryName: 'Content',
        components: [
          {
            id: 5,
            name: 'TextThing',
            component: <CmsComponents.TextThing title="Add Text" body="addBody" fontSize={14} />
          },
          {
            id: 6,
            name: 'TextComponent',
            component: <CmsComponents.TextComponent text="Add Text" fontSize={14} />
          },
          {
            id: 7,
            name: 'Image',
            component: <CmsComponents.ImageComponent />
          }
        ]
      },
      {
        categoryId: 4,
        categoryName: 'Dynamic Content',
        components: [
          {
            id: 8,
            name: 'Country Info2',
            component: <CmsComponents.CountryInfo2 country="US" />
          },
          {
            id: 9,
            name: 'Card',
            component: <CmsComponents.Card background="#ff00ff" />
          }
        ]
      }
    ]
  };

  return (
    <div>
      {editorConfig.categories.map((category, index) => (
        <div key={category.categoryId}>
          <div
            className={'bg-neutral-700'}
            style={{
              minHeight: '100%',
              padding: '0.3rem 0.5rem 0.5rem 0.5rem',
              marginBottom: '3px'
            }}
          >
            <h3 className={'text-white text-left'}>{category.categoryName}</h3>

            {category.components.map((component, componentIndex) => (
              <div
                key={component.id}
                ref={(ref) => connectors.create(ref as HTMLElement, component.component)}
                style={{
                  cursor: 'move',
                  textAlign: 'center',
                  margin: '2px',
                  borderColor: 'black',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: 'white'
                }}
              >
                <span style={{ userSelect: 'none' }}>{component.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
