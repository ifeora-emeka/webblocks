//renderer.context.tsx
// import { DesignerElementData } from '@repo/designer/types/designer.types'
/**
 * Crate the following renderer state object
 * - all_elements [] of type DesignerElementData
 * - copied_elements [], of type DesignerElementData
 * - active_elements [], of type DesignerElementData
 * - element_history [], of type DesignerElementData: can only have 10 arrays inside max
 *
 * - elements_to_delete [] of type DesignerElementData,
 * - elements_to_create: [] of type DesignerElementData,
 * - element_to_update: [] of type DesignerElementData
 *
 * Functions to add
 * updateRenderState which takes in a new state object and update the renderer state
 */

import React, { createContext, useState, useContext } from 'react'
import { DesignerElementData } from '@repo/designer/types/designer.types'

interface RendererState {
  all_elements: DesignerElementData[]
  copied_elements: DesignerElementData[]
  active_elements: DesignerElementData[]
  element_history_stack: DesignerElementData[]
  elements_to_delete: DesignerElementData[]
  elements_to_create: DesignerElementData[]
  element_to_update: DesignerElementData[]
}

const RendererContext = createContext<
  | {
      state: RendererState
      updateRenderState: (newState: Partial<RendererState>) => void
    }
  | undefined
>(undefined)

export const RendererProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<RendererState>({
    all_elements: [],
    copied_elements: [],
    active_elements: [],
    element_history_stack: [],
    elements_to_delete: [],
    elements_to_create: [],
    element_to_update: [],
  })

  const updateRenderState = (newState: Partial<RendererState>) => {
    setState((prevState) => {
      const updatedState = { ...prevState, ...newState }

      if (updatedState.element_history_stack.length > 10) {
        updatedState.element_history_stack =
          updatedState.element_history_stack.slice(0, 10)
      }

      return updatedState
    })
  }

  return (
    <RendererContext.Provider value={{ state, updateRenderState }}>
      {children}
    </RendererContext.Provider>
  )
}

export const useRendererContext = () => {
  const context = useContext(RendererContext)
  if (context === undefined) {
    throw new Error('useRendererContext must be used within a RendererProvider')
  }
  return context
}
