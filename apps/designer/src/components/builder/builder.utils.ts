import { DndElementData } from '@repo/designer/types/designer.types'

export const compileAllDndElements = (
  elements: DndElementData[],
): DndElementData => {
  const elementMap: { [key: string]: DndElementData } = {}

  elements.forEach((element) => {
    elementMap[element.dnd_id] = { ...element, children_dnd_element_data: [] }
  })

  let rootElement: DndElementData | null = null

  elements.forEach((element) => {
    if (element.parent_dnd_id) {
      if (elementMap[element.parent_dnd_id]) {
        elementMap[element.parent_dnd_id].children_dnd_element_data?.push(
          elementMap[element.dnd_id] as any,
        )
      }
    } else {
      rootElement = elementMap[element.dnd_id]
    }
  })


  if (!rootElement) {
    throw new Error('No root element found')
  }

  return rootElement
}
