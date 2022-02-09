import { createLocalStorageStateHook } from 'use-local-storage-state'

// Todos.tsx
export const usePages = createLocalStorageStateHook('pages',
  [
    {
      id: 0, title: 'Home', path: '/', expanded: true, children: [
        { id: 1, title: 'About', path: '/about' },
        { id: 2, title: 'Contact', path: '/contact' },
        { id: 3, title: 'Blog', path: '/blog' }
      ]
    }
  ]
)

const aboutLayout = "{\"ROOT\":{\"type\":{\"resolvedName\":\"Container\"},\"isCanvas\":true,\"props\":{},\"displayName\":\"Container\",\"custom\":{},\"hidden\":false,\"nodes\":[\"7p441K7aFC\",\"mr2xCnxsFC\"],\"linkedNodes\":{}},\"7p441K7aFC\":{\"type\":{\"resolvedName\":\"TextThing\"},\"isCanvas\":false,\"props\":{\"title\":\"Hello\",\"body\":\"World\",\"fontSize\":24},\"displayName\":\"TextThing\",\"custom\":{},\"parent\":\"ROOT\",\"hidden\":false,\"nodes\":[],\"linkedNodes\":{}},\"mr2xCnxsFC\":{\"type\":{\"resolvedName\":\"CountryInfo2\"},\"isCanvas\":false,\"props\":{\"country\":\"US\"},\"displayName\":\"CountryInfo2\",\"custom\":{},\"parent\":\"ROOT\",\"hidden\":false,\"nodes\":[],\"linkedNodes\":{}}}";

export const usePageLayouts = createLocalStorageStateHook('pageLayouts',
  [
    {id: '0', title:'Home', path:'/', layout: null, parent: 'ROOT'},
    {id: '1', title:'About', path:'about', layout: aboutLayout, parent: '0'},
    {id: '2', title:'Contact', path: 'contact', layout: null, parent: '0'},
    {id: '3', title:'Blog', path: 'blog', layout: null, parent: '0'}
  ]
)