import { createLocalStorageStateHook } from 'use-local-storage-state';
import { matchRoutes } from 'react-router-dom';

 export interface LoadedPageLayout {
  id: string;
  title: string;
  pageType: string;
  path: string;
  expanded: boolean;
  parent: string;
  layout: any;
}
export interface UnloadedPageLayout {
  loaded: boolean;
}
export type PageLayouts = LoadedPageLayout[]|UnloadedPageLayout[];

export const usePageLayouts = createLocalStorageStateHook<PageLayouts>('pageLayouts',[{loaded:false}]);

export const arePageLayoutsLoaded = (pageLayouts: PageLayouts): pageLayouts is LoadedPageLayout[] => {
  return pageLayouts !== undefined && pageLayouts.length > 0 && (pageLayouts[0] as LoadedPageLayout).id !== undefined;
}
/**
 * Used to generate the ancestors of a page based on the current path.
 * @param pageLayouts 
 * @param currentPath 
 * @returns an array of ancestors with the first element being the root page, and the last element being the current page, paths get rewritten to match the current path.)
 */
export const getAncestors = (pageLayouts: LoadedPageLayout[], currentPath: string): LoadedPageLayout[] => {
  const pathSegments = currentPath.split('/').filter(i => i);
  const ancestors = matchPageToEachSegmentInPath(pathSegments, pageLayouts);
  matchPageToRoot(ancestors, pageLayouts);
  const uniqueAncestors = removeAncestorsWithIdenticalPagesKeepingOnlyLongestPatchMatch(ancestors);
  return uniqueAncestors; 
};


function removeAncestorsWithIdenticalPagesKeepingOnlyLongestPatchMatch(ancestors: LoadedPageLayout[]) {
  const tempAncestors:(LoadedPageLayout|undefined)[] = [...ancestors];
  tempAncestors.forEach((ancestor, index) => {
    const sameIdAncestors = tempAncestors.filter(x => x?.id === ancestor?.id);
    if (sameIdAncestors.length > 1) {
      const longest = sameIdAncestors.reduce((prev, current) => (prev?.path.split('/').length ?? 0) > (current?.path.split('/').length ?? 0) ? prev : current) as LoadedPageLayout;
      tempAncestors[index] = longest; //replace the current ancestor with the longest one

      //make all the other sameIdAncestors undefined
      sameIdAncestors.forEach((x, i) => {
        const longestIndex = tempAncestors.indexOf(longest);
        if (longestIndex && i !== longestIndex) {
          tempAncestors[tempAncestors.indexOf(x)] = undefined;
        }
      });
    }
  });
  const uniqueAncestors = tempAncestors.filter((x): x is LoadedPageLayout => x !== undefined);
  return uniqueAncestors;
}

function matchPageToRoot(ancestors: LoadedPageLayout[], pageLayouts: LoadedPageLayout[]) {
  const rootRoute = matchRoutes(pageLayouts, '/')?.[0].route;
  if (rootRoute) {
    ancestors.unshift(rootRoute);
  }
}

function matchPageToEachSegmentInPath(pathSegments: string[], pageLayouts: LoadedPageLayout[]): LoadedPageLayout[] {
  return pathSegments.map((_, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const matchedLayout = matchRoutes(pageLayouts, url)?.[0].route;
    if (matchedLayout) {
      return { ...matchedLayout, path: url } as LoadedPageLayout;
    }else{
      return undefined;
    }
  }).filter(x => x !== undefined) as LoadedPageLayout[];
}