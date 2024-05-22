'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store';
import { Next13ProgressBar } from 'next13-progressbar';

export default function Providers({ children }: any) {
  return (
    <>
      <Provider store={store}>
        <Next13ProgressBar height="4px" color="var(--primary)" showOnShallow />
        {children}
      </Provider>
    </>
  )
}
