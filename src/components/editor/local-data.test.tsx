import { describe, it, expect } from 'vitest';
import { arePageLayoutsLoaded, PageLayouts, UnloadedPageLayout, LoadedPageLayout } from './local-data';


describe('Given arePageLayoutsLoaded(pageLayouts)', () => {
  describe('when pageLayouts are undefined', () => {
    it('then result should be false', () => {
      //arrange
      const pageLayouts:PageLayouts = undefined as any;
      //act
      const result = arePageLayoutsLoaded(pageLayouts);
      //assert
      expect(result).toBe(false);
    });
  });

  describe('when pageLayouts.loaded is false', () => {
    it('then result should be false', () => {
      //arrange
      const pageLayouts:PageLayouts = [{loaded:false} as UnloadedPageLayout];
      //act
      const result = arePageLayoutsLoaded(pageLayouts);
      //assert
      expect(result, '').toBe(false);
    });
  });

  
  describe('when pageLayouts have a LoadedPageLayout', () => {
    it('the result should be true', () => {
      //arrange
      const pageLayouts:PageLayouts = [{id:'123123', title:'title',pageType:'pageType',path:'yyy',expanded:false, children:[],layout:'xxx' } as LoadedPageLayout];
      //act
      const result = arePageLayoutsLoaded(pageLayouts);
      //assert
      expect(result).toBe(true);
    });
  });


});