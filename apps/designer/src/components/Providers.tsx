'use client'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux/store'
import { Next13ProgressBar } from 'next13-progressbar'
import { PersistGate } from 'redux-persist/integration/react'

export default function Providers({ children }: any) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Next13ProgressBar height="4px" color="var(--primary)" showOnShallow />
        {children}
        </PersistGate>
      </Provider>
    </>
  )
}
