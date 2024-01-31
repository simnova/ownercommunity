import { describe, it, expect, vi } from 'vitest';
import { render, getByTestId, waitFor, getByText } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Download } from './download';
import { Editor } from '@craftjs/core';
import * as LocalData from '../local-data';

describe('Given the Download component', () => {
  describe('when page layouts are not loaded', () => {
    it('then the component should not be rendered.', () => {
      //Arrange
      const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
      usePageLayoutsSpy.mockReturnValue([
        [{loaded:false } as LocalData.UnloadedPageLayout] as LocalData.PageLayouts,
        {} as any,
        {} as any
      ]);
      //Act
      const {container} = render(
        <div data-testid="testHarness">
          <Editor>
            <Download />
          </Editor>
        </div>
      );
      //Assert
      (expect(getByTestId(container,'testHarness')) as any).toBeEmptyDOMElement();
    });
  });

  describe('when page layouts are loaded', () => {
    it('then the component should be rendered.', () => {
      //Arrange
      const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
      const givenPageLayouts  = [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout] as LocalData.PageLayouts;
      usePageLayoutsSpy.mockReturnValue([
        givenPageLayouts,
        {} as any,
        {} as any
      ]);
      //Act
      const {container} = render(
        <div data-testid="testHarness">
          <Editor>
            <Download />
          </Editor>
        </div>
      );
      //Assert
      (expect(getByTestId(container,'testHarness')) as any).not.toBeEmptyDOMElement();
    });
  });

  describe('when Get Site JSON button is clicked', async () => {
    
    //Arrange
    const user = userEvent.setup();
    let clipboardSpy = vi.spyOn(navigator.clipboard, "writeText");  
    const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
    const givenPageLayouts  = [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LocalData.LoadedPageLayout] as LocalData.PageLayouts;
    usePageLayoutsSpy.mockReturnValue([
      givenPageLayouts,
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

    //Act
    await user.click(getByTestId(container,'get-site-json'));

    it('then the clipboard should contain the JSON of given pagelayouts.',async  () => {
      //Assert
      await waitFor(() => 
       expect(clipboardSpy).toHaveBeenCalledWith(JSON.stringify(givenPageLayouts))
      );
    });
    it('then a message should be shown to the user.',async  () => {
      //Assert
      await waitFor(() => 
        expect(screen.getByText('The JSON has been copied to your clipboard')).toBeInTheDocument()
      );

    });
  });
});