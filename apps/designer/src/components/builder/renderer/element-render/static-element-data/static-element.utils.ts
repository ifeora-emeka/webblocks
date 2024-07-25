import { staticHeadingElement } from '@/components/builder/renderer/element-render/static-element-data/heading-element'
import { staticFrameElement } from '@/components/builder/renderer/element-render/static-element-data/frame-element'
import { DndElementData } from '@repo/designer/types/designer.types'
import { staticParagraphElement } from '@/components/builder/renderer/element-render/static-element-data/static-paragraph-element'
import { staticImageElement } from './image-element'

export function getStaticElement({
  type,
  index,
  parent_id,
}: {
  type: string
  index: number
  parent_id: string
}): DndElementData {
  switch (type) {
    case 'heading':
      return staticHeadingElement({
        index,
        parent_id,
      })
    case 'frame':
      return staticFrameElement({
        index,
        parent_id,
      })
    case 'paragraph':
      return staticParagraphElement({
        index,
        parent_id,
      })
    case 'image':
      return staticImageElement({
        index,
        parent_id,
      })
    default:
      return staticFrameElement({
        index,
        parent_id,
      })
  }
}
