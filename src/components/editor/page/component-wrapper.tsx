import { useEditor, useNode } from '@craftjs/core';
import { useEffect } from 'react';

export const ComponentWrapper = ({render}:any) => {
  const { id } = useNode();
  const { query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));
  const {
    isHover,
    dom,
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
        dom.classList.remove('border-transparent');
        dom.classList.add('border-cyan-500','border-2');
      }
      else {
        dom.classList.remove('border-cyan-500');
        dom.classList.add('border-transparent');
      }
    
    }
  }, [dom,id, isActive, isHover]);
  return (
    <div className="bg-slate-50" style={{display:'flex', flex:'1', alignItems:'stretch', flexDirection:'column'}}>
      hey
      {render}
    </div>
  )
}