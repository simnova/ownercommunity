import React, {useState} from "react";
import SortableTree, {getFlatDataFromTree, getTreeFromFlatData} from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {usePageLayouts} from "./editor/local-data";
import { Button } from "antd";
import {Form, Input, FormInstance} from "antd";

const PageTree: React.FC = (props) => {
  const formRef = React.createRef<FormInstance>();
  const [pageLayouts, setPageLayouts] = usePageLayouts();

  var buildTree = (flatPageLayouts:any)  => {
    return getTreeFromFlatData({
          flatData: flatPageLayouts.map((pageLayout:any) => ({...pageLayout, title: pageLayout.title})),
          getKey: (node) => node.id,
          getParentKey: (node) => node.parent,
          rootKey: 'ROOT',
        
    });
  }
  const [flatData, setFlatData] = useState<any>(pageLayouts);
  const [treeData, setTreeData] = useState<any>(buildTree(pageLayouts));
  const [selectedPage,setSelectedPage] = useState<any>(null);

  const onClickPage = (page:any) => {
    setSelectedPage(page.id);
    formRef.current!.setFieldsValue({
      title: page.title,
    });
  }
 
  var flattenTree = (treePageLayouts:any) => {
    return getFlatDataFromTree({
      treeData: treePageLayouts,
      getNodeKey: ({node}) => node.id,
      ignoreCollapsed: false,
    }).map(({node, path}) => {
      var nodeWithoutChildren =  JSON.parse(JSON.stringify(node));
      nodeWithoutChildren.children = undefined;
      return {
        ...nodeWithoutChildren,
        parent: path.length > 1 ? path[path.length - 2] : 'ROOT'
      };
    });
  }

    return <>
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          onChange={(updateTree) => setTreeData(updateTree  as any)}
          generateNodeProps={({node, path}) => {
            return {
              onClick: () => {
                console.log(node);
                console.log(path);
                onClickPage(node)
               // setSelectedPage(node.id);
               // formRef.current!.resetFields();
              },
              style: {
                borderColor: node.id === selectedPage ? 'blue' : '#fff',
                borderWidth: node.id === selectedPage ? '2px' : '1px',
                borderStyle: 'solid',
              },
            }
          }}  
        />
      </div>
      <div>
        {selectedPage ?
        
        <Form
          ref={formRef}
          initialValues={{
            title: flatData.find((x:any) => x.id == selectedPage).title,
          }}
          onFinish={(values) => {
            console.log(values);
            let flatTemp = flattenTree(treeData);
            let pageLayout = flatTemp.find((x:any) => x.id == selectedPage);
            pageLayout.title = values.title;
            setTreeData(buildTree(flatTemp));
          }}
        >
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>  
          <Button type="primary" htmlType="submit">
            Save Page Changes
          </Button>
        </Form> 
        : <div>Select a page to edit</div>}
      </div>
      <Button type="primary" onClick={() => setPageLayouts(flattenTree(treeData) as any)}>Save</Button>
      <h1>Initial Tree Data</h1>
      <hr   />
      {pageLayouts ? JSON.stringify(buildTree(pageLayouts)) : 'none'}
      <hr   />
      <h1>Updated Tree Data</h1>
      <hr   />
      {flatData ? JSON.stringify(treeData) : 'none'}
      <h1>Updated Flat Data</h1>
      <hr   />
      {flatData ? JSON.stringify(flattenTree(treeData)) : 'none'}
      <hr   />
    </>
}
export { PageTree };
