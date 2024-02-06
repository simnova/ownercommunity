import { describe, it, expect, vi } from 'vitest';
import { render} from '@testing-library/react';
import { Download } from './download';
import { Editor } from '@craftjs/core';
import * as LocalData from '../page-layout';

describe('Given the download component', async () => {
  //Arrange
  describe('when provided empty page layouts', async () => {
    //Act
    const usePageLayoutsSpy = vi.spyOn(LocalData, 'usePageLayouts');
    const givenEmptyPageLayouts  = [{loaded:false } as LocalData.UnloadedPageLayout] as LocalData.PageLayouts;
  
    usePageLayoutsSpy.mockReturnValue([
      givenEmptyPageLayouts,
      {} as any,
      {} as any
    ]);

    const { getByTestId } = render(
      <div data-testid="testHarness">
        <Editor >
          <Download />
        </Editor>
      </div>
    );
    it('then the component should not be rendered',async  () => {
      //Assert
      (expect(getByTestId('testHarness')) as any).toBeEmptyDOMElement();
    });
  });
});