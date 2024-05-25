import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  DesignerElementData,
  DesignerElementDataDTO, DndElementData,
} from '@repo/designer/types/designer.types'
import { generateRandomId, getRandomNumber } from '@/lib/utils'

export interface RendererState {
  allElements: DndElementData[]
}

const initialState: RendererState = {
  allElements: [],
}

export const rendererSlice = createSlice({
  name: 'renderer',
  initialState,
  reducers: {
    setRendererState: (
      state,
      action: PayloadAction<Partial<RendererState>>,
    ) => {
      console.log('SETTING RENDER STATE::', action.payload)
      return {
        ...state,
        ...action.payload,
      }
    },
    addElement: (state, action: PayloadAction<DndElementData>) => {
      let theID = generateRandomId(getRandomNumber(8, 13))
      const newElement: DndElementData = {
        ...action.payload,
        dnd_id: theID,
        element_data: {
          ...action.payload.element_data,
          element_id: theID
        }
      }
      if (newElement.isFromElementPanel) {
        return {
          ...state,
          allElements: [
            ...state.allElements,
            {
              ...newElement,
              isFromElementPanel: false,
              // element_id: generateRandomId(12),
            },
          ],
        }
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.allElements = state.allElements.filter(
        (element) => element.element_data.element_id !== action.payload,
      )
    },
  },
})

export const { setRendererState, removeElement, addElement } =
  rendererSlice.actions

export default rendererSlice.reducer
