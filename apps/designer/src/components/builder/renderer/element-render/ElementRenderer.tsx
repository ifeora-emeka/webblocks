import React, { useRef, useState, useCallback } from 'react'
import {
  BuilderBreakpoints,
  ElementData,
} from '@repo/designer/types/designer.types'
import { Box, ChakraProps } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore, RootState, store } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { cn } from '@/lib/utils'
import { debounce } from '@/components/builder/builder.utils'
import { getResponsiveProps } from '@repo/designer/utils/element.utils'
import ElementToolbar from './ElementToolbox'
import { useBuilderUtils } from '../../hooks/builder-utils.hooks'
import { useRenderer } from '@/components/builder/context/renderer.context'

interface DesignerElementProps {
  element: ElementData
}

const ElementRenderer: React.FC<DesignerElementProps> = ({ element }) => {
  const isVoidElement = (tag: string) =>
    /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(
      tag,
    )
  const {
    state: { allElements, active_element, activeBreakpoint }, selectMultipleElements
  } = useRenderer()

  const { html_tag, chakraProps, attributes, style } = element
  const dispatch = useDispatch()
  const childRef = useRef<HTMLHeadingElement>(null)
  const [editInnerText, setEditInnerText] = useState(false)
  const responsiveChakraProps = getResponsiveProps(
    chakraProps,
    activeBreakpoint as BuilderBreakpoints,
  )

  const renderChildren = (children: Array<ElementData> | undefined) => {
    if (!children) return null
    const sortedChildren = children.slice().sort((a, b) => {
      return a.index - b.index
    })

    return sortedChildren.map((child) => {
      return <ElementRenderer key={child.id} element={child} />
    })
  }

  const isActive = active_element.map((el) => el.id).includes(element.id)

  let theParent =
    allElements.find((el) => el.id === element.parent_element_id) || null

  const handleInput = () => {
    if (childRef?.current) {
      const newText = childRef.current.innerText

      // elementInnerText === undefined
      //   ? (elementInnerText = ' ')
      //   : elementInnerText

      console.log(newText)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (e.shiftKey) {
      e.preventDefault()
      selectMultipleElements(element.id)
    } else {
      if (active_element.length > 0 && element.id !== active_element[0]?.id) {
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
        ds-id={element.id}
        as={html_tag}
        {...(responsiveChakraProps as ChakraProps)}
        style={style}
        className={cn(attributes.className, 'relative', {
          'element_selected shadow-lg': isActive,
        })}
        onClick={handleClick}
        onDoubleClickCapture={(e) => {
          // e.stopPropagation()
        }}
        onDoubleClick={() => setEditInnerText(!editInnerText)}
      >
        {isActive && <ElementToolbar element={element} />}
        <>
          {element.text_content}
          {renderChildren(element.children_elements)}
        </>
      </Box>
    </>
  )
}

export default ElementRenderer
