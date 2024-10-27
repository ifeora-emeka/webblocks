import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {
  BuilderBreakpoints,
  ElementData,
} from '@repo/designer/types/designer.types'
import { defaultRootElement } from '@/components/builder/renderer/element-render/static-element-data/default-body'
import { ChakraProps } from '@chakra-ui/react'
import { isVoidElement } from '@repo/designer/constants'
import { generateRandomId } from '@/lib/utils'
import { staticFrameElement } from '@/components/builder/renderer/element-render/static-element-data/frame-element';
import merge from 'lodash.merge'

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

const RendererContext = createContext<{
  state: RendererState
  setRendererState: (payload: Partial<RendererState>) => void
  addElements: (element: ElementData[]) => void
  selectMultipleElements: (id: string) => void
  removeElements: () => void
  updateElementIndex: (mode: 'increment' | 'decrement') => void
  duplicateSelected: () => void
  groupSelected: () => void
  copySelectedElements: () => void
  pasteCopiedElements: () => void
  cutElements: () => void
  updateElementChakraProps: (data: ChakraProps) => void
  removeChakraProp: (propKey: string) => void
} | null>(null)

export const RendererProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialState)

  const setRendererState = (payload: Partial<RendererState>) => {
    setState(prevState => {
      return {
        ...prevState,
        ...payload,
      }
    })
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

  const addElements = (elements: ElementData[]) => {
    const { active_element: activeElements, allElements } = state;

    if (!activeElements[0]) return;

    let canCreate = true;

    const activeElementChildren = [...allElements].filter(
      (el) => el.parent_element_id === activeElements[0]?.id
    );

    const newElements = elements.map((el) => {
      if (isVoidElement(activeElements[0].html_tag as string) || activeElements[0].text_content) {
        canCreate = false;
      }

      return {
        ...el,
        parent_element_id: el.parent_element_id ?? activeElements[0].id,
        index: el.index ?? activeElementChildren.length,
      };
    });

    if (canCreate) {
      setState(prevState => {
        return {
          ...prevState,
          allElements: [...prevState.allElements, ...newElements],
          active_element: newElements,
        }
      })
    }
  };


  const selectMultipleElements = (element_id: string) => {
    const { active_element: activeElements, allElements } = state
    const activeElementIDs = activeElements.map((el) => el.id)

    if (activeElementIDs.includes(element_id)) {
      setRendererState({
        active_element: activeElements.filter((el) => el.id !== element_id),
      })
    } else {
      const theElement = allElements.find((el) => el.id === element_id)
      if (theElement) {
        setRendererState({
          active_element: [...activeElements, theElement],
        })
      }
    }
  }

  const removeElements = () => {
    const { active_element: activeElements } = state;
    const element_ids = new Set(activeElements.map((el) => el.id));
    let allElements = [...state.allElements];

    const removeChildren = (parent_id: string) => {
      let children = allElements.filter((el) => el.parent_element_id === parent_id);

      children.forEach((child) => {
        allElements = allElements.filter((el) => el.id !== child.id);
        removeChildren(child.id);
      });
    };

    element_ids.forEach((id) => {
      allElements = allElements.filter((el) => el.id !== id);
      removeChildren(id);
    });

    setRendererState({
      allElements,
      active_element: [
        state.allElements.find((el) => !el.parent_element_id) as ElementData,
      ],
    });
  };


  const updateElementIndex = (mode: 'increment' | 'decrement') => {
    const { active_element: activeElements, allElements: allEl } = state;
    const allElements = [...allEl]
    const theElement =
      activeElements.length === 1
        ? allElements.find((el) => el.id === activeElements[0].id)
        : null

    if (theElement) {
      const parentChildren = allElements
        .filter((el) => el.parent_element_id === theElement.parent_element_id)
        .sort((a, b) => a.index - b.index)

      const elementIndex = parentChildren.findIndex(
        (el) => el.id === theElement.id,
      )

      if (mode === 'increment' && elementIndex < parentChildren.length - 1) {
        ;[
          parentChildren[elementIndex].index,
          parentChildren[elementIndex + 1].index,
        ] = [
          parentChildren[elementIndex + 1].index,
          parentChildren[elementIndex].index,
        ]
      } else if (mode === 'decrement' && elementIndex > 0) {
        ;[
          parentChildren[elementIndex].index,
          parentChildren[elementIndex - 1].index,
        ] = [
          parentChildren[elementIndex - 1].index,
          parentChildren[elementIndex].index,
        ]
      }

      setState(prevState => {
        return {
          ...prevState,
          allElements: prevState.allElements.map((el) => {
            const updatedChild = parentChildren.find(
              (child) => child.id === el.id,
            )
            return updatedChild ? { ...el, index: updatedChild.index } : el
          }),
        }
      })

    }
  }

  const duplicateSelected = () => {
    const { allElements, active_element: activeElements } = state;

    if (!activeElements[0]) return

    const selectedElement = activeElements[0]
    const newElements: ElementData[] = []

    const duplicateElementWithChildren = (
      element: ElementData,
      newParentID: string | null,
    ): ElementData => {
      const newElementID = generateRandomId(12)

      const duplicatedElement = {
        ...element,
        id: newElementID,
        parent_element_id: newParentID,
        children_elements: [],
      }

      const children = allElements.filter(
        (el) => el.parent_element_id === element.id,
      )
      children.forEach((child) => {
        const duplicatedChild = duplicateElementWithChildren(
          child,
          newElementID,
        )
        //@ts-ignore
        duplicatedElement.children_elements?.push(duplicatedChild)
      })

      newElements.push(duplicatedElement)
      return duplicatedElement
    }

    duplicateElementWithChildren(
      selectedElement,
      selectedElement.parent_element_id,
    )

    setState(prevState => {
      return {
        ...prevState,
        allElements: [...allElements, ...newElements],
        active_element: [newElements[0]],
      }
    })
  }

  const updateElementChakraProps = (data: ChakraProps) => {
    if (!data || Object.keys(data).length === 0) return;

    const { active_element: activeElements, allElements, activeBreakpoint } = state;

    const updatedElements = allElements.map((el) => {
      if (activeElements.some((activeEl) => activeEl.id === el.id)) {
        return {
          ...el,
          chakraProps: {
            ...el.chakraProps,
            [activeBreakpoint]: merge({}, el.chakraProps?.[activeBreakpoint], data)
          }
        };
      }
      return el;
    });

    setState((prevState) => ({
      ...prevState,
      allElements: updatedElements,
    }));
  };

  const removeChakraProp = (propKey: string) => {
    const { active_element: activeElements, allElements } = state;

    const updatedElements = allElements.map((el) => {
      if (activeElements.some((activeEl) => activeEl.id === el.id)) {
        const updatedChakraProps = { ...el.chakraProps };
        delete updatedChakraProps[propKey];

        return { ...el, chakraProps: updatedChakraProps };
      }
      return el;
    });

    setState((prevState) => ({
      ...prevState,
      allElements: updatedElements,
    }));
  };



  const copySelectedElements = () => {
    const { active_element: activeElements, allElements } = state;
    const selectedElement = activeElements[0]

    if (!selectedElement || !selectedElement.parent_element_id) return

    const cloneElementWithChildren = (
      element: ElementData,
      newParentId: string | null = null,
    ): ElementData[] => {
      const newId = generateRandomId(12)
      const clonedElement: ElementData = {
        ...element,
        id: newId,
        parent_element_id: newParentId,
      }

      const children = allElements
        .filter((el) => el.parent_element_id === element.id)
        .flatMap((child) => cloneElementWithChildren(child, newId))

      return [clonedElement, ...children]
    }

    const copiedElements = cloneElementWithChildren(selectedElement)

    setRendererState({
      copiedElements,
    })
  }

  const pasteCopiedElements = () => {
    const { active_element: activeElements, allElements, copiedElements } = state;
    const newParent = activeElements[0]

    if (!newParent) return

    const idMap = new Map<string, string>()
    const updatedCopiedElements = copiedElements.map((element) => {
      const newId = generateRandomId(12)
      idMap.set(element.id, newId)
      return {
        ...element,
        id: newId,
        parent_element_id: element.parent_element_id
          ? idMap.get(element.parent_element_id) ?? newParent.id
          : newParent.id,
      }
    })

    setRendererState({
      allElements: [...allElements, ...updatedCopiedElements],
      active_element: [updatedCopiedElements[0]],
    })
  }

  const cutElements = () => {
    const { active_element: activeElements, allElements } = state;

    if (!activeElements.length) return

    const cutElementIDs = new Set(activeElements.map((el) => el.id))

    const remainingElements = allElements.filter(
      (el) => !cutElementIDs.has(el.id),
    )

    const copiedElements = activeElements.map((el) => {
      const newElement = { ...el }
      newElement.parent_element_id = null
      return newElement
    })

    setRendererState({
      allElements: remainingElements,
      active_element: [],
      copiedElements,
    })
  }

  const groupSelected = () => {
    const { active_element: activeElements, allElements } = state;
    const selectedElementParent = activeElements[0]?.parent_element_id
    const allEl = [...allElements]

    if (!selectedElementParent || activeElements?.length < 1) return

    const newFrame = staticFrameElement({
      parent_id: selectedElementParent,
    })

    allEl.push(newFrame)

    activeElements.forEach((el) => {
      const elementIndex = allEl.findIndex((item) => item.id === el.id)
      if (elementIndex !== -1) {
        allEl[elementIndex].parent_element_id = newFrame.id
      }
    })

    setState(prevState => {
      return {
        ...prevState,
        allElements: allEl,
        active_element: [newFrame],
      }
    })
  }

  return (
    <RendererContext.Provider
      value={{
        state,
        setRendererState,
        addElements,
        selectMultipleElements,
        removeElements,
        updateElementIndex,
        duplicateSelected,
        groupSelected,
        copySelectedElements,
        pasteCopiedElements,
        cutElements,
        updateElementChakraProps,
        removeChakraProp
      }}
    >
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
