import { BuilderLeftPanel } from '@/types/builder.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BuilderViewState {
  panel: BuilderLeftPanel
}

const initialState: BuilderViewState = {
  panel: null,
}

export const builderViewSlice = createSlice({
  name: 'builder_view',
  initialState,
  reducers: {
    setBuilderViewState: (
      state,
      action: PayloadAction<Partial<BuilderViewState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    toggleLeftPanel: (state, action: PayloadAction<BuilderLeftPanel>) => {
      if (state.panel === action.payload) {
        return {
          ...state,
          panel: null,
        }
      }
      return {
        ...state,
        panel: action.payload,
      }
    },
  },
})

export const { setBuilderViewState, toggleLeftPanel } = builderViewSlice.actions
export default builderViewSlice.reducer
