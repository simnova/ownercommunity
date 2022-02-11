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
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="pageEditor" element={<PageEditor />} />
        </Route>
        <Route path="pageTree" element={<PageTree />} />
        <Route path="*" element={<CmsPage />} /> 
      </Routes>
    </>
  );
}

export default App;
