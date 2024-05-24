import React from 'react';
import { DesignerElementDataDTO } from '@repo/designer/types/designer.types';
import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface DesignerElementProps {
  element: DesignerElementDataDTO;
}

const DesignerElement: React.FC<DesignerElementProps> = ({ element }) => {
  const { name, html_tag: HtmlTag, style, tailwindStyle, children, attributes } = element;

  // Render children recursively
  const renderChildren = (children: Array<DesignerElementDataDTO | string> | undefined) => {
    if (!children) return null;

    return children.map((child, index) => {
      if (typeof child === 'string') {
        return child; // Render text node
      } else {
        return <DesignerElement key={index} element={child} />; // Render nested DesignerElement
      }
    });
  };

  const isVoidElement = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(name);

  // Apply draggable attributes
  const draggable = useDraggable({
    id: element.element_id + '-draggable',
    data: element
  });

  const mergedAttributes = { ...attributes, ...draggable.attributes };

  const dndStyle = {
    transform: CSS.Translate.toString(draggable.transform),
  };

  if (isVoidElement) {
    return <HtmlTag style={{ ...style }} {...mergedAttributes} {...draggable.listeners} ref={draggable.setNodeRef} />;
  } else {
    return (
      <HtmlTag style={{ ...style }} {...mergedAttributes} {...draggable.listeners} ref={draggable.setNodeRef}>
        {renderChildren(children)}
      </HtmlTag>
    );
  }
};

export default DesignerElement;
