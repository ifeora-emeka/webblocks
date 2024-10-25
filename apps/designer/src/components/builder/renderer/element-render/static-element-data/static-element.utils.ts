import { staticHeadingElement } from '@/components/builder/renderer/element-render/static-element-data/heading-element'
import { staticFrameElement } from '@/components/builder/renderer/element-render/static-element-data/frame-element'
import { ElementData } from '@repo/designer/types/designer.types'
import { staticParagraphElement } from '@/components/builder/renderer/element-render/static-element-data/static-paragraph-element'
import { staticImageElement } from './image-element'

export function getStaticElement({
  type,
  parent_id,
}: {
  type: string
  parent_id: string | null
}): ElementData {
  switch (type) {
    case 'heading':
      return staticHeadingElement({
        parent_id,
      })
    case 'frame':
      return staticFrameElement({
        parent_id,
      })
    case 'paragraph':
      return staticParagraphElement({
        parent_id,
      })
    case 'image':
      return staticImageElement({
        parent_id,
      })
    default:
      return staticFrameElement({
        parent_id,
      })
  }
}
