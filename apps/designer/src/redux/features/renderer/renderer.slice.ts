import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DesignerElementData } from '@repo/designer/types/designer.types'

export interface RendererState {
  allElements: DesignerElementData[]
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
  },
})

export const { setRendererState } = rendererSlice.actions

export default rendererSlice.reducer
