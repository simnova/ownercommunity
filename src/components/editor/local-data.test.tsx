import { describe, it, expect } from 'vitest';
import { arePageLayoutsLoaded, PageLayouts, UnloadedPageLayout, LoadedPageLayout, getAncestors } from './local-data';


describe('Given arePageLayoutsLoaded(pageLayouts)', () => {
  describe('when pageLayouts are undefined', () => {
    it('then the result should be false', () => {
      //arrange
      const pageLayouts:PageLayouts = undefined as any;
      //act
      const result = arePageLayoutsLoaded(pageLayouts);
      //assert
      expect(result).toBe(false);
    });
  });

  describe('when pageLayouts.loaded is false', () => {
    it('then the result should be false', () => {
      //arrange
      const pageLayouts:PageLayouts = [{loaded:false} as UnloadedPageLayout];
      //act
      const result = arePageLayoutsLoaded(pageLayouts);
      //assert
      expect(result, '').toBe(false);
    });
  });

  
  describe('when pageLayouts have a LoadedPageLayout', () => {
    it('the the result should be true', () => {
      //arrange
      const pageLayouts:PageLayouts = [{id:'123123',parent:'1', title:'title',pageType:'pageType',path:'yyy',expanded:false, layout:'xxx' } as LoadedPageLayout];
      //act
      const result = arePageLayoutsLoaded(pageLayouts);
      //assert
      expect(result).toBe(true);
    });
  });



  it('find ancestors', () => {
    //arrange
    const pageLayouts:LoadedPageLayout[] = [
      {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
      {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
      {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
    ];
    const currentPath = '/about/learn-more';
    //act
    const result = getAncestors(pageLayouts,currentPath);
    //assert
    expect(result).toEqual(pageLayouts);
  });

  it('find ancestors and replace path with actual url', () => {
    //arrange
    const pageLayouts:LoadedPageLayout[] = [
      {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
      {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
      {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
      {id:'4', parent:'1', title:'units',pageType:'List',path:'/units',expanded:false, layout:'xxx' },
      {id:'5', parent:'4', title:'Details Page',pageType:'Details',path:'/units/:propertyId/*',expanded:false,layout:'xxx' },
    ];
    const currentPath = '/units/627ad63f73ca0039b79248aa';
    const expectedResult4 = {...(pageLayouts[4]), path: '/units/627ad63f73ca0039b79248aa'};
    //act
    const result = getAncestors(pageLayouts,currentPath);
    //assert
    expect(result).toEqual([pageLayouts[0],pageLayouts[3],expectedResult4]);
  });

  it('find ancestors and replace path with actual url and remove duplicate matches', () => {
    //arrange
    const pageLayouts:LoadedPageLayout[] = [
      {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
      {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
      {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
      {id:'4', parent:'1', title:'units',pageType:'List',path:'/units',expanded:false, layout:'xxx' },
      {id:'5', parent:'4', title:'Details Page',pageType:'Details',path:'/units/:propertyId/*',expanded:false,layout:'xxx' },
    ];
    const currentPath = '/units/627ad63f73ca0039b79248aa/patricks-place';
    const expectedResult4 = {...(pageLayouts[4]), path: '/units/627ad63f73ca0039b79248aa/patricks-place'};
    //act
    const result = getAncestors(pageLayouts,currentPath);
    console.log(result);
    //assert
    expect(result).toEqual([pageLayouts[0],pageLayouts[3],expectedResult4]);
  });

  

});