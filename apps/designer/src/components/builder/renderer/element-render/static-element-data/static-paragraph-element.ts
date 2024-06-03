import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'

export const staticParagraphElement = (
  data: StaticElementParams,
): DndElementData => {
  let id = generateRandomId(14) + '-paragraph'
  let headings = store
    ?.getState()
    .renderer.allElements.filter((x) => x.element_data.slug == 'paragraph')

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
        innerText: `Default paragraph text`,
      },
      html_tag: 'p',
      chakraProps: {
        ...staticFrameChakraStyle,
        fontSize: '16px',
        fontWeight: 400,
        letterSpacing: 0,
        textTransform: 'none',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: '1.2em',
        textAlign: 'start',
      },
      style: {},
      name: 'Paragraph',
      slug: 'paragraph',
      description: '',
      can_delete: true,
    },
  }
}
