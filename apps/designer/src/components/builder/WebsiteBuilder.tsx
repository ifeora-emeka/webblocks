'use client'
import { cn } from '@/lib/utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import PropertiesPanel from '@/components/builder/PropertiesPanel'
import BuilderLeftMenu from '@/components/builder/layout/BuilderLeftMenu'
import React, { useEffect, useState } from 'react'
import BuilderHeader from '@/components/builder/layout/BuilderHeader'
import LeftNavOptions from './left-nav-options/LeftNavOptions'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { RendererProps } from '@repo/designer/types/designer.types'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { DesignerProvider } from '@/app/projects/[project_id]/DesignerProvider'
import BuilderKeyMapper from '@/components/builder/BuilderKeyMapper'
import ResizableIframe from '@/components/builder/renderer/ResizeableFrame'
import WebsiteRenderer from './renderer/WebsiteRenderer'

export default function WebsiteBuilder({ page, elements }: RendererProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    // const { active, over } = event;
    //
    // console.log('DRAGGED::', event)
    //
    // if (active.id !== over?.id) {
    //   dispatch(moveElement({ activeId: active.element_id, overId: over?.element_id }));
    // }
  }

  if (!show) {
    return null
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <BuilderKeyMapper />
        <div
          className={
            'bg-background min-h-[100vh] max-h-[100vh] flex dark flex-col dark overflow-hidden'
          }
        >
          <BuilderHeader />
          <div className={'flex-1 flex overflow-hidden'}>
            <BuilderLeftMenu />
            <LeftNavOptions />
            <DesignerProvider>
              <div
                className={cn(
                  `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] overflow-y-auto w-full light flex justify-center`,
                )}
              >
                <ResizableIframe>
                  <WebsiteRenderer />
                </ResizableIframe>
              </div>
            </DesignerProvider>
            <PropertiesPanel />
          </div>
        </div>
      </DndContext>
    </>
  )
}
