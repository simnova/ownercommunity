import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, getByTestId } from '@testing-library/react';
import { Download } from './download';
import { Editor } from '@craftjs/core';
import * as LocalData from '../local-data';

const getUnloadedPageLayouts:() => LocalData.PageLayouts = () =>  {
  return [{loaded:false} as LocalData.UnloadedPageLayout] ; 
} ;
const getLoadedPageLayouts:() => LocalData.PageLayouts = () => {
  return [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout];
}

describe('Given the Download component', () => {


/*
  vi.mock('../local-data', async (importOriginal) => {
    const usePageLayouts = () => { 
      return getLoadedPageLayouts();
    }
    return { 
      ...await importOriginal() as any,
      usePageLayouts 
    };
  });


  afterEach(() => {
    vi.resetAllMocks()
  })
  */

  describe('when page layouts are not loaded', () => {

    it('then the component should not be rendered.', () => {
      /*
      vi.resetAllMocks();
      //vi.mock('usePageLayouts', () => {
      vi.mock('../local-data', async (importOriginal) => {
        const usePageLayouts = () => { 
          //const givenPageLayouts:LocalData.PageLayouts = [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout];
  
          return [{loaded:false}]; 
        }
        return { 
          ...await importOriginal() as any,
          usePageLayouts 
        };
      });
      */

      const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
      usePageLayoutsSpy.mockReturnValue([
        [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout] as LocalData.PageLayouts,
        {} as any,
        {} as any
      ]);


          //PageLayouts: getUnloadedPageLayouts(), 
          //UpdateState: () => { },
         // LocalStorageProperties: () => { }
      const {container} = render(
        <div data-testid="testHarness">
          <Editor>
            <Download />
          </Editor>
        </div>
      );
      (expect(getByTestId(container,'testHarness')) as any).not.toBeEmptyDOMElement();
    });
  });

  it('then the component should not be rendered.', () => {
    const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
    usePageLayoutsSpy.mockReturnValue([
      [{loaded:false } as LocalData.UnloadedPageLayout] as LocalData.PageLayouts,
      {} as any,
      {} as any
    ]);
    const {container} = render(
      <div data-testid="testHarness">
        <Editor>
          <Download />
        </Editor>
      </div>
    );
    (expect(getByTestId(container,'testHarness')) as any).toBeEmptyDOMElement();
  });
/*
  describe('when page layouts are loaded', () => {
    it('then the component should be rendered', () => {
      //arrange
      const givenPageLayouts:LocalData.PageLayouts = [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout];

      const mock = vi.fn().mockImplementation(() => {return getLoadedPageLayouts()});
      mock.mockImplementation(getLoadedPageLayouts)
      /*
      vi.mock('../local-data', async (importOriginal) => {
        const usePageLayouts = () => { 
  
          return givenPageLayouts; 
        }
        return { 
          ...await importOriginal() as any,
          usePageLayouts 
        };
      });
      */
     /*
      //act
     // const pageLayouts = LocalData.usePageLayouts();
      const result = render(
        <Editor enabled={true}>
          <Download />
        </Editor>
      )
      //assert
     // expect(pageLayouts).toEqual(givenPageLayouts);
      expect(result.container).not.toBeEmptyDOMElement();




    });

  });

  */

  /*


  describe('when page layouts are loaded', () => {
  it('then the component should be rendered', () => {
    //Arrange
   // const usePageLayoutsSpy  = vi.spyOn(LocalData, 'usePageLayouts');

    //usePageLayoutsSpy.mockReturnValue(givenPageLayouts);
    
    vi.mock('../local-data', async (importOriginal) => {
      const usePageLayouts = () => { 
        const givenPageLayouts:LocalData.PageLayouts = [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout];

        return givenPageLayouts; 
      }
      return { 
        ...await importOriginal() as any,
        usePageLayouts 
      };
    });
    
    //Act
    const {container} = render(
      <div data-testid="testHarness">
      <Editor enabled={true}>
        <div>test</div>
        <Download />
      </Editor>
      </div>
    );

    //Assert
    //console.log('container:', JSON.stringify(container));
    (expect(getByTestId(container,'testHarness')) as any).not.toBeEmptyDOMElement();
   
    //expect(result.container).not.toBeEmptyDOMElement();
  });
  });
  */

});





