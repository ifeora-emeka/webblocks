import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'
import { DEFAULT_FRAME_COLOR } from '@/components/builder/builder.constants'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'

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
        ...staticFrameChakraStyle,
        display: 'flex',
        flexFlow: 'column',
        minH: '20px',
        minW: '20px',
        bg: DEFAULT_FRAME_COLOR,
        padding: '10px',
        placeContent: 'center',
        alignItems: 'center',
      },
      style: {},
      name: 'Frame',
      slug: 'frame',
      description: '',
      can_delete: true,
    },
  }
}
