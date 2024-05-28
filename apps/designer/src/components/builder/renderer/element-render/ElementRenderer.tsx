import React, { useRef, useState } from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore, RootState, store } from '@/redux/store'
import {
  setRendererState,
} from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'
import ElementToolbar from '@/components/builder/renderer/element-render/ElementToolbox'
import { TbPlus } from 'react-icons/tb'

interface DesignerElementProps {
  element: DndElementData
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const isVoidElement = (tag: string) =>
    /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(
      tag,
    )
  const theStore: AppStore = store.getState();
  let allElements = theStore.renderer.allElements;

  // console.log('THE PARENT::', theParent);

  const { element_data, children_dnd_element_data } = element
  const { html_tag, chakraProps, attributes, style } = element_data
  const dispatch = useDispatch()
  const { active_dnd_id } = useSelector((state: RootState) => state.renderer)
  const childRef = useRef<HTMLHeadingElement>(null)

  const renderChildren = (children: Array<DndElementData> | undefined) => {
    if (!children) return null
    const sortedChildren = children.slice().sort((a, b) => {
      return a.index - b.index
    })

    return sortedChildren.map((child) => {
      return <ElementRenderer key={child.dnd_id} element={child} />
    })
  }

  const isActive = active_dnd_id === element.dnd_id;
  let theParent = allElements.find(el => el.parent_dnd_id === element.parent_dnd_id);
  let appendDirection: 'horizontal' | 'vertical' = theParent?.element_data.chakraProps?.flexDirection === 'column' ? "vertical" : "horizontal";

  console.log(theParent)

  const handleInput = () => {
    if (childRef?.current) {
      //todo: save text content in redux
    }
  }

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
    <>
      <Box
        contentEditable={isActive}
        ref={childRef}
        onInput={handleInput}
        suppressContentEditableWarning={true}
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

          if(active_dnd_id !== element.dnd_id) {
          dispatch(
            setRendererState({
              active_dnd_id: element.dnd_id,
            }),
          )
          }

        }}
      >
        {isActive && <ElementAppender position={appendDirection === 'vertical' ? 'top' : 'left'} />}
        {isActive && <ElementToolbar element={element} />}
        {attributes.innerText}
        {renderChildren(children_dnd_element_data)}
        {isActive && <ElementAppender position={appendDirection === 'vertical' ? 'bottom' : 'right'} />}
      </Box>
    </>
  )
}


export default ElementRenderer


const ElementAppender = ({ position }: { position: 'top' | 'bottom' | 'left' | 'right' }) => {
  return <>
    <button
      className={'absolute left-1/2 transform -translate-x-1/2  hover:bg-primary rounded-full bg-primary text-white shadow-lg min-h-8 min-w-8 flex justify-center items-center z-50'}
            style={{ [position]: '-40px', left: '50%'}}
    >
      <TbPlus className="h-4 w-4" />
    </button>
  </>
}

