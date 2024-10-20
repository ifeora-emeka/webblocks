import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { StaticElementParams } from './static-element.types'
import { ElementData } from '@repo/designer/types/designer.types'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'
import { DEFAULT_FRAME_COLOR } from '@/components/builder/builder.constants'

//todo: move this to DB and delete it
export const defaultRootElement = (
  data: StaticElementParams,
): ElementData => {
  let id = '__designer-root__' // ⚠️ don't change this ⚠️
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
        background: generateStaticBreakpoints(DEFAULT_FRAME_COLOR),
        placeContent: generateStaticBreakpoints('start'),
        gap: generateStaticBreakpoints('0px'),
        minHeight: generateStaticBreakpoints('100vh'),
        bgPosition: generateStaticBreakpoints('center'),
        bgSize: generateStaticBreakpoints('cover'),
        display: generateStaticBreakpoints('flex'),
        flexFlow: generateStaticBreakpoints('column'),
      },
      style: {},
      name: '_root_',
      slug: 'root-element',
      description: '',
      can_delete: false,
    },
  }
}
