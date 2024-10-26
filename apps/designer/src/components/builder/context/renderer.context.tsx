import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  BuilderBreakpoints,
  ElementData,
} from '@repo/designer/types/designer.types'
import { defaultRootElement } from '@/components/builder/renderer/element-render/static-element-data/default-body'
import { ChakraProps } from '@chakra-ui/react'
import { isVoidElement } from '@repo/designer/constants'
import { all } from 'axios'
import { generateRandomId } from '@/lib/utils'

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
  removeElements: (ids:string[]) => void;
  updateElementIndex: (mode: "increment" | "decrement") => void;
  duplicateSelected: () => void;
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
    let canCreate = true;
    const activeElementChildren = allElements.filter(
      (el) => el.parent_element_id == activeElements[0]?.id,
    )

    elements.forEach((el) => {
      if(isVoidElement(activeElements[0].html_tag as string) || activeElements[0].text_content) {
        canCreate = false;
      }
      if (!el.parent_element_id) {
        el.parent_element_id = state.active_element[0].id
        el.index = activeElementChildren.length
      }
    })
   if(canCreate) {
     setRendererState({
       allElements: [...allElements, ...elements],
       active_element: elements
     })
   }
  }

  const selectMultipleElements = (element_id: string) => {
    const { activeElements, allElements } = getNeeded();
    const activeElementIDs = activeElements.map(el => el.id)

    if(activeElementIDs.includes(element_id)) {
      setRendererState({
        active_element: activeElements.filter(el => el.id !== element_id)
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

  const removeElements = (element_ids: string[]) => {
      let allElements = [...state.allElements];

    const removeChildren = (parent_id: string) => {
      let children = allElements.filter(el => el.parent_element_id == parent_id);
      if(children.length > 0){
        children.forEach(child => {
          allElements = allElements.filter(el => el.id !== child.id)
          removeChildren(parent_id)
        })
      }
    }

    element_ids.forEach(id => {
      allElements = allElements.filter(el => el.id !== id)
      removeChildren(id)
    })

    setRendererState({
      allElements,
      active_element: [state.allElements.find(el => !el.parent_element_id) as ElementData]
    })
  }

  const updateElementIndex = (mode: 'increment' | 'decrement') => {
    const { activeElements, allElements: allEl } = getNeeded();
    const allElements = [...allEl];
    const theElement = activeElements.length === 1 ? allElements.find(el => el.id === activeElements[0].id) : null;

    if (theElement) {
      const parentChildren = allElements
        .filter(el => el.parent_element_id === theElement.parent_element_id)
        .sort((a, b) => a.index - b.index);

      const elementIndex = parentChildren.findIndex(el => el.id === theElement.id);

      if (mode === 'increment' && elementIndex < parentChildren.length - 1) {
        [parentChildren[elementIndex].index, parentChildren[elementIndex + 1].index] = [
          parentChildren[elementIndex + 1].index,
          parentChildren[elementIndex].index,
        ];
      } else if (mode === 'decrement' && elementIndex > 0) {
        [parentChildren[elementIndex].index, parentChildren[elementIndex - 1].index] = [
          parentChildren[elementIndex - 1].index,
          parentChildren[elementIndex].index,
        ];
      }

      setRendererState({
        allElements: allElements.map(el => {
          const updatedChild = parentChildren.find(child => child.id === el.id);
          return updatedChild ? { ...el, index: updatedChild.index } : el;
        }),
      });
    }
  };


  const duplicateSelected = () => {
    const { allElements, activeElements } = getNeeded();

    if (!activeElements[0]) return;

    const selectedElement = activeElements[0];
    const newElements: ElementData[] = [];

    const duplicateElementWithChildren = (element: ElementData, newParentID: string | null): ElementData => {
      const newElementID = generateRandomId(12);

      const duplicatedElement = {
        ...element,
        id: newElementID,
        parent_element_id: newParentID,
        children_elements: [],
      };

      const children = allElements.filter(el => el.parent_element_id === element.id);
      children.forEach(child => {
        const duplicatedChild = duplicateElementWithChildren(child, newElementID);
        //@ts-ignore
        duplicatedElement.children_elements?.push(duplicatedChild)
      });

      newElements.push(duplicatedElement);
      return duplicatedElement;
    };

    duplicateElementWithChildren(selectedElement, selectedElement.parent_element_id);

    setRendererState({
      allElements: [...allElements, ...newElements],
      active_element: [newElements[0]],
    });
  };


  const updateElementChakraProps = ({}: {
    element_id: string
    data: ChakraProps
  }) => {}

  const copyElement = (element_id: string) => {}

  const cutElement = (element_id: string) => {}

  return (
    <RendererContext.Provider value={{ state, setRendererState, addElements, selectMultipleElements, removeElements, updateElementIndex, duplicateSelected }}>
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
