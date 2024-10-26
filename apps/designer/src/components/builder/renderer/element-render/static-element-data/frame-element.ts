import { ElementData, ElementType } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'
import { generateStaticBreakpoints } from '@/lib/designer.utils'

export const staticFrameElement = (data: StaticElementParams): ElementData => {
  let id = generateRandomId(14) + '-frame'

  return {
    id,
    children_elements: [],
    index: 0,
    parent_element_id: data.parent_id,
    attributes: {},
    html_tag: 'div',
    chakraProps: {
      ...staticFrameChakraStyle,
      background: generateStaticBreakpoints('#dae1ef'),
      display: generateStaticBreakpoints('flex'),
      padding: generateStaticBreakpoints('15px'),
      flexFlow: generateStaticBreakpoints('column'),
      alignItems: generateStaticBreakpoints('center'),
      width: generateStaticBreakpoints('100%'),
    },
    style: {},
    name: 'Frame',
    slug: 'frame',
    description: '',
    can_delete: true,
    element_type: ElementType.DEFAULT,
  }
}
