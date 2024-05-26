import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import builderSlice, {
  BuilderState,
} from '@/redux/features/builder/builder.slice'
import builderViewSlice, {
  BuilderViewState,
} from './features/builder/builder-view.slice'
import rendererSlice, {
  RendererState,
} from './features/renderer/renderer.slice'
import RendererSlice from './features/renderer/renderer.slice'

const rootReducer = combineReducers({
  builder: builderSlice,
  builder_view: builderViewSlice,
  renderer: rendererSlice,
})

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['builder', 'builder_view', 'renderer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppStore = {
  renderer: RendererState
  builder: BuilderState
  builder_view: BuilderViewState
}
