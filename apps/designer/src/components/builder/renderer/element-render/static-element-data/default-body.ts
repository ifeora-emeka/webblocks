import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { StaticElementParams } from './static-element.types'
import { DndElementData } from '@repo/designer/types/designer.types'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'
import { DEFAULT_FRAME_COLOR } from '@/components/builder/builder.constants'

//todo: move this to DB and delete it
export const defaultRootElement = (
  data: StaticElementParams,
): DndElementData => {
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
        backgroundColor: generateStaticBreakpoints(DEFAULT_FRAME_COLOR),
        placeContent: generateStaticBreakpoints('start'),
        gap: generateStaticBreakpoints('0'),
        minH: generateStaticBreakpoints('90vh'),
        // bg: '#ffff',
        px: generateStaticBreakpoints('60px'),
        py: generateStaticBreakpoints('220px'),
        bg: generateStaticBreakpoints(
          'url(https://img.freepik.com/premium-photo/soft-blur-nature-background-abstract-modern-website-graphics-with-smooth-gradient-background_532332-40.jpg)',
        ),
        // bg: 'url(https://img.freepik.com/free-vector/beautiful-summer-gradient-background-blue-yellow_53876-120751.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716768000&semt=ais_user)',
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
