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
    .renderer.allElements.filter((x) => x.element_data.slug == 'heading')

  return {
    dnd_id: id,
    children_dnd_element_data: [],
    index: data.index,
    parent_dnd_id: data.parent_id,
    element_data: {
      attributes: {},
      element_id: id,
      index: data.index,
      parent_element_id: data.parent_id,
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
    },
  }
}
