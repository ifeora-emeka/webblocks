import { useState } from 'react'
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { EachElementOption } from '@/components/builder/left-nav-options/elements-options/BuilderElementOptions'
import { DesignerElementDataDTO } from '@repo/designer/types/designer.types'

export default function DragOverlayElement() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>

  const isDraggedFromElementPanel =
    draggedItem.data?.current?.isFromElementPanel
  if (isDraggedFromElementPanel) {
    const _element = draggedItem.data?.current as DesignerElementDataDTO
    let { html_tag, slug } = _element
    node = (
      <EachElementOption
        element={_element}
        label={slug}
        slug={slug}
        content={<h1>The preview</h1>}
      />
    )
  }

  // const _element = draggedItem.data?.current as DesignerElementDataDTO;
  // if(_element.isInDesigner) {
  //   const elementId:DesignerElementDataDTO = draggedItem.data?.current?.element_id;
  //   if (!_element) node = <div>Element not found!</div>;
  //   else {
  //     // const DesignerElementComponent = FormElements[element.type].designerComponent;
  //
  //     node = (
  //       <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
  //         <h1>Existing element</h1>
  //         {/*<DesignerElementComponent elementInstance={element} />*/}
  //       </div>
  //     );
  //   }
  // }

  return <DragOverlay className={'dark'}>{node}</DragOverlay>
}
