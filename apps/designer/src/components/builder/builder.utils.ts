import {
  BuilderReferenceValue,
  ElementData,
} from '@repo/designer/types/designer.types'

/**
 * @description Compiles all Dnd elements into a tree structure
 * @param elements
 * @returns
 */
export const compileAllDndElements = (elements: ElementData[]): ElementData => {
  const elementMap: { [key: string]: ElementData } = {}

  elements.forEach((element) => {
    elementMap[element.id] = { ...element, children_elements: [] }
  })

  let rootElement: ElementData | null = null

  elements.forEach((element) => {
    if (element.parent_element_id) {
      if (elementMap[element.parent_element_id]) {
        elementMap[element.parent_element_id].children_elements?.push(
          elementMap[element.id] as ElementData
        )

        elementMap[element.parent_element_id]?.children_elements?.sort(
          (a, b) => a.index - b.index
        )
      }
    } else {
      rootElement = elementMap[element.id]
    }
  })

  if (!rootElement) {
    throw new Error('No root element found')
  }

  console.log('COMPILED :::::::::::', rootElement)

  return rootElement
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export const createRefString = (ref: BuilderReferenceValue): string => {
  return `ref::${ref.type}::${ref.ref_id}`
}
