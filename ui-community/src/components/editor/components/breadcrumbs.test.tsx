import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen} from '@testing-library/react';
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
  const givenPageLayouts:LocalData.PageLayouts = [{loaded:false} as UnloadedPageLayout];

  describe('when rendering the breadcrumb component', async () => {  
    //Act
    beforeEach(async () => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
       render(
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
    });
    
    test('then I expect the component should not render',async  () => {
      //Assert
      expect(screen.getByText('Loading...')).not.toBeEmptyDOMElement();
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
    beforeEach(async () => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      render(
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
    });
    
    test('then I expect the component should render',async  () => {
      //Assert
      expect(screen.getByTestId('testHarness')).not.toBeEmptyDOMElement();
    });

    test('then I expect the last breadcrumb to not be a hyperlink',async  () => {
      //Assert
      expect(screen.queryByRole('link', {name:givenPageLayouts[2].title})).toBeNull;
      expect(screen.getByText(givenPageLayouts[2].title)).not.toBeEmptyDOMElement();
    });

    test('then I expect the component should match each element in the path',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenPageLayouts[0].title})).not.toBeEmptyDOMElement();
      expect(screen.getByRole('link', {name:givenPageLayouts[1].title})).not.toBeEmptyDOMElement();
    });

    
  });
});


describe('Given a nested path and home page title', async () => {
  //Arrange
  const givenHomePageTitle = 'MyHome';
  const givenPath = '/about/learn-more';
  const givenPageLayouts:LocalData.PageLayouts = [
    {id:'1', parent:'ROOT', title:'Company Page',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
    {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
    {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'' },
  ] as LocalData.LoadedPageLayout[];

  describe('when rendering the breadcrumb component and overriding homepage title', async () => {  
    //Act
    beforeEach(async () => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      render(
        <div data-testid="testHarness">
          <MemoryRouter initialEntries={[givenPath]}>
            <Editor resolver={{Breadcrumbs}} enabled={true}>
              <Frame>
                <Breadcrumbs separator=">" homePageTitle={givenHomePageTitle} /> 
              </Frame>
            </Editor>
          </MemoryRouter>
        </div>
      );
    });
    
    test('then I expect the component should render',async  () => {
      //Assert
      expect(screen.getByTestId('testHarness')).not.toBeEmptyDOMElement();
    });

    test('then I expect the title of the first breadcrumb to be overridden',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenHomePageTitle})).not.toBeEmptyDOMElement();
    });

    test('then I expect the last breadcrumb to not have a hyperlink',async  () => {
      //Assert
      expect(screen.queryByRole('link', {name:givenPageLayouts[0].title})).toBeNull;
      expect(screen.getByText(givenPageLayouts[2].title)).not.toBeEmptyDOMElement();
    });

    test('then I expect other breadcrumbs to be rendered',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenPageLayouts[1].title})).not.toBeEmptyDOMElement();
    });

    test('then I expect the given page layouts not to be modified',async  () => {
      //Assert
      expect(givenPageLayouts[1].title).not.toBe(givenHomePageTitle);
    });
  });
});


describe('Given a nested path with dynamic segments', async () => {
  //Arrange
  const givenPath = '/units/627ad63f73ca0039b79248aa';
  const givenPageLayouts:LocalData.PageLayouts = [
    {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
    {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
    {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
    {id:'4', parent:'3', title:'units',pageType:'List',path:'/units',expanded:false, layout:'xxx' },
    {id:'5', parent:'4', title:'Details Page',pageType:'Details',path:'/units/:propertyId/*',expanded:false,layout:'xxx' },
  ] as LocalData.LoadedPageLayout[];

  describe('when rendering the breadcrumb component', async () => {  
    //Act
    beforeEach(async () => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      render(
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
    });
   
    
    test('then I expect the component should render',async  () => {
      screen.logTestingPlaygroundURL();
      //Assert
      expect(screen.getByTestId('testHarness')).not.toBeEmptyDOMElement();
    });

    test('then I expect the breadcrumbs for each element in the path',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenPageLayouts[0].title})).not.toBeEmptyDOMElement();
      expect(screen.getByRole('link', {name:givenPageLayouts[3].title})).not.toBeEmptyDOMElement();
      expect(screen.getByText(givenPageLayouts[4].title)).not.toBeEmptyDOMElement();
    });

    test('then I expect not to see breadcrumbs for links not in the path',async  () => {
      //Assert
      expect(screen.queryByRole('link', {name:givenPageLayouts[1].title})).toBeNull();
      expect(screen.queryByRole('link', {name:givenPageLayouts[2].title})).toBeNull();
    });

    test('then I expect the breadcrumb links to should match each segment in the path',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenPageLayouts[0].title}).getAttribute('href')).toEqual(givenPageLayouts[0].path);
      expect(screen.getByRole('link', {name:givenPageLayouts[3].title}).getAttribute('href')).toEqual(givenPageLayouts[3].path);
      
    });
  });
});


describe('Given a nested path with dynamic segments and a slug', async () => {
  //Arrange
  const givenPath = '/units/627ad63f73ca0039b79248aa/the-little-cottage';
  const givenPageLayouts:LocalData.PageLayouts = [
    {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
    {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
    {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
    {id:'4', parent:'3', title:'units',pageType:'List',path:'/units',expanded:false, layout:'xxx' },
    {id:'5', parent:'4', title:'Details Page',pageType:'Details',path:'/units/:propertyId/*',expanded:false,layout:'xxx' },
  ] as LocalData.LoadedPageLayout[];

  describe('when rendering the breadcrumb component', async () => {  
    //Act
    beforeEach(async () => {
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      render(
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
    });
   
    
    test('then I expect the component should render',async  () => {
      screen.logTestingPlaygroundURL();
      //Assert
      expect(screen.getByTestId('testHarness')).not.toBeEmptyDOMElement();
    });

    test('then I expect the breadcrumbs for each element in the path',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenPageLayouts[0].title})).not.toBeEmptyDOMElement();
      expect(screen.getByRole('link', {name:givenPageLayouts[3].title})).not.toBeEmptyDOMElement();
      expect(screen.getByText(givenPageLayouts[4].title)).not.toBeEmptyDOMElement();
    });

    test('then I expect not to see breadcrumbs for links not in the path',async  () => {
      //Assert
      expect(screen.queryByRole('link', {name:givenPageLayouts[1].title})).toBeNull();
      expect(screen.queryByRole('link', {name:givenPageLayouts[2].title})).toBeNull();
    });

    test('then I expect the breadcrumb links to should match each segment in the path',async  () => {
      //Assert
      expect(screen.getByRole('link', {name:givenPageLayouts[0].title}).getAttribute('href')).toEqual(givenPageLayouts[0].path);
      expect(screen.getByRole('link', {name:givenPageLayouts[3].title}).getAttribute('href')).toEqual(givenPageLayouts[3].path);
      
    });
  });
});