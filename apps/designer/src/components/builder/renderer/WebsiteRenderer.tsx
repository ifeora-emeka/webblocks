'use client'
import { setBuilderViewState } from '@/redux/features/builder/builder-view.slice'
import {
  DesignerElementData,
  DesignerPageData,
} from '@repo/designer/types/designer.types'
import { useDispatch, useSelector } from 'react-redux'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  useDndMonitor,
  useDroppable,
} from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import {
  addElement,
  setRendererState,
} from '@/redux/features/renderer/renderer.slice'
import { RootState } from '@/redux/store'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'

type Props = {
  pageData: DesignerPageData
  elements: DesignerElementData[]
}

export default function WebsiteRenderer({ pageData }: Props) {
  const dispatch = useDispatch()
  const { allElements } = useSelector((state: RootState) => state.renderer)
  const { isOver, setNodeRef, over } = useDroppable({
    id: 'website-renderer',
    // data: {
    //   isElement: true,
    // },
  })

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      if (event.over) {
        dispatch(addElement(event.active.data.current as any))
      }
    },
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active?.id !== over?.id) {
      const activeId = active?.id
      const overId = over?.id

      // Find the index of the active and over elements
      const activeIndex = allElements.findIndex(
        (element) => element.element_id === activeId,
      )
      const overIndex = allElements.findIndex(
        (element) => element.element_id === overId,
      )

      // If both elements are found, update the state to reflect the new order
      if (activeIndex !== -1 && overIndex !== -1) {
        const newElements = arrayMove(allElements, activeIndex, overIndex)
        dispatch(setRendererState({ allElements: newElements }))
      }
    }
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={allElements.map((element) => element.element_id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            onClick={() =>
              dispatch(
                setBuilderViewState({
                  panel: null,
                }),
              )
            }
          >
            <div
              className={cn(
                'bg-white rounded-sm min-h-screen min-w-[99%]',
                pageData?.body?.attributes?.className || '',
              )}
            >
              {/*<div className={'h-28 bg-primary text-3xl w-full'} />*/}
              {allElements?.map((element) => (
                <>
                  <ElementRenderer
                    key={element.element_id}
                    element={element}
                    id={element.element_id}
                  />
                </>
              ))}
              {isOver && (
                <div
                  className={
                    'm-2 rounded-md bg-accent min-h-40 border-4 border-dotted border-primary'
                  }
                ></div>
              )}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}
