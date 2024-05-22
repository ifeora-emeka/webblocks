import { configureStore } from '@reduxjs/toolkit'
import builderSlice, {
  BuilderState,
} from '@/redux/features/builder/builder.slice'
import builderViewSlice, {
  BuilderViewState,
} from './features/builder/builder-view.slice'
import rendererSlice, { RendererState } from './features/builder/renderer.slice'

export type AppStore = {
  builder: BuilderState
  builder_view: BuilderViewState
  renderer: RendererState
}

export const store = configureStore({
  reducer: {
    builder: builderSlice,
    builder_view: builderViewSlice,
    renderer: rendererSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
