import React, { createContext, useContext, useState, ReactNode } from 'react'
import { BuilderViewport } from '@repo/designer/types/designer.types'

type ViewPortState = {
  viewport: BuilderViewport
}

type ViewPortContextType = {
  viewportState: ViewPortState
  setViewportState: (newState: ViewPortState) => void
  getViewportWidth: (viewport: BuilderViewport) => void
}

const ViewPortContext = createContext<ViewPortContextType | undefined>(
  undefined,
)

export const ViewPortProvider = ({ children }: { children: ReactNode }) => {
  const [viewportState, setViewportState] = useState<ViewPortState>({
    viewport: 'desktop',
  })

  const updateViewportState = (newState: ViewPortState) => {
    setViewportState(newState)
  }

  const getViewportWidth = (viewport: BuilderViewport): string => {
    switch (viewport) {
      case 'desktop':
        return '100%'
      case 'mobile':
        return '500px'
      case 'tablet':
        return '700px'
    default: 
        return '100%'
    }
  }

  return (
    <ViewPortContext.Provider
      value={{ viewportState, setViewportState: updateViewportState, getViewportWidth }}
    >
      {children}
    </ViewPortContext.Provider>
  )
}

export const useBuilderViewPort = (): ViewPortContextType => {
  const context = useContext(ViewPortContext)
  if (!context) {
    throw new Error('useBuilderViewPort must be used within a ViewPortProvider')
  }
  return context
}
