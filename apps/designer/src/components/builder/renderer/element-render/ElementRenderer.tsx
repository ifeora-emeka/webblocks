import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'

// DELETE THIS FILE

interface DesignerElementProps {
  element: DndElementData
  id: string
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const isVoidElement = (tag: string) =>
    /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(tag);
  const { element_data, children_dnd_element_data } = element;
  const { html_tag, chakraProps, attributes, style } = element_data;
  const dispatch = useDispatch();
  const { active_dnd_id } = useSelector((state:RootState) => state.renderer)


  const renderChildren = (
    children: Array<DndElementData | string> | undefined,
  ) => {
    if (!children) return null;

    return children.map((child) => {
      if (typeof child === 'string') {
        return child;
      } else {
        return (
          <ElementRenderer
            key={child.dnd_id}
            id={child.dnd_id}
            element={child}
          />
        );
      }
    });
  };

  const isActive = active_dnd_id === element.dnd_id;

  if (isVoidElement(html_tag as string)) {
    return (
      <Box
        as={html_tag}
        {...(chakraProps as ChakraProps)}
        style={style}
        {...attributes}
        onClick={() => {
          dispatch(setRendererState({
            active_dnd_id: element.dnd_id
          }))
        }}
      />
    );
  }

  return (
    <Box
      as={html_tag}
      {...(chakraProps as ChakraProps)}
      style={style}
      {...attributes}
      className={cn(attributes.className, 'relative', {
        "element_selected shadow-lg": isActive
      })}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setRendererState({
          active_dnd_id: element.dnd_id
        }))
      }}
    >
      {isActive && <ElementToolBox />}
      {attributes.innerText}
      {renderChildren(children_dnd_element_data)}
    </Box>
  );
}

export default ElementRenderer;

const ElementToolBox = () => {
  return <div className={'bg-card absolute p-2 rounded-md shadow-lg border z-50 min-w-[200px] min-h-10 -top-12 right-2 border-border'} onClick={e => {
    e.stopPropagation();
  }}>

  </div>
}