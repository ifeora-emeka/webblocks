import React, { useRef, useState, useCallback } from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore, RootState, store } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'
import ElementToolbar from '@/components/builder/renderer/element-render/ElementToolbox'
import { useBuilder } from '../../hooks/builder.hooks'
import { debounce } from '@/components/builder/builder.utils'
import ElementAppender from '@/components/builder/renderer/element-render/ElementAppender'

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
  const { updateElementData, selectMultipleElementData } = useBuilder()

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

  const isActive = active_element.map(el => el.dnd_id).includes(element.dnd_id);

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
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (e.altKey) {
        selectMultipleElementData({
          element: element,
        });
    } else {
      dispatch(
        setRendererState({
          active_element: [element],
        })
      );
    }
  };

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
        onClick={handleClick}
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
        onClick={handleClick}
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

