import { DndElementData } from '@repo/designer/types/designer.types'
import {
  StaticElementParams
} from './static-element.types'
import { generateRandomId } from '@/lib/utils'

export const headingElement = (data: StaticElementParams):DndElementData => {
  let id = generateRandomId(14) + '-heading'
  return {
    dnd_id: id,
    children_dnd_element_data: [],
    is_active: true,
    index: data.index,
    parent_dnd_id: data.parent_id,
    element_data: {
      element_id: id,
      index: data.index,
      parent_element_id: data.parent_id,
      attributes: {},
      html_tag: 'h1',
      chakraProps: {},
      style: {},
      name: 'Heading element',
      slug: 'heading-element',
      description: '',
      can_delete: true
    }
  }
}

