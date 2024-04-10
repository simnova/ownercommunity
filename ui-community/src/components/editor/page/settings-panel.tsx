import React from 'react';
import { useEditor } from '@craftjs/core';
import { Button, Collapse } from 'antd';

const { Panel } = Collapse;

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selectedNode = null;
    if (currentNodeId) {
      selectedNode = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: state.nodes[currentNodeId].data.custom.isDeletable ?? query.node(currentNodeId).isDeletable()
      };
    }
    return {
      selected: selectedNode
    };
  });

  return (
    <Collapse defaultActiveKey={['1']} expandIconPosition="right">
      {!selected ? (
        <Panel header="No Node Selected" key="1">
          <p>Select a node to see its settings</p>{' '}
        </Panel>
      ) : (
        <Panel header={selected.name} key="1">
          {(selected?.settings && React.createElement(selected.settings)) || <>No settings</>}
          {(selected.isDeletable && (
            <Button
              style={{ color: '#fff', backgroundColor: '#ff0000', borderRadius: '5px' }}
              onClick={() => actions.delete(selected.id)}
            >
              Delete
            </Button>
          )) || <>Cannot Delete</>}
        </Panel>
      )}
    </Collapse>
  );
};
