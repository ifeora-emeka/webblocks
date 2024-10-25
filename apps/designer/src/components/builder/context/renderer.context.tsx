import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  BuilderBreakpoints,
  ElementData,
} from '@repo/designer/types/designer.types'
import { defaultRootElement } from '@/components/builder/renderer/element-render/static-element-data/default-body'
import { ChakraProps } from '@chakra-ui/react'

interface RendererState {
  allElements: ElementData[]
  active_element: ElementData[]
  copiedElements: ElementData[]
  activeBreakpoint: BuilderBreakpoints
}

const initialState: RendererState = {
  allElements: [],
  active_element: [],
  copiedElements: [],
  activeBreakpoint: 'lg',
}

type RendererAction = {
  type: 'SET_RENDERER_STATE'
  payload: Partial<RendererState>
}

const rendererReducer = (state: RendererState, action: RendererAction) => {
  switch (action.type) {
    case 'SET_RENDERER_STATE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const RendererContext = createContext<{
  state: RendererState
  setRendererState: (payload: Partial<RendererState>) => void
  addElements: (element: ElementData[]) => void;
} | null>(null)

export const RendererProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                            children,
                                                                          }) => {
  const [state, dispatch] = useReducer(rendererReducer, initialState)

  console.log('RENDER STATE:::', state)

  const setRendererState = (payload: Partial<RendererState>) => {
    dispatch({ type: 'SET_RENDERER_STATE', payload })
  }

  useEffect(() => {
    if (state.allElements.length == 0) {
      let rootElement = defaultRootElement({
        index: 0,
        parent_id: null
      })
      setRendererState({
        allElements: [rootElement],
        active_element: [rootElement]
      })
    }
  },[])

  const addElements = (elements: ElementData[]) => {
    let currentList = [...state.allElements]
    setRendererState({
      allElements: [...currentList, ...elements]
    })
  }

  const removeElements = (element_ids: string[]) => {

  }

  const updateElementIndex = ({}:{ element_id: string; mode: 'increment' | 'decrement' }) => {

  }

  const updateElementChakraProps = ({}:{element_id: string; data: ChakraProps }) => {

  }

  const copyElement = (element_id:string) => {

  }

  const cutElement = (element_id: string) => {

  }

  return (
    <RendererContext.Provider value={{ state, setRendererState, addElements }}>
      {children}
    </RendererContext.Provider>
  )
}

export const useRenderer = () => {
  const context = useContext(RendererContext)
  if (!context) {
    throw new Error('useRenderer must be used within a RendererProvider')
  }
  return context
}
