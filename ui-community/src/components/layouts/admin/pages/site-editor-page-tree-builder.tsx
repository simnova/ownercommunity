import SortableTree from '@nosferatu500/react-sortable-tree';
import { Button } from 'antd';
import { FC } from 'react';

interface SiteEditorPageTreeBuilderProps {
  treeData: Array<any>;
  setTreeData: any;
  setNewNode: any;
  showModal: any;
  removeNodeAtPath: any;
  keyFromTreeIndex: any;
  onClickPage: any;
  selectedNode: any;
  addNewTree:any
}

const canDrop = ({ nextParent, nextPath }: any) => {
  // ensure only one root node or if targeted node is a listing/details page
  return !(nextPath.length === 1 || nextParent.pageType === 'Listing' || nextParent.pageType === 'Details');
};

const canDrag = ({ node }: any) => {
  return node.pageType !== 'Details';
};

export const SiteEditorPageTreeBuilder: FC<SiteEditorPageTreeBuilderProps> = (props) => {
  const renderTree = () => {
    console.log('Asdf');

    if (props.treeData?.length === 0) {
      return <Button onClick={props.addNewTree}>Add new page</Button>;
    } else {
      return (
        <SortableTree
          treeData={props.treeData}
          onChange={props.setTreeData}
          canDrop={canDrop}
          canDrag={canDrag}
          canNodeHaveChildren={(node: any) => node.pageType !== 'Listing' || node.pageType !== 'Details'}
          generateNodeProps={({ node, path }) => {
            let buttons = [
              <Button
                onClick={() => {
                  props.setNewNode({ parent: node.id, pageName: 'New Page' });
                  props.showModal(node);
                }}
              >
                Add Child
              </Button>,
              <Button
                onClick={() => {
                  const newTreeData = props.removeNodeAtPath({
                    treeData: props.treeData,
                    path: path,
                    getNodeKey: props.keyFromTreeIndex
                  });
                  // onClickPage(null,null);
                  props.setTreeData(newTreeData);
                }}
              >
                Remove
              </Button>
            ];
            if (node.pageType === 'Listing') {
              buttons.shift();
            }

            return {
              onClick: () => {
                props.onClickPage(node, path);
              },
              style: {
                borderColor: node.id === props.selectedNode?.id ? 'blue' : '#fff',
                borderWidth: node.id === props.selectedNode?.id ? '2px' : '1px',
                borderStyle: 'solid'
              },
              buttons: node.pageType === 'Details' ? [<></>] : buttons
            };
          }}
        />
      );
    }
  };
  return <>{renderTree()}</>;
};
