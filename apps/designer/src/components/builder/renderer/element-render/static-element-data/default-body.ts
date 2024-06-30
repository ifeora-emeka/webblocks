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
        background: 'hotpink',
        minHeight: '300px',
        '@media (max-width: 600px)': {
          background: 'blueviolet',
          minHeight: '150px',
        },
        '@media (min-width: 601px) and (max-width: 1024px)': {
          background: 'lightblue',
        }
      },
      style: {},
      name: '_root_',
      slug: 'root-element',
      description: '',
      can_delete: false,
    },
  };
};
