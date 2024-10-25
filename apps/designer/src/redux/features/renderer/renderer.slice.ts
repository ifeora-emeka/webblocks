//todo: DELETE THIS FILE

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  BuilderBreakpoints,
  ElementData,
} from '@repo/designer/types/designer.types'

export interface RendererState {
  allElements: ElementData[]
  active_element: ElementData[]
  copiedElements: ElementData[]
  activeBreakpoint: BuilderBreakpoints
}

const initialState: RendererState = {
  allElements: [],
  active_element: [],
  activeBreakpoint: 'lg',
  copiedElements: [],
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
