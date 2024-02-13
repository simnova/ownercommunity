import {
  addNodeUnderParent,
  changeNodeAtPath,
  getFlatDataFromTree,
  getNodeAtPath,
  getTreeFromFlatData,
  removeNodeAtPath
} from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app
import { Button, Col, Collapse, Modal, Row, Typography, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePageLayouts } from '../../../editor/page-layout';

import uniqid from 'uniqid';
import { DetailsPageDetails } from '../../../editor/tree/details-page-details';
import { PageDetails } from '../../../editor/tree/page-details';
import { SiteEditorPageTreeBuilder } from './site-editor-page-tree-builder';

const { Title } = Typography;
const { Panel } = Collapse;

const buildTree = (flatPageLayouts: any) => {
  return getTreeFromFlatData({
    flatData: flatPageLayouts.map((pageLayout: any) => ({ ...pageLayout, title: pageLayout.title })),
    getKey: (node) => node.id,
    getParentKey: (node) => node.parent,
    rootKey: 'ROOT'
  });
};

const SiteEditorPageTree: React.FC = () => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const [treeData, setTreeData] = useState<Array<any>>([]);
  const [selectedNodePath, setSelectedNodePath] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [newNode, setNewNode] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    token: { colorTextBase }
  } = theme.useToken();
  const keyFromTreeIndex = ({ treeIndex }: any) => treeIndex;
  const keyFromTreeId = ({ node }: any) => node.id;

  useEffect(() => {
    if (pageLayouts) {
      const treeDataTemp = buildTree(pageLayouts);
      setTreeData(treeDataTemp);
    } else {
      setTreeData([]);
    }
  }, [pageLayouts]);

  const flattenTree = (treePageLayouts: any) => {
    return getFlatDataFromTree({
      treeData: treePageLayouts,
      getNodeKey: ({ node }) => node.id,
      ignoreCollapsed: false
    }).map(({ node, path }) => {
      let nodeWithoutChildren = JSON.parse(JSON.stringify(node)); //deep copy
      nodeWithoutChildren.children = undefined;
      return {
        ...nodeWithoutChildren,
        parent: path.length > 1 ? path[path.length - 2] : 'ROOT'
      };
    });
  };

  const showModal = (parentNode: any) => {
    console.log('showModal', parentNode);
    let invalidPageNames: string[] = [];
    if (parentNode.children) {
      invalidPageNames = parentNode.children.map((child: any) => child.pageName as string);
    }
    setNewNode({
      parent: parentNode.id,
      title: 'New Page',
      id: uniqid.time(),
      invalidPageNames: invalidPageNames
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getSiblingPageNames = (node: any, path: number[]): Array<string> => {
    const isRoot = path.length === 1;
    if (isRoot) {
      return treeData
        ?.map((sibling: any) => sibling.pageName as string)
        .filter((pageName: any) => pageName !== node.pageName);
    } else {
      const parentPath = path.slice(0, path.length - 1);
      const parentNode = getNodeAtPath({ treeData: treeData, path: parentPath, getNodeKey: keyFromTreeIndex })
        ?.node as any;
      const siblings = parentNode.children;
      return siblings
        .map((sibling: any) => sibling.pageName as string)
        .filter((pageName: any) => pageName !== node.pageName);
    }
  };

  const updatePathOnChildren = (node: any, currentPath: string) => {
    if (node.children) {
      node.children.forEach((child: any) => {
        let childPath = currentPath + '/';
        child.pageType === 'Details' ? (childPath += ':propertyId/*') : (childPath += child.pageName);
        child.path = childPath;
        updatePathOnChildren(child, childPath);
      });
    }
  };

  const onClickPage = ( path: any) => {
    const page = getNodeAtPath({ treeData: treeData, path: path, getNodeKey: keyFromTreeIndex })?.node;
    if (page) {
      page.invalidPageNames = getSiblingPageNames(page, path);
      console.log('page is not null');
    } else {
      console.log('page is null');
    }
    setSelectedNode(page);
    setSelectedNodePath(path);
  };

  const createDetailsPage = (treeData: any, parentNodeId: string) => {
    const newNode = {
      title: 'Details Page',
      pageType: 'Details',
      pageName: 'details',
      id: uniqid()
    };
    return addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: parentNodeId,
      ignoreCollapsed: true,
      expandParent: true,
      getNodeKey: keyFromTreeId,
      addAsFirstChild: true
    }).treeData;
  };

  const addNewTree = () => {

    setTreeData([{parent: "ROOT", id: 10, title: 'Home', path: '/', expanded: true, pageType:"Blank", children: [] }]);
  };

  return (
    <>
      <Modal title="Add Page" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <PageDetails
          data={newNode}
          saveData={function (data: { id: string; title: string; pageName: string; pageType: string }): void {
            newNode.title = data.title;
            newNode.pageType = data.pageType ?? 'Blank';
            newNode.pageName = data.pageName;
            console.log('saveData', data, newNode);
            let updatedTree = addNodeUnderParent({
              treeData: treeData,
              newNode: newNode,
              parentKey: newNode.parent,
              ignoreCollapsed: true,
              expandParent: true,
              getNodeKey: keyFromTreeId,
              addAsFirstChild: true
            }).treeData;
            //console.log('updatedTree',updatedTree);
            if (newNode.pageType === 'Listing') {
              updatedTree = createDetailsPage(updatedTree, newNode.id);
            }
            setTreeData(updatedTree as any);
            setIsModalVisible(false);
          }}
        />
      </Modal>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Row>
          <Col span={24} style={{ marginBottom: '24px' }}>
            <div
              className="inline-block"
              style={{
                color: colorTextBase
              }}
            >
              <Title level={5}>Pages</Title>
              Organize the pages on your site
            </div>
            <div style={{width:"100%", textAlign:"center"}}>
              <Button
                type="primary"
                onClick={() => {
                  treeData.forEach((node: any) => {
                    updatePathOnChildren(node, '');
                  });
                  setPageLayouts(flattenTree(treeData) as any);
                }}
              >
                Save
              </Button>
            </div>
            {/* <div className="float-right">
              
            </div> */}
          </Col>
        </Row>
        <Row style={{ display: 'flex', flexGrow: 1 }}>
          <Col span={18} style={{ border: '1px solid lightgrey', minHeight: '50vh' }}>
            <SiteEditorPageTreeBuilder
              treeData={treeData}
              setTreeData={setTreeData}
              setNewNode={setNewNode}
              showModal={showModal}
              removeNodeAtPath={removeNodeAtPath}
              keyFromTreeIndex={keyFromTreeIndex}
              onClickPage={onClickPage}
              selectedNode={selectedNode}
              addNewTree={addNewTree}
            />
          </Col>
          <Col span={6} style={{ backgroundColor: 'gray', minHeight: '100%' }}>
            <Collapse defaultActiveKey={['1']} expandIconPosition="right">
              <Panel header="Page Settings" key="1">
                {selectedNode?.pageType === 'Details' ? (
                  <>
                    <hr />
                    <DetailsPageDetails
                      data={selectedNode}
                      saveData={function (data: { id: string; title: string }): void {
                        const node = getNodeAtPath({
                          treeData: treeData,
                          path: selectedNodePath,
                          getNodeKey: keyFromTreeIndex
                        })?.node as any;
                        node.title = data.title;
                        const updatedTree = changeNodeAtPath({
                          treeData: treeData,
                          path: selectedNodePath,
                          newNode: node,
                          getNodeKey: keyFromTreeIndex
                        });
                        setTreeData(updatedTree);
                      }}
                    />
                  </>
                ) : selectedNode ? (
                  <>
                    <hr />
                    <PageDetails
                      data={selectedNode}
                      saveData={function (data: {
                        id: string;
                        title: string;
                        pageName: string;
                        pageType: string;
                      }): void {
                        const node = getNodeAtPath({
                          treeData: treeData,
                          path: selectedNodePath,
                          getNodeKey: keyFromTreeIndex
                        })?.node as any;
                        node.title = data.title;
                        node.pageType = data.pageType;
                        node.pageName = data.pageName;
                        const updatedTree = changeNodeAtPath({
                          treeData: treeData,
                          path: selectedNodePath,
                          newNode: node,
                          getNodeKey: keyFromTreeIndex
                        });
                        setTreeData(updatedTree);
                      }}
                    />
                  </>
                ) : (
                  <div>Select a page to edit</div>
                )}
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    </>
  );
};
export { SiteEditorPageTree as PageTree };
