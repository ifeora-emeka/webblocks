import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'
import { DEFAULT_FRAME_COLOR } from '@/components/builder/builder.constants'

export const staticFrameElement = (
  data: StaticElementParams,
): DndElementData => {
  let id = generateRandomId(14) + '-frame'

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
        minH: '20px',
        bg: DEFAULT_FRAME_COLOR,
      },
      style: {},
      name: 'Frame',
      slug: 'frame',
      description: '',
      can_delete: true,
    },
  }
}
