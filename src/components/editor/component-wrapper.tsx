import { useNode, useEditor } from '@craftjs/core';
import { useEffect } from 'react';
import { ROOT_NODE } from '@craftjs/utils';

export const ComponentWrapper = ({render}:any) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));
  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  useEffect(() => {
    if (dom ) {
      if ((isActive || isHover)) {
          dom.classList.add('border-cyan-500','border-2');
      }
      else {
        dom.classList.remove('border-cyan-500');
        dom.classList.add('border-transparent');
      }
    
    }
  }, [dom,id, isActive, isHover]);
  return (
    <div className="bg-slate-50">
      {render}
    </div>
  )
}