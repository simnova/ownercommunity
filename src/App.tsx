import {Button} from 'antd'
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import PageEditor from './components/page-editor';
import Home from './components/home';
import CmsPage from './components/cms-page';
import { PageTree } from './components/page-tree';

function App() {
  return (
    <>
      <div className='greeny'>Hi there</div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="pageEditor" element={<PageEditor />} />
        </Route>
        <Route path="pageTree" element={<PageTree />} />
        <Route path="*" element={<CmsPage />} /> 
      </Routes>
      <div>
        <Button type="primary" >Button</Button>
      </div>
    </>
  );
}

export default App;
