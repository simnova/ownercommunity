import { createLocalStorageStateHook } from 'use-local-storage-state'

// Todos.tsx
export const usePages = createLocalStorageStateHook('pages',
  [
    {
      id: 0, title: 'Home', path: '/', expanded: true, children: [
        { id: 11, title: 'About', path: '/about' },
        { id: 22, title: 'Contact', path: '/contact' },
        { id: 33, title: 'Blog', path: '/blog' }
      ]
    }
  ]
)

const aboutLayout = "{\"ROOT\":{\"type\":{\"resolvedName\":\"Container\"},\"isCanvas\":true,\"props\":{},\"displayName\":\"Container\",\"custom\":{},\"hidden\":false,\"nodes\":[\"7p441K7aFC\",\"mr2xCnxsFC\"],\"linkedNodes\":{}},\"7p441K7aFC\":{\"type\":{\"resolvedName\":\"TextThing\"},\"isCanvas\":false,\"props\":{\"title\":\"Hello\",\"body\":\"World\",\"fontSize\":24},\"displayName\":\"TextThing\",\"custom\":{},\"parent\":\"ROOT\",\"hidden\":false,\"nodes\":[],\"linkedNodes\":{}},\"mr2xCnxsFC\":{\"type\":{\"resolvedName\":\"CountryInfo2\"},\"isCanvas\":false,\"props\":{\"country\":\"US\"},\"displayName\":\"CountryInfo2\",\"custom\":{},\"parent\":\"ROOT\",\"hidden\":false,\"nodes\":[],\"linkedNodes\":{}}}";

export const usePageLayouts = createLocalStorageStateHook('pageLayouts',
  [
    { id: '10', title:'Home', pageName:'home', path:'/', layout: null, parent: 'ROOT' },
    { id: '11', title:'About', pageName:'about', path:'about', layout: aboutLayout, parent: '10' },
    { id: '12', title:'Contact',  pageName:'contact', path: 'contact', layout: null, parent: '10' },
    { id: '13', title:'Blog', pageName:'blog', path: 'blog', layout: null, parent: '10' }
  ]
)