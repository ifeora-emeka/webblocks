//todo:
// A render context was created.
// So clean this up. it should only focus on builder related things
// and not element related things.

import { useDispatch } from 'react-redux'
import {
  BuilderBreakpoints,
  DndElementData,
  ResponsiveChakraProps,
} from '@repo/designer/types/designer.types'
import {
  appendChildToParent,
  duplicateElement,
  groupElements,
  moveElement,
  removeElement,
  removeElementAttribute,
  removeElementChakraStyle,
  RendererState,
  selectMultipleElement,
  setRendererState,
  updateElement,
  updateElementAttributes,
  updateElementChakraStyle,
} from '@/redux/features/renderer/renderer.slice'
import { ChakraProps } from '@chakra-ui/react'

export const useBuilderUtils = () => {
  const dispatch = useDispatch()

  const appendChildToParentElement = ({
    parent_id,
    newChild,
  }: {
    parent_id: string
    newChild: DndElementData
  }) => {
    dispatch(appendChildToParent({ parent_id, newChild }))
  }

  const removeElementFromPage = ({ dnd_ids }: { dnd_ids: string[] }) => {
    dispatch(removeElement(dnd_ids))
  }

  const changeElementPosition = ({
    direction,
    element_id,
  }: {
    direction: 'up' | 'down'
    element_id: string
  }) => {
    dispatch(
      moveElement({
        element_id: element_id,
        direction,
      }),
    )
  }

  const updateRenderer = (newState: Partial<RendererState>) => {
    dispatch(setRendererState(newState))
  }

  const updateElementData = ({
    data,
    element_id,
  }: {
    element_id: string
    data: DndElementData
  }) => {
    dispatch(
      updateElement({
        element_id,
        update: data,
      }),
    )
  }

  const duplicateElementData = ({ element_id }: { element_id: string }) => {
    dispatch(
      duplicateElement({
        element_id,
      }),
    )
  }

  const selectOneElementData = ({ element }: { element: DndElementData }) => {
    dispatch(
      setRendererState({
        active_element: [element],
      }),
    )
  }

  const selectMultipleElementData = ({
    element,
  }: {
    element: DndElementData
  }) => {
    dispatch(
      selectMultipleElement({
        element,
      }),
    )
  }

  const groupSelectedElementData = () => {
    dispatch(groupElements())
  }

  const updateElementChakraStyleData = ({
    newChakraStyle,
    element_id,
  }: {
    element_id: string
    newChakraStyle: ResponsiveChakraProps
  }) => {
    dispatch(
      updateElementChakraStyle({
        element_id,
        newChakraStyle,
      }),
    )
  }

  const removeElementChakraProperty = ({
    element_id,
    property,
  }: {
    property: keyof ChakraProps
    element_id: string
  }) => {
    dispatch(
      removeElementChakraStyle({
        property,
        element_id,
      }),
    )
  }

  const getViewportWidth = (breakpoint: BuilderBreakpoints): string => {
    switch (breakpoint) {
      case 'base':
        return '400px'
      case 'md':
        return '700px'
      case 'lg':
        return '100%'
      default:
        return '100%'
    }
  }

  const updateAttributes = ({
    element_id,
    newAttributes,
  }: {
    element_id: string
    newAttributes: Record<string, string>
  }) => {
    dispatch(
      updateElementAttributes({
        element_id,
        newAttributes,
      }),
    )
  }

  const removeAttribute = ({
    element_id,
    property,
  }: {
    element_id: string
    property: string
  }) => {
    dispatch(
      removeElementAttribute({
        element_id,
        property,
      }),
    )
  }

  return {
    appendChildToParentElement,
    removeElementFromPage,
    changeElementPosition,
    updateElementData,
    updateRenderer,
    duplicateElementData,
    selectOneElementData,
    selectMultipleElementData,
    groupSelectedElementData,
    updateElementChakraStyleData,
    getViewportWidth,
    removeElementChakraProperty,
    updateAttributes,
    removeAttribute,
  }
}
