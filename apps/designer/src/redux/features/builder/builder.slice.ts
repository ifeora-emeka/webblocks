import { PageMetadata } from '@/types/pages.type'
import { ProjectData } from '@/types/projects.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BuilderState {
  project: ProjectData | null
  metadata: PageMetadata | null
}

const initialState: BuilderState = {
  project: null,
  metadata: null,
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
