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
import { useDispatch, useSelector } from 'react-redux'
import { DesignerProvider } from '@/app/projects/designer/[project_id]/DesignerProvider'
import GPTElementRenderer from './renderer/WebsiteRenderer'
import { AppStore, RootState } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { defaultRootElement } from '@/components/builder/renderer/element-render/static-element-data/default-body'
import BuilderKeyMapper from '@/components/builder/BuilderKeyMapper'

export default function WebsiteBuilder({ page, elements }: RendererProps) {
  const [show, setShow] = useState(false)
  const { allElements } = useSelector((state: AppStore) => state.renderer)
  const dispatch = useDispatch()

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

  useEffect(() => {
    if (allElements.length == 0) {
      let rootEl = defaultRootElement({
        index: 0,
        parent_id: null,
      })

      dispatch(
        setRendererState({
          allElements: [rootEl],
          active_element: [rootEl],
        }),
      )
    }
  }, [allElements])

  if (!show) {
    return null
  }

  return (
    <>
      <DesignerProvider>
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
              <div
                className={cn(
                  `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] overflow-y-auto w-full light`,
                )}
              >
                <GPTElementRenderer elements={allElements} />
              </div>
              <PropertiesPanel />
            </div>
          </div>
        </DndContext>
      </DesignerProvider>
    </>
  )
}
