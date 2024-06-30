import React from 'react';
import cxs from 'cxs';
import { DndElementData } from '@repo/designer/types/designer.types';

type Props = {
  element: DndElementData;
};

const FrameElementRenderer: React.FC<Props> = ({ element }) => {
  const renderElement = (el: DndElementData):React.ReactNode => {
    const { element_data, children_dnd_element_data } = el;
    const { html_tag: Tag, jss_style } = element_data;

    const isSelfClosingTag = (tag: string) => {
      const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
      return selfClosingTags.includes(tag);
    };

    const dynamicStyles = cxs(jss_style);

    const children = children_dnd_element_data?.map(child => renderElement(child));

    return React.createElement(
      Tag,
      {
        key: el.dnd_id,
        ...element_data.attributes,
        className: dynamicStyles,
        style: jss_style
      },
      isSelfClosingTag(Tag as any) ? null : children
    );
  };

  return (
    <>
      {renderElement(element)}
    </>
  );
};

export default FrameElementRenderer;
