'use client'
import { setBuilderViewState } from '@/redux/features/builder/builder-view.slice'
import { DesignerElementData, DesignerPageData } from '@repo/designer/types/designer.types'
import { useDispatch } from 'react-redux'
import ElementRenderer from './element-render/ElementRenderer'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'


type Props = {
  pageData: DesignerPageData;
  elements: DesignerElementData[];
}

export default function WebsiteRenderer({ pageData, elements }: Props) {
  const dispatch = useDispatch()
  const { isOver, setNodeRef, over } = useDroppable({
    id: 'website-renderer',
    data: {
      isElement: true,
    },
  });

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      if (event.over) {
        console.log('DRAG ENDED::', event)
      }
    }
  });

  return (
    <>
      <div
        ref={setNodeRef}
        onClick={() =>
          dispatch(
            setBuilderViewState({
              panel: null,
            }),
          )
        }
        className={cn(
          'bg-card rounded-sm min-h-screen min-w-[99%] my-2',
          pageData?.body?.attributes?.className || '',
        )}
      >
        {/*{elements?.map((element) => (*/}
        {/*  <ElementRenderer key={element.element_id} element={element} />*/}
        {/*))}*/}
        {isOver && (
          <div
            className={
              'm-2 rounded-md bg-accent min-h-40 border-4 border-dotted border-primary'
            }
          ></div>
        )}
      </div>
    </>
  )
}
