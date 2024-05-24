'use client'
import { setBuilderViewState } from '@/redux/features/builder/builder-view.slice'
import {
  DesignerElementData,
  DesignerPageData,
} from '@repo/designer/types/designer.types'
import { useDispatch, useSelector } from 'react-redux'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { useState } from 'react'
import { addElement } from '@/redux/features/renderer/renderer.slice'
import { RootState } from '@/redux/store'

type Props = {
  pageData: DesignerPageData
  elements: DesignerElementData[]
}

export default function WebsiteRenderer({ pageData }: Props) {
  const dispatch = useDispatch();
  const { allElements } = useSelector((state:RootState) => state.renderer)
  const { isOver, setNodeRef, over } = useDroppable({
    id: 'website-renderer',
    // data: {
    //   isElement: true,
    // },
  });

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      if (event.over) {
        console.log('DRAG ENDED::', event.active.data.current)
        dispatch(addElement(event.active.data.current as any))
      }
    },
  })

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
          'bg-white rounded-sm min-h-screen min-w-[99%] my-2',
          pageData?.body?.attributes?.className || '',
        )}
      >
        {allElements?.map((element) => (
          <ElementRenderer key={element.element_id} element={element} />
        ))}
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
