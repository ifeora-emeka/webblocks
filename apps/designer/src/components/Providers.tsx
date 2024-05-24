'use client'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux/store'
import { Next13ProgressBar } from 'next13-progressbar'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react'
import conf from '../../tailwind.config'

export default function Providers({ children }: any) {

  useEffect(() => {
    const loadTailwind = () => {
      // Check if Tailwind CSS has already been loaded
        // Create a <link> element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
        link.id = 'tailwindcss';

        // Append the <link> element to the <head> of the document
        document.head.appendChild(link);
    };
      loadTailwind()
  },[])

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
