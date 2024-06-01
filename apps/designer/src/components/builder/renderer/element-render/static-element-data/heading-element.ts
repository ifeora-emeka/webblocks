import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'

export const staticHeadingElement = (
  data: StaticElementParams,
): DndElementData => {
  let id = generateRandomId(14) + '-heading'
  let headings = store
    ?.getState()
    .renderer.allElements.filter((x) => x.element_data.slug == 'heading')

  return {
    dnd_id: id,
    children_dnd_element_data: [],
    index: data.index,
    parent_dnd_id: data.parent_id,
    element_data: {
      element_id: id,
      index: data.index,
      parent_element_id: data.parent_id,
      attributes: {
        innerText: `Heading text element (${headings.length})`,
      },
      html_tag: 'h1',
      chakraProps: {
        fontSize: '4xl',
        fontWeight: 'bold',
      },
      style: {},
      name: 'Heading ' + headings.length,
      slug: 'heading',
      description: '',
      can_delete: true,
    },
  }
}
