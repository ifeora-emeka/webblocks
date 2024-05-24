import React from 'react';
import { DesignerElementDataDTO } from '@repo/designer/types/designer.types';
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'

interface DesignerElementProps {
  element: DesignerElementDataDTO;
  id: string;
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const { name, html_tag: HtmlTag, style, tailwindStyle, children, attributes } = element;

  const renderChildren = (children: Array<DesignerElementDataDTO | string> | undefined) => {
    if (!children) return null;

    return children.map((child) => {
      if (typeof child === 'string') {
        return child;
      } else {
        return <ElementRenderer key={child.element_id} element={child} id={child.element_id} />;
      }
    });
  };

  const isVoidElement = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(name);

  const draggable = useSortable({
    id: element.element_id,
    data: element
  });

  const mergedAttributes = { ...attributes, ...draggable.attributes };

  const dndStyle = {
    transform: CSS.Transform.toString(draggable.transform),
    transition: draggable.transition,
  };

  let tailwindClasses = Object.values(element.tailwindStyle).join(' ')

  console.log('TAILWIND CLASSES::', {tailwindClasses, obj: element.tailwindStyle })

  if (isVoidElement) {
    return <HtmlTag {...mergedAttributes} style={{ ...style, ...dndStyle }}  {...draggable.listeners} ref={draggable.setNodeRef} className={cn(tailwindClasses)} />;
  } else {
    return (
      <HtmlTag {...mergedAttributes} style={{ ...style, ...dndStyle }}  {...draggable.listeners} ref={draggable.setNodeRef} className={cn(tailwindClasses)}>
        {renderChildren(children)}
      </HtmlTag>
    );
  }
};

export default ElementRenderer;
