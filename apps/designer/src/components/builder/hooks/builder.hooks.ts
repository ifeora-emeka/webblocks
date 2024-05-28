import { useDispatch } from 'react-redux'
import { DndElementData } from '@repo/designer/types/designer.types'
import {
  addElement,
  moveElement,
  removeElement,
} from '@/redux/features/renderer/renderer.slice'

export const useBuilder = () => {
  const dispatch = useDispatch()

  const addElementToPage = ({ element }: { element: DndElementData }) => {
    dispatch(addElement({ element }))
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
  }

  return {
    addElementToPage,
    removeElementFromPage,
    changeElementPosition,
  }
}
