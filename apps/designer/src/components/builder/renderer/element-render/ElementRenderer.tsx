import React, { useRef, useState, useCallback } from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore, RootState, store } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'
import ElementToolbar from '@/components/builder/renderer/element-render/ElementToolbox'
import { TbPlus } from 'react-icons/tb'
import { useBuilder } from '../../hooks/builder.hooks'
import { staticHeadingElement } from './static-element-data/heading-element'
import { debounce } from '@/components/builder/builder.utils'

interface DesignerElementProps {
  element: DndElementData
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const isVoidElement = (tag: string) =>
    /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(
      tag,
    )
  const theStore: AppStore = store.getState()
  let allElements = theStore.renderer.allElements
  const { updateElementData, selectOneElementData } = useBuilder()

  const { element_data, children_dnd_element_data } = element
  const { html_tag, chakraProps, attributes, style } = element_data
  const dispatch = useDispatch()
  const { active_element } = useSelector((state: RootState) => state.renderer)
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

  const targetElement = active_element.filter(
    (x: DndElementData) => x.dnd_id === element.dnd_id,
  )
  const isActive: boolean =
    targetElement?.length > 0 && targetElement[0]?.dnd_id === element.dnd_id;

  let theParent =
    allElements.find((el) => el.dnd_id === element.parent_dnd_id) || null
  let appendDirection: 'horizontal' | 'vertical' =
    theParent?.element_data.chakraProps?.flexDirection === 'column'
      ? 'horizontal'
      : 'vertical'

  const handleInput = () => {
    if (childRef?.current) {
      const newText = childRef.current.innerText
      let elementInnerText = element.element_data?.attributes?.innerText

      console.log('INNER TEXT::', elementInnerText)

      elementInnerText === undefined
        ? (elementInnerText = ' ')
        : elementInnerText

      if (
        elementInnerText !== undefined &&
        element.element_data.name !== newText
      ) {
        updateElementData({
          element_id: element.dnd_id,
          data: {
            ...element,
            element_data: {
              ...element.element_data,
              attributes: {
                ...element.element_data.attributes,
                innerText: newText,
              },
            },
          },
        })
      }
    }
  }

  const debouncedHandleInput = useCallback(debounce(handleInput, 700), [
    element,
  ])

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
              active_element: [element],
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
        onInput={debouncedHandleInput}
        suppressContentEditableWarning={true}
        autoFocus
        ds-index={element.index}
        ds-id={element.dnd_id}
        as={html_tag}
        {...(chakraProps as ChakraProps)}
        style={style}
        {...attributes}
        className={cn(attributes.className, 'relative', {
          'element_selected shadow-lg': isActive,
        })}
        onClick={(e) => {
          e.stopPropagation()
          if (!isActive) {
            selectOneElementData({
              element
            })
          }
        }}
      >
        {isActive && (
          <ElementAppender
            orientation={appendDirection}
            position="up"
            parent_element={theParent}
            element={element}
          />
        )}
        {isActive && <ElementToolbar element={element} />}
        {attributes.innerText}
        {renderChildren(children_dnd_element_data)}
        {isActive && (
          <ElementAppender
            orientation={appendDirection}
            position="down"
            parent_element={theParent}
            element={element}
          />
        )}
      </Box>
    </>
  )
}

export default ElementRenderer

const ElementAppender = ({
  orientation,
  position,
  parent_element,
  element,
}: {
  orientation: 'horizontal' | 'vertical'
  position: 'up' | 'down'
  parent_element: DndElementData | null
  element: DndElementData
}) => {
  const { addElementToPage } = useBuilder()

  const addElement = () => {
    if (element) {
      addElementToPage({
        element: staticHeadingElement({
          index: position == 'up' ? element.index : element.index + 1,
          parent_id: parent_element?.dnd_id as string,
        }),
        position,
      })
    }
  }

  return (
    <>
      <button
        onClick={addElement}
        className={cn(
          'absolute hover:bg-primary rounded-full bg-primary text-white shadow-lg max-h-8 min-h-8 min-w-8 max-w-8 flex justify-center items-center z-50',
          {
            'left-1/2 transform-x-1/2 -top-10':
              orientation === 'vertical' && position === 'up',
            'left-1/2 transform-x-1/2 -bottom-10':
              orientation === 'vertical' && position === 'down',
            '': orientation === 'horizontal' && position === 'up',
            '': orientation === 'horizontal' && position === 'down',
          },
        )}
        // style={{ [position]: '-40px', left: '50%' }}
      >
        <TbPlus className="h-4 w-4" />
      </button>
    </>
  )
}
