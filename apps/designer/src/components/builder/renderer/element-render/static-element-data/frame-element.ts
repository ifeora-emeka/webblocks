import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'
import { DEFAULT_FRAME_COLOR } from '@/components/builder/builder.constants'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'
import { generateStaticBreakpoints } from '@/lib/designer.utils'

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
        display: generateStaticBreakpoints('flex'),
        flexFlow: generateStaticBreakpoints('column'),
        minHeight: generateStaticBreakpoints('20px'),
        minWidth: generateStaticBreakpoints('20px'),
        width: generateStaticBreakpoints('100%'),
        bg: generateStaticBreakpoints(DEFAULT_FRAME_COLOR),
        placeContent: generateStaticBreakpoints('center'),
        alignItems: generateStaticBreakpoints('center'),
      },
      style: {},
      name: 'Frame',
      slug: 'frame',
      description: '',
      can_delete: true,
    },
  }
}
