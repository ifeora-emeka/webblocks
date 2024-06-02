import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DesignerLeftPanel } from '@repo/designer/types/designer.types'

export interface BuilderState {
  activeProject: number
  activeLeftPanel: DesignerLeftPanel;
}

const initialState: BuilderState = {
  activeProject: 0,
  activeLeftPanel: null,
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setBuilderState: (state, action: PayloadAction<Partial<BuilderState>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setBuilderState } = builderSlice.actions

export default builderSlice.reducer
