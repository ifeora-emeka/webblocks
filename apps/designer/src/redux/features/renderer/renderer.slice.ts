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
    moveElement: (state, action: PayloadAction<{ activeId: string, overId: string }>) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.allElements.findIndex(element => element.element_id === activeId);
      const newIndex = state.allElements.findIndex(element => element.element_id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const [movedElement] = state.allElements.splice(oldIndex, 1);
        state.allElements.splice(newIndex, 0, movedElement);
      }
    },
  },
})

export const { moveElement ,setRendererState, removeElement, addElement } = rendererSlice.actions

export default rendererSlice.reducer
