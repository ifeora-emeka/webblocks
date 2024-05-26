'use client'
import { cn } from '@/lib/utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import PropertiesPanel from '@/components/builder/PropertiesPanel'
import BuilderLeftMenu from '@/components/builder/layout/BuilderLeftMenu'
import React, { useEffect, useState } from 'react'
import BuilderHeader from '@/components/builder/layout/BuilderHeader'
import LeftNavOptions from './left-nav-options/LeftNavOptions'
import WebsiteRenderer from './renderer/WebsiteRenderer'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDndMonitor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { TbApps } from 'react-icons/tb'
import {
  DesignerElementData,
  RendererProps,
} from '@repo/designer/types/designer.types'
import DragOverlayElement from '@/components/builder/DragOverlayElement'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useDispatch, useSelector } from 'react-redux'
import { DesignerProvider } from '@/app/projects/[project_id]/DesignerProvider'
import GPTElementRenderer from './renderer/WebsiteRenderer'
import { HeroSection } from '@/app/mock-data'
import { AppStore, RootState } from '@/redux/store'

/**
 * - Create a designer elements redux store
 * - Renderer should use elements from the redux store
 * - Redux should use local storage
 * - Elements should be added to redux when dropped
 * -
 * -
 */

export default function WebsiteBuilder({ page, elements }: RendererProps) {
  const [show, setShow] = useState(false)
  const { allElements } = useSelector((state: AppStore) => state.renderer)

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
        <div
          className={
            'bg-background min-h-[100vh] max-h-[100vh] flex dark flex-col '
          }
        >
          <BuilderHeader />
          <div className={'flex-1 flex'}>
            <BuilderLeftMenu />
            <LeftNavOptions />
            <DesignerProvider>
              <div
                className={cn(
                  `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] overflow-y-auto w-full`,
                )}
              >
                <GPTElementRenderer elements={allElements} />
              </div>
            </DesignerProvider>
            <PropertiesPanel />
          </div>
        </div>
        <DragOverlayElement />
      </DndContext>
    </>
  )
}
