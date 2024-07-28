import { DndElementData } from '@repo/designer/types/designer.types'
import { StaticElementParams } from './static-element.types'
import { generateRandomId } from '@/lib/utils'
import { store } from '@/redux/store'
import { staticFrameChakraStyle } from '@/components/builder/renderer/element-render/static-element-data/static-chakra-style'
import { generateStaticBreakpoints } from '@/lib/designer.utils'

export const staticImageElement = (
  data: StaticElementParams,
): DndElementData => {
  let id = generateRandomId(14) + '-img'

  return {
    dnd_id: id,
    children_dnd_element_data: [],
    index: data.index,
    parent_dnd_id: data.parent_id,
    element_data: {
      attributes: {
        width: '100%',
        src: 'https://savethefrogs.com/wp-content/uploads/placeholder-image-blue-landscape.png',
      },
      element_id: id,
      index: data.index,
      parent_element_id: data.parent_id,
      html_tag: 'img',
      chakraProps: {
        width: generateStaticBreakpoints('100%'),
        height: generateStaticBreakpoints('100%'),
      },
      style: {},
      name: 'Image',
      slug: 'image',
      description: 'default image element',
      can_delete: true,
    },
  }
}
