import {
  StaticElementParams
} from './static-element.types'
import { DndElementData } from '@repo/designer/types/designer.types'

export const defaultRootElement = (data:StaticElementParams):DndElementData => {
  let id ='__designer-root__'; // ⚠️ don't change this ⚠️
  return {
    dnd_id: id,
    children_dnd_element_data: [],
    index: data.index,
    parent_dnd_id: data.parent_id,
    element_data: {
      element_id: id,
      index: data.index,
      parent_element_id: data.parent_id,
      attributes: {},
      html_tag: 'div',
      chakraProps: {
        minH: '90vh',
        // bg: '#ffff',
        px: '60px',
        py: '220px',
        bg: 'url(https://img.freepik.com/free-vector/beautiful-summer-gradient-background-blue-yellow_53876-120751.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716768000&semt=ais_user)',
        bgPosition: 'center',
        bgSize: 'cover'
      },
      style: {},
      name: 'Root body element',
      slug: 'body-body-element',
      description: '',
      can_delete: false,
    },
  }
}
