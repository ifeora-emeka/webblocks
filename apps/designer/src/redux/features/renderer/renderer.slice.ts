import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DndElementData } from '@repo/designer/types/designer.types'
import slugify from 'slugify'
import { filter } from '@chakra-ui/react'
import { generateRandomId } from '@/lib/utils'

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
    addElement: (
      state,
      action: PayloadAction<{
        element: DndElementData
        position: 'up' | 'down'
      }>,
    ) => {
      let newElements: DndElementData[] = []

      // above elements
      ;(newElements = state.allElements.filter(
        (x) => x.index < action.payload.element.index,
      )),
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
    updateElement: (
      state,
      action: PayloadAction<{ element_id: string; update: DndElementData }>,
    ) => {
      const { element_id, update } = action.payload
      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      )

      if (elementIndex !== -1) {
        let targetElement = state.allElements[elementIndex]
        //@ts-ignore
        state.allElements[elementIndex] = {
          ...targetElement,
          ...update,
        }
      }
    },
    duplicateElement: (
      state,
      action: PayloadAction<{ element_id: string }>,
    ) => {
      const { element_id } = action.payload
      const elementIndex = state.allElements.findIndex(
        (element) => element.dnd_id === element_id,
      )

      if (elementIndex !== -1) {
        let targetElement = state.allElements[elementIndex]
        let duplicateID = targetElement.dnd_id + '_copy_' + generateRandomId(12)
        let duplicate: DndElementData = {
          ...targetElement,
          dnd_id: duplicateID,
          index: targetElement.index + 1,
          element_data: {
            ...targetElement.element_data,
            element_id: duplicateID,
            index: targetElement.index + 1,
            name: targetElement.element_data.name + ' (copy)',
            slug: slugify(targetElement.element_data.name + ' (copy)'),
          },
        }

        // move all it's siblings down
        state.allElements.map((el: DndElementData, index) => {
          if (
            el.element_data.parent_element_id ===
              targetElement.element_data.parent_element_id &&
            el.element_data.index > targetElement.element_data.index &&
            el.element_data.element_id !== targetElement.element_data.element_id
          ) {
            state.allElements[index] = {
              ...state.allElements[index],
              index: state.allElements[index] + 1,
              element_data: {
                ...state.allElements[index].element_data,
                index: state.allElements[index].element_data.index + 1
              }
            }
          }
        })

        //add the duplicates
        state.allElements.push(duplicate)
      }
    },
  },
})

export const {
  moveElement,
  setRendererState,
  removeElement,
  addElement,
  updateElement,
  duplicateElement
} = rendererSlice.actions

export default rendererSlice.reducer
