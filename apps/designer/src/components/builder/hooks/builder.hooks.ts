import { useDispatch } from 'react-redux'
import { DndElementData } from '@repo/designer/types/designer.types'
import {
  appendChildToParent,
  duplicateElement,
  groupElements,
  moveElement,
  removeElement,
  RendererState,
  selectMultipleElement,
  setRendererState,
  updateElement,
  updateElementChakraStyle,
} from '@/redux/features/renderer/renderer.slice'
import { ChakraProps } from '@chakra-ui/react'

export const useBuilder = () => {
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
    newChakraStyle: ChakraProps
  }) => {
    dispatch(
      updateElementChakraStyle({
        element_id,
        newChakraStyle,
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
  }
}
