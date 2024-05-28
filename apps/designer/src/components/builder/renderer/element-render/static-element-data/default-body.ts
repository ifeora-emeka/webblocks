import {
  StaticElementParams
} from './static-element.types'
import { DndElementData } from '@repo/designer/types/designer.types'

export const defaultRootElement = (data:StaticElementParams):DndElementData => {
  let id ='__designer-root__'; // ⚠️ don't change this ⚠️
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
      chakraProps: {
        minH: '90vh',
        bg: '#ffff',
      },
      style: {},
      name: 'Root body element',
      slug: 'body-body-element',
      description: '',
      can_delete: true
    }
  }
}
