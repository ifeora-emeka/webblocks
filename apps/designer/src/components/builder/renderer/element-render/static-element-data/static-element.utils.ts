import { staticHeadingElement } from '@/components/builder/renderer/element-render/static-element-data/heading-element'
import { staticFrameElement } from '@/components/builder/renderer/element-render/static-element-data/frame-element'
import { DndElementData } from '@repo/designer/types/designer.types'

export function getStaticElement ({ type, index, parent_id }: {type:string; index:number; parent_id:string; }):DndElementData {
  switch (type) {
    case "heading":
      return staticHeadingElement({
        index,
        parent_id
      })
    case "frame":
      return staticFrameElement({
        index,
        parent_id
      })
    default:
      return staticFrameElement({
        index,
        parent_id
      })
  }
};

