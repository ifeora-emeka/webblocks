import React, { useState } from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import { Box } from '@chakra-ui/react'

interface DesignerElementProps {
  element: DndElementData
  id: string
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const [isActive, setIsActive] = useState(false)
  const { name, html_tag, style, attributes, chakraProps } = element.element_data;
  const children = element.children_dnd_element_data;

  const renderChildren = (
    children: Array<DndElementData | string> | undefined,
  ) => {
    if (!children) return null

    return children.map((child) => {
      if (typeof child === 'string') {
        return child
      } else {
        return (
          <ElementRenderer
            key={child.dnd_id}
            element={child}
            id={child.dnd_id}
          />
        )
      }
    })
  }

  const isVoidElement =
    /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(
      name,
    )

  const draggable = useSortable({
    id: element.element_data.element_id,
    data: element,
    disabled: element.is_draggable,
  })

  const mergedAttributes = { ...attributes, ...draggable.attributes }

  const dndStyle = {
    transform: CSS.Transform.toString(draggable.transform),
    transition: draggable.transition,
  }

  // if (isVoidElement) {
  //   return <Box {...mergedAttributes} style={{ ...style, ...dndStyle }}  {...draggable.listeners} ref={draggable.setNodeRef} onClick={() => setIsActive(!isActive)} />;
  // } else {
  return (
    <>
      <Box
        as={html_tag}
        style={{ ...style, ...dndStyle }}
        {...draggable.listeners}
        ref={draggable.setNodeRef}
        onClick={() => setIsActive(!isActive)}
        {...chakraProps}
        {...mergedAttributes}
      >
        {renderChildren(children)}
      </Box>
    </>
  )
  // }
}

export default ElementRenderer
