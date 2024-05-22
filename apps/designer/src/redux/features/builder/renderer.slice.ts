import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PageElementData } from '@/types/builder.types'

export interface RendererState {
  allElements: PageElementData[]
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
