import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DndElementData } from '@repo/designer/types/designer.types'

export interface RendererState {
  allElements: DndElementData[]
  active_element: DndElementData | null
}

const initialState: RendererState = {
  allElements: [],
  active_element: null,
}

export const rendererSlice = createSlice({
  name: 'renderer',
  initialState,
  reducers: {
    setRendererState: (
      state,
      action: PayloadAction<Partial<RendererState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    addElement: (state, action: PayloadAction<{ element: DndElementData }>) => {
      /**
       * - create an empty array ✔️
       * - get the elements below and above the target index ✔️
       * - push the elements above the target index to the empty array ✔️
       * - push the target element into the empty array (make sure the index is correct) ✔️
       * - increment the idexes of the below element ✔️
       * - push the updated below element into the empty array ✔️
       */

      let newElements: DndElementData[] = []

      // above elements
      newElements = state.allElements.filter((x) => x.index < action.payload.element.index),

      // target element
      newElements.push(action.payload.element)

      // element below
      state.allElements
        .filter((x) => x.index >= action.payload.element.index)
        .forEach((el: DndElementData) => {
          newElements.push({
            ...el,
            index: el.index + 1,
            element_data: {
              ...el.element_data,
              index: el.index + 1,
            },
          })
        })

      return {
        ...state,
        allElements: newElements,
        active_element: action.payload.element,
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.allElements = state.allElements.filter(
        (element) => element.element_data.element_id !== action.payload,
      )
    },
    moveElement: (
      state,
      action: PayloadAction<{ element_id: string; direction: 'up' | 'down' }>,
    ) => {
      const { element_id, direction } = action.payload

      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      )

      if (elementIndex === -1) return state

      let newIndex = elementIndex

      if (direction === 'up' && elementIndex > 0) {
        newIndex = elementIndex - 1
      } else if (
        direction === 'down' &&
        elementIndex < state.allElements.length - 1
      ) {
        newIndex = elementIndex + 1
      }

      if (newIndex < 0 || newIndex >= state.allElements.length) return

      const [movedElement] = state.allElements.splice(elementIndex, 1)
      state.allElements.splice(newIndex, 0, movedElement)

      state.allElements.forEach((element, index) => {
        element.element_data.index = index
        element.index = index
      })
    },
  },
})

export const { moveElement, setRendererState, removeElement, addElement } =
  rendererSlice.actions

export default rendererSlice.reducer
