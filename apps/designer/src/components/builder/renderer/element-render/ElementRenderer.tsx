'use client'
import React from 'react';
import { DesignerElementData, DesignerElementDataDTO } from '@repo/designer/types/designer.types'

interface DesignerElementProps {
  element: DesignerElementDataDTO;
}

const DesignerElement: React.FC<DesignerElementProps> = ({ element }) => {
  const { name, slug, description, html_tag: HtmlTag, style, tailwindStyle, children, attributes } = element;

  // Render children recursively
  const renderChildren = (children: Array<DesignerElementData | string> | undefined) => {
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

  if (isVoidElement) {
    return (
      <HtmlTag
        style={{ ...style, ...tailwindStyle }}
        {...attributes}
      />
    );
  } else {
    return (
      <HtmlTag
        style={{ ...style, ...tailwindStyle }}
        {...attributes}
      >
        {renderChildren(children)}
      </HtmlTag>
    );
  }
};

export default DesignerElement;
