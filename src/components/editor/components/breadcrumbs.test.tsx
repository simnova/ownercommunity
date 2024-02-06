import { describe, test, expect, beforeEach } from 'vitest';
import { Matcher, MatcherOptions, SelectorMatcherOptions, render} from '@testing-library/react';
import { Breadcrumbs } from './breadcrumbs';
import { MemoryRouter } from 'react-router-dom';
import { Editor,Frame } from '@craftjs/core';
import * as LocalData from '../page-layout';
import { UnloadedPageLayout } from '../page-layout';

const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');

beforeEach(() => {
  usePageLayoutsSpy.mockReset();
});

describe('Given a nested path and page layouts are not loaded', async () => {
  //Arrange
  const givenPath = '/about/learn-more';
  const givenPageLayouts:LocalData.PageLayouts = [{loaded:false} as UnloadedPageLayout];;

  describe('when rendering the breadcrumb component', async () => {  
    //Act
    interface RenderContext {
      container:HTMLElement;
      getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement
      getByText:  (id: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement
    }

    beforeEach<RenderContext>(async (context) => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      const {container,getByTestId,getByText} = render(
        <div data-testid="testHarness">
          <MemoryRouter initialEntries={[givenPath]}>
            <Editor resolver={{Breadcrumbs}} enabled={true}>
              <Frame>
                <Breadcrumbs separator=">" /> 
              </Frame>
            </Editor>
          </MemoryRouter>
        </div>
      );
      context.getByText = getByText;
      context.container = container;
      context.getByTestId = getByTestId;
      
    });
    
    test<RenderContext>('then I expect the component should not render',async  ({getByText}) => {
      //Assert
      expect(getByText('Loading...')).not.toBeEmptyDOMElement();
    });
  });
});


describe('Given a nested path', async () => {
  //Arrange
  const givenPath = '/about/learn-more';
  const givenPageLayouts:LocalData.PageLayouts = [
    {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
    {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
    {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'' },
  ] as LocalData.LoadedPageLayout[];

  describe('when rendering the breadcrumb component', async () => {  
    //Act
    interface RenderContext {
      container:HTMLElement;
      getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement
      getByText:  (id: Matcher, options?: SelectorMatcherOptions | undefined) => HTMLElement
    }

    beforeEach<RenderContext>(async (context) => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      const {container,getByTestId,getByText} = render(
        <div data-testid="testHarness">
          <MemoryRouter initialEntries={[givenPath]}>
            <Editor resolver={{Breadcrumbs}} enabled={true}>
              <Frame>
                <Breadcrumbs separator=">" /> 
              </Frame>
            </Editor>
          </MemoryRouter>
        </div>
      );
      context.getByText = getByText;
      context.container = container;
      context.getByTestId = getByTestId;
      
    });
    
    test<RenderContext>('then I expect the component should render',async  ({getByTestId}) => {
      //Assert
      expect(getByTestId('testHarness')).not.toBeEmptyDOMElement();
    });

    test<RenderContext>('then I expect the component should match each element in the path',async  ({getByText}) => {
      //Assert
      expect(getByText(givenPageLayouts[0].title)).not.toBeEmptyDOMElement();
      expect(getByText(givenPageLayouts[1].title)).not.toBeEmptyDOMElement();
      expect(getByText(givenPageLayouts[2].title)).not.toBeEmptyDOMElement();
    });
  });
});
