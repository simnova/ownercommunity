import { describe, it, expect } from 'vitest';
import { arePageLayoutsLoaded, PageLayouts, UnloadedPageLayout, LoadedPageLayout, getAncestors } from './page-layout';

describe('page-layout.arePageLayoutsLoaded', () => {

  describe('Given pageLayouts that are undefined', () => {
    //Arrange
    const pageLayouts:PageLayouts = undefined as any;
    describe('when determining if page layouts are loaded', () => {
      //Act
      const result = arePageLayoutsLoaded(pageLayouts);
      it('then the result should be false', () => {
        //Assert
        expect(result).toBe(false);
      });
    });
  });

  describe('Given pageLayouts that are not loaded', () => {
    //Arrange
    const pageLayouts:PageLayouts = [{loaded:false} as UnloadedPageLayout];
    describe('when determining if page layouts are loaded', () => {
      //Act
      const result = arePageLayoutsLoaded(pageLayouts);
      it('then the result should be false', () => {
        //Assert
        expect(result, '').toBe(false);
      });
    });
  });

  describe('Given pageLayouts that are loaded', () => {
    //Arrange
    const pageLayouts:PageLayouts = [{id:'123123',parent:'1', title:'title',pageType:'pageType',path:'yyy',expanded:false, layout:'xxx' } as LoadedPageLayout];
    describe('when determining if page layouts are loaded', () => {
      //Act
      const result = arePageLayoutsLoaded(pageLayouts);
      it('then the result should be true', () => {
        //Assert
        expect(result).toBe(true);
      });
    });
  });

});

describe('page-layout.generateAncestors', () => {

  describe('Given a nested path', () => {
    //Arrange
    const pageLayouts:LoadedPageLayout[] = [
      {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
      {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
      {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
    ];
    const currentPath = '/about/learn-more';
    describe('when determining ancestors', () => {
      //Act
      const result = getAncestors(pageLayouts,currentPath);
      it('then I expect ancestors to contain pagelayouts matching each segment.', () => {
        //Assert
        expect(result).toEqual(pageLayouts);
      });
    });
  });

  describe('Given a path with dynamic segments', () => {
    //Arrange
    const pageLayouts:LoadedPageLayout[] = [
      {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
      {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
      {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
      {id:'4', parent:'3', title:'units',pageType:'List',path:'/units',expanded:false, layout:'xxx' },
      {id:'5', parent:'4', title:'Details Page',pageType:'Details',path:'/units/:propertyId/*',expanded:false,layout:'xxx' },
    ];
    const originalPageLayouts = [...pageLayouts];
    const currentPath = '/units/627ad63f73ca0039b79248aa';
    const expectedResult4 = {...(pageLayouts[4]), path: '/units/627ad63f73ca0039b79248aa'};
    describe('when determining ancestors', () => {
      //Act
      const result = getAncestors(pageLayouts,currentPath);
      it('then I expect ancestors to contain pagelayouts matching each segment with updated paths', () => {
        //Assert
        expect(result).toEqual([pageLayouts[0],pageLayouts[3],expectedResult4]);
      });
      it('then I expect originalPageLayouts are unmodified', () => {
        //Assert
        expect(originalPageLayouts).toEqual(pageLayouts);
      });
    });
  });

  describe('Given a path contains dynamic segments and wildcard', () => {
    //Arrange
    const pageLayouts:LoadedPageLayout[] = [
      {id:'1', parent:'ROOT', title:'home',pageType:'pageType',path:'/',expanded:false,layout:'xxx' },
      {id:'2', parent:'1', title:'about',pageType:'pageType',path:'/about',expanded:false,layout:'xxx' },
      {id:'3', parent:'2', title:'learn more',pageType:'pageType',path:'/about/learn-more',expanded:false, layout:'xxx' },
      {id:'4', parent:'1', title:'units',pageType:'List',path:'/units',expanded:false, layout:'xxx' },
      {id:'5', parent:'4', title:'Details Page',pageType:'Details',path:'/units/:propertyId/*',expanded:false,layout:'xxx' },
    ];
    const originalPageLayouts = [...pageLayouts];
    const currentPath = '/units/627ad63f73ca0039b79248aa/patricks-place';
    const expectedResult4 = {...(pageLayouts[4]), path: '/units/627ad63f73ca0039b79248aa/patricks-place'};
    describe('when determining ancestors', () => {
      //Act
      const result = getAncestors(pageLayouts,currentPath);
      it('then I expect ancestors to contain pagelayouts matching each segment ignoring wildcards', () => {
        //Assert
        expect(result).toEqual([pageLayouts[0],pageLayouts[3],expectedResult4]);
      });
      it('then I expect originalPageLayouts are unmodified', () => {
        //Assert
        expect(originalPageLayouts).toEqual(pageLayouts);
      });
    });
  });
});