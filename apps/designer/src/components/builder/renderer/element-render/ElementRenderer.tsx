import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  moveElement,
  setRendererState,
} from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TbArrowDown, TbArrowUp, TbTrash } from 'react-icons/tb'

interface DesignerElementProps {
  element: DndElementData
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const isVoidElement = (tag: string) =>
    /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(
      tag,
    )

  const { element_data, children_dnd_element_data } = element
  const { html_tag, chakraProps, attributes, style } = element_data
  const dispatch = useDispatch()
  const { active_dnd_id } = useSelector((state: RootState) => state.renderer)

  const renderChildren = (children: Array<DndElementData> | undefined) => {
    if (!children) return null

    const sortedChildren = children.slice().sort((a, b) => {
      return a.index - b.index
    })

    return sortedChildren.map((child) => {
      return <ElementRenderer key={child.dnd_id} element={child} />
    })
  }

  const isActive = active_dnd_id === element.dnd_id

  if (isVoidElement(html_tag as string)) {
    return (
      <Box
        ds-index={element.index}
        as={html_tag}
        {...(chakraProps as ChakraProps)}
        style={style}
        {...attributes}
        onClick={() => {
          dispatch(
            setRendererState({
              active_dnd_id: element.dnd_id,
            }),
          )
        }}
      />
    )
  }

  return (
    <Box
      ds-index={element.index}
      as={html_tag}
      {...(chakraProps as ChakraProps)}
      style={style}
      {...attributes}
      className={cn(attributes.className, 'relative', {
        'element_selected shadow-lg': isActive,
      })}
      onClick={(e) => {
        e.stopPropagation()
        dispatch(
          setRendererState({
            active_dnd_id: element.dnd_id,
          }),
        )
      }}
    >
      {isActive && <ElementToolBox element={element} />}
      {attributes.innerText}
      {renderChildren(children_dnd_element_data)}
    </Box>
  )
}

export default ElementRenderer

const ElementToolBox = ({ element }: { element: DndElementData }) => {
  const dispatch = useDispatch()
  let parentID = element.parent_dnd_id

  const move = (direction: 'up' | 'down') => {
    dispatch(
      moveElement({
        element_id: element.dnd_id,
        direction,
      }),
    )
  }

  return (
    <Box
      opacity={1}
      className={cn(
        'element_toolbox bg-card absolute p-2 rounded-md shadow-xl border z-50 min-w-[200px] min-h-10  right-2 border-border text-muted-foreground flex items-center gap-default_spacing justify-between opacity-100 hover:opacity-100 ',
        {
          'top-5 right-5': !parentID,
          '-top-14': parentID,
        },
      )}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className={'flex items-center gap-1'}>
        <Button variant="outline" size="icon">
          <TbTrash className="h-4 w-4" />
        </Button>
      </div>
      <div className={'flex items-center gap-1'}>
        <Button variant="outline" size="icon" onClick={() => move('down')}>
          <TbArrowDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => move('up')}>
          <TbArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </Box>
  )
}
