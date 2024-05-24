import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DesignerElementData, DesignerElementDataDTO } from '@repo/designer/types/designer.types'
import { generateRandomId } from '@/lib/utils'

export interface RendererState {
  allElements: DesignerElementData[] | DesignerElementDataDTO[]
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
    addElement: (state, action: PayloadAction<DesignerElementDataDTO>) => {
      const newElement: DesignerElementDataDTO = {
        ...action.payload,
      };
      if(newElement.isFromElementPanel) {
        return {
          ...state,
          allElements: [...state.allElements, { ...newElement, isFromElementPanel: false, element_id: generateRandomId(12)  }]
        }
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.allElements = state.allElements.filter(element => element.element_id !== action.payload);
    },
  },
})

export const { setRendererState, removeElement, addElement } = rendererSlice.actions

export default rendererSlice.reducer
