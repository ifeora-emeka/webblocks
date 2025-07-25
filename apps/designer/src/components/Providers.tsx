'use client'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux/store'
import { Next13ProgressBar } from 'next13-progressbar'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './theme-provider'
// import { SessionProvider } from "next-auth/react"

export default function Providers({ children }: { children: any }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Next13ProgressBar
              height="4px"
              color="var(--primary)"
              showOnShallow
            />
            {/* <SessionProvider session={session}> */}
            {children}
            {/* </SessionProvider> */}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  )
}
