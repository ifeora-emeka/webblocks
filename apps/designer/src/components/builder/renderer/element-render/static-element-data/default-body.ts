import { StaticElementParams } from './static-element.types'
import { DndElementData } from '@repo/designer/types/designer.types'


//todo: move this to DB and delete it
export const defaultRootElement = (
  data: StaticElementParams,
): DndElementData => {
  let id = '__designer-root__'; // ⚠️ don't change this ⚠️
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
        id
      },
      html_tag: 'div',
      jss_style: {
        minHeight: '300px',
        background: 'darkorange', // Default background (mobile)
        '@media (min-width: 768px)': {
          background: 'lightblue', // Tablet background
        },
        '@media (min-width: 1024px)': {
          background: 'lightgreen', // Desktop background
        },
      },
      style: {},
      name: '_root_',
      slug: 'root-element',
      description: '',
      can_delete: false,
    },
  };
};
