import React, { useRef, useState, useCallback } from 'react'
import {
  BuilderBreakpoints,
  DndElementData,
} from '@repo/designer/types/designer.types'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore, RootState, store } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'
import { useBuilder } from '../../hooks/builder.hooks'
import { debounce } from '@/components/builder/builder.utils'
import { getResponsiveProps } from '@repo/designer/utils/element.utils'
import ElementToolbar from './ElementToolbox'
import TextContentPopup from '../../popups/TextContentPopup'

interface DesignerElementProps {
  element: DndElementData
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const [textEdit, setTextEdit] = useState(false)
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
  const { active_element, activeBreakpoint } = useSelector(
    (state: RootState) => state.renderer,
  )
  const childRef = useRef<HTMLHeadingElement>(null)
  const [editInnerText, setEditInnerText] = useState(false)
  const responsiveChakraProps = getResponsiveProps(
    chakraProps,
    activeBreakpoint as BuilderBreakpoints,
  )

  const renderChildren = (children: Array<DndElementData> | undefined) => {
    if (!children) return null
    const sortedChildren = children.slice().sort((a, b) => {
      return a.index - b.index
    })

    return sortedChildren.map((child) => {
      return <ElementRenderer key={child.dnd_id} element={child} />
    })
  }

  const isActive = active_element
    .map((el) => el.dnd_id)
    .includes(element.dnd_id)

  let theParent =
    allElements.find((el) => el.dnd_id === element.parent_dnd_id) || null

  const handleInput = () => {
    if (childRef?.current) {
      const newText = childRef.current.innerText

      // elementInnerText === undefined
      //   ? (elementInnerText = ' ')
      //   : elementInnerText

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

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (e.shiftKey) {
      e.preventDefault()
      selectMultipleElementData({
        element: element,
      })
    } else {
      if (
        active_element.length > 0 &&
        element.element_data.element_id !==
          active_element[0]?.element_data.element_id
      ) {
        dispatch(
          setRendererState({
            active_element: [element],
          }),
        )
      }
    }
  }

  const debouncedHandleInput = useCallback(debounce(handleInput, 700), [
    element,
  ])

  if (isActive) {
    console.log(active_element[0])
  }

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
        ref={childRef}
        onInput={debouncedHandleInput}
        suppressContentEditableWarning={true}
        autoFocus
        {...attributes}
        ds-index={element.index}
        ds-id={element.dnd_id}
        as={html_tag}
        {...(responsiveChakraProps as ChakraProps)}
        style={style}
        className={cn(attributes.className, 'relative', {
          'element_selected shadow-lg': isActive,
        })}
        onClick={handleClick}
        onDoubleClickCapture={(e) => {
          // e.stopPropagation()
          setTextEdit(true)
        }}
        onDoubleClick={() => setEditInnerText(!editInnerText)}
      >
        {textEdit && isActive && element_data?.text_content && (
          <TextContentPopup text_content={element_data.text_content} />
        )}
        {isActive && <ElementToolbar element={element} />}
        <>
          {element_data.text_content}
          {renderChildren(children_dnd_element_data)}
        </>
      </Box>
    </>
  )
}

export default ElementRenderer
