import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
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
        background: generateStaticBreakpoints('#ffff'),
        display: generateStaticBreakpoints('flex'),
        padding: generateStaticBreakpoints('15px'),
        flexFlow: generateStaticBreakpoints('column'),
        // minHeight: generateStaticBreak
        // points('20px'),
        // minWidth: generateStaticBreakpoints('20px'),
        width: generateStaticBreakpoints('100%'),
        // background: generateStaticBreakpoints(DEFAULT_FRAME_COLOR),
        // placeContent: generateStaticBreakpoints('center'),
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
