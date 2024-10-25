import { ElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'
import { generateStaticBreakpoints } from '@/lib/designer.utils'

export const staticHeadingElement = (
  data: StaticElementParams,
): ElementData => {
  let id = generateRandomId(14) + '-heading'
  let headings = store
    ?.getState()
    .renderer.allElements.filter((x) => x.slug == 'heading')

  return {
    id,
    children_elements: [],
    index: 0,
    parent_element_id: data.parent_id,
    attributes: {},
    text_content: 'Default heading text',
    html_tag: 'h1',
    chakraProps: {
      fontSize: generateStaticBreakpoints('20px'),
      fontWeight: generateStaticBreakpoints('400'),
      textAlign: generateStaticBreakpoints('start'),
      color: generateStaticBreakpoints('#1c1b1b'),
    },
    style: {},
    name: 'Heading ' + headings.length,
    slug: 'heading',
    description: '',
    can_delete: true,
  }
}
