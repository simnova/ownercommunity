import React, {useState,useEffect} from "react";
import SortableTree, {getFlatDataFromTree, getTreeFromFlatData, getNodeAtPath, changeNodeAtPath, removeNodeAtPath,addNodeUnderParent} from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {usePageLayouts} from "../../../editor/local-data";
import { Modal, Button ,Row, Col, Collapse,Typography } from 'antd';
import { useEditor } from '@craftjs/core';

import { PageDetails, PageDetailsPropTypes } from "../../../editor/tree/page-details";
import { DetailsPageDetails } from "../../../editor/tree/details-page-details";
import uniqid from 'uniqid';

const { Title } = Typography;
const { Panel } = Collapse;

const SiteEditorPageTree: React.FC = (props) => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const keyFromTreeIndex = ({ treeIndex }:any) => treeIndex;
  const keyFromTreeId = ({ node }:any) => node.id;

  const buildTree = (flatPageLayouts:any)  => {
    return getTreeFromFlatData({
      flatData: flatPageLayouts.map((pageLayout:any) => ({...pageLayout, title: pageLayout.title})),
      getKey: (node) => node.id,
      getParentKey: (node) => node.parent,
      rootKey: 'ROOT',
    });
  }

  const flattenTree = (treePageLayouts:any) => {
    return getFlatDataFromTree({
      treeData: treePageLayouts,
      getNodeKey: ({node}) => node.id,
      ignoreCollapsed: false,
    }).map(({node, path}) => {
      let nodeWithoutChildren =  JSON.parse(JSON.stringify(node)); //deep copy
      nodeWithoutChildren.children = undefined;
      return {
        ...nodeWithoutChildren,
        parent: path.length > 1 ? path[path.length - 2] : 'ROOT'
      };
    });
  }

  const [treeData, setTreeData] = useState<Array<any>>(buildTree(pageLayouts));
  const [selectedNodePath,setSelectedNodePath] = useState<any>(null);
  const [selectedNode,setSelectedNode] = useState<any>(null);
  const [newNode,setNewNode] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (parentNode:any) => {
    console.log('showModal',parentNode);
    var invalidPageNames: string[] = [];
    if(parentNode.children){
      invalidPageNames = parentNode.children.map((child:any) => child.pageName as string);
    }
    setNewNode({
      parent: parentNode.id,
      title: 'New Page',
      id: uniqid.time(),
      invalidPageNames : invalidPageNames
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getSiblingPageNames = (node:any, path:number[]) : Array<string> => {
    const isRoot = path.length === 1;
    if(isRoot) {
      return treeData.map((sibling:any) => sibling.pageName as string).filter((pageName:any) => pageName !== node.pageName);
    } else {
      const parentPath =  path.slice(0,path.length-1);
      const parentNode = getNodeAtPath({treeData: treeData, path: parentPath, getNodeKey: keyFromTreeIndex})?.node as any;
      const siblings = parentNode.children;
      return siblings.map((sibling:any) => sibling.pageName as string).filter((pageName:any) => pageName !== node.pageName);
    }
  }

  const updatePathOnChildren = (node:any, currentPath:string) => {
    if(node.children) {
      node.children.forEach((child:any) => {
        var childPath = currentPath + "/";
        child.pageType === 'Details' ? childPath += ":propertyId/*" : childPath += child.pageName;
        child.path = childPath;
        updatePathOnChildren(child,childPath);
      });
    }
  }

  const onClickPage = (page2:any,path:any) => {
    const page = getNodeAtPath({treeData: treeData, path: path, getNodeKey: keyFromTreeIndex})?.node
    if(page) {
      page.invalidPageNames = getSiblingPageNames(page,path);
      console.log("page is not null")
    }else {
      console.log("page is null");
    }
    setSelectedNode(page);
    setSelectedNodePath(path);
  }

  const canDrop = ({ node, nextParent, prevPath, nextPath }:any) => {
    // ensure only one root node or if targeted node is a listing/details page
    if (nextPath.length === 1 || nextParent.pageType === 'Listing' || nextParent.pageType === 'Details') { 
      return false;
    }

    return true;
  }

  const canDrag = ({ node }: any) => {
    return node.pageType !== 'Details';
  }

  const createDetailsPage = (treeData: any, parentNodeId: string) => {
    const newNode = {
      title: 'Details Page',
      pageType: 'Details',
      pageName: 'details',
      id: uniqid(),
    }
    return addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: parentNodeId,
      ignoreCollapsed: true,
      expandParent: true,
      getNodeKey: keyFromTreeId,
      addAsFirstChild: true}).treeData;
  }
 
  return <>
    <Modal title="Add Page" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <PageDetails
        data={newNode}
        saveData={function (data: { id: string; title: string; pageName: string; pageType: string; }): void {
          newNode.title = data.title;
          newNode.pageType = data.pageType ?? 'Blank';
          newNode.pageName = data.pageName;
          console.log('saveData',data,newNode);
          var updatedTree = addNodeUnderParent({
            treeData: treeData,
            newNode:newNode, 
            parentKey: newNode.parent,
            ignoreCollapsed:true,
            expandParent:true,
            getNodeKey: keyFromTreeId,
            addAsFirstChild:true}).treeData;
          //console.log('updatedTree',updatedTree);
          if (newNode.pageType === 'Listing') { updatedTree = createDetailsPage(updatedTree,newNode.id); }
          setTreeData(updatedTree as any);
          setIsModalVisible(false);

        }}
      />
    </Modal>
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow:1 }}>
      <Row>
        <Col span={24} style={{marginBottom:'24px'}}>
          <div className='inline-block'>
            <Title level={5}>Pages</Title>
            Organize the pages on your site
          </div>
          <div className='float-right'>
            <Button 
              type="primary" 
              onClick={() => {
                treeData.forEach((node:any) => { updatePathOnChildren(node,''); });
                setPageLayouts(flattenTree(treeData) as any)
              }}>Save</Button>
          </div>
        </Col>
      </Row>    
      <Row style={{ display:'flex', flexGrow:1,  }}>
        <Col span={18} style={{border:'1px solid lightgrey'}}>
          <SortableTree
            treeData={treeData}
            onChange={setTreeData}
            canDrop={canDrop}
            canDrag={canDrag}
            canNodeHaveChildren={(node: any) => node.pageType !== 'Listing' || node.pageType !== 'Details'}
            generateNodeProps={({node, path}) => {
              let buttons = [
                <Button onClick={() => {
                  setNewNode({parent: node.id, pageName: "New Page"});
                  showModal(node);
                }}>
                  Add Child
                </Button>,
                <Button onClick={() =>{
                  var newTreeData = removeNodeAtPath({
                    treeData: treeData,
                    path: path,
                    getNodeKey: keyFromTreeIndex,
                  });
                // onClickPage(null,null);
                  setTreeData(newTreeData);
                  
                }}>
                  Remove
                </Button>
              ];
              if (node.pageType === 'Listing') {
                buttons.shift();
              }

              return {
                onClick: () => {
                  onClickPage(node,path);
                },
                style: {
                  borderColor: node.id === selectedNode?.id ? 'blue' : '#fff',
                  borderWidth: node.id === selectedNode?.id ? '2px' : '1px',
                  borderStyle: 'solid',
                },
                buttons: node.pageType === 'Details' ? [<></>] : buttons,
              }
            }}  
          />
        </Col>
        <Col span={6} style={{backgroundColor:'gray', minHeight:'100%'}}>
          <Collapse defaultActiveKey={['1']}  expandIconPosition="right">
            <Panel header="Page Settings" key="1">
            {selectedNode?.pageType === 'Details' ?
            <>
                <hr/>
                <DetailsPageDetails
                  data={selectedNode}
                  saveData={function (data: { id: string; title: string;}): void {
                    var node = getNodeAtPath({treeData: treeData, path: selectedNodePath, getNodeKey: keyFromTreeIndex})?.node as any;
                    node.title = data.title;
                    var updatedTree = changeNodeAtPath({treeData: treeData, path: selectedNodePath, newNode: node, getNodeKey: keyFromTreeIndex});
                    setTreeData(updatedTree);
                  }}
                />
              </>
              : selectedNode ?
              <>
                <hr/>
                <PageDetails
                  data={selectedNode}
                  saveData={function (data: { id: string; title: string; pageName: string; pageType: string;}): void {
                    var node = getNodeAtPath({treeData: treeData, path: selectedNodePath, getNodeKey: keyFromTreeIndex})?.node as any;
                    node.title = data.title;
                    node.pageType = data.pageType;
                    node.pageName = data.pageName;
                    var updatedTree = changeNodeAtPath({treeData: treeData, path: selectedNodePath, newNode: node, getNodeKey: keyFromTreeIndex});
                    setTreeData(updatedTree);
                  }}
                />
              </>
            : 
              <div>Select a page to edit</div>
            }

            </Panel>
          </Collapse>
        </Col>
      </Row>
      
    </div>
  </>
}
export { SiteEditorPageTree as PageTree };
