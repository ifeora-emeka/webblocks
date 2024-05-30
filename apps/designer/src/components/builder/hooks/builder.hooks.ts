import { useDispatch } from 'react-redux'
import { DndElementData } from '@repo/designer/types/designer.types'
import {
  addElement,
  moveElement,
  removeElement, RendererState, setRendererState, updateElement,
} from '@/redux/features/renderer/renderer.slice'


export const useBuilder = () => {
  const dispatch = useDispatch()

  const addElementToPage = ({ element, position }: { element: DndElementData; position: 'up' | 'down' }) => {
    dispatch(addElement({ element, position }))
  }

  const removeElementFromPage = ({ dnd_id }: { dnd_id: string }) => {
    dispatch(removeElement(dnd_id))
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
  };

  const updateRenderer = (newState: Partial<RendererState>) => {
    dispatch(setRendererState(newState))
  }

  const updateElementData = ({ data, element_id }:{ element_id: string; data: DndElementData}) => {
    dispatch(updateElement({
      element_id,
      update: data
    }))
  }

  return {
    addElementToPage,
    removeElementFromPage,
    changeElementPosition,
    updateElementData,
    updateRenderer
  }
}
