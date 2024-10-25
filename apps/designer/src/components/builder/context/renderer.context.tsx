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
  addElements: (element: ElementData[]) => void
  selectMultipleElements: (id: string) => void;
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
      let rootElement = {
        ...defaultRootElement({
          parent_id: null,
        }),
        index: 0,
      }
      setRendererState({
        allElements: [rootElement],
        active_element: [rootElement],
      })
    }
  }, [])

  const getNeeded = () => {
    let allElements = [...state.allElements]
    let activeElements = state.active_element

    return {
      allElements,
      activeElements
    }
  }

  const addElements = (elements: ElementData[]) => {
   const { activeElements, allElements } = getNeeded()

    const activeElementChildren = allElements.filter(
      (el) => el.parent_element_id == activeElements[0]?.id,
    )

    elements.map((el) => {
      if (!el.parent_element_id) {
        el.parent_element_id = state.active_element[0].id
        el.index = activeElementChildren.length
      }
    })
    setRendererState({
      allElements: [...allElements, ...elements],
    })
  }

  const selectMultipleElements = (element_id: string) => {
    const { activeElements, allElements } = getNeeded();
    const activeElementIDs = activeElements.map(el => el.id)

    if(activeElementIDs.includes(element_id)) {
      setRendererState({
        active_element: activeElements.filter(el => el.id === element_id)
      })
    } else {
      const theElement = allElements.find(el => el.id === element_id)
      if(theElement) {
        setRendererState({
          active_element: [...activeElements, theElement]
        })
      }
    }

  }

  const removeElements = (element_ids: string[]) => {}

  const updateElementIndex = ({}: {
    element_id: string
    mode: 'increment' | 'decrement'
  }) => {}

  const updateElementChakraProps = ({}: {
    element_id: string
    data: ChakraProps
  }) => {}

  const copyElement = (element_id: string) => {}

  const cutElement = (element_id: string) => {}

  return (
    <RendererContext.Provider value={{ state, setRendererState, addElements, selectMultipleElements }}>
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
