'use client'
import { cn } from '@/lib/utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import PropertiesPanel from '@/components/builder/PropertiesPanel'
import BuilderLeftMenu from '@/components/builder/layout/BuilderLeftMenu'
import React, { useEffect, useState } from 'react'
import BuilderHeader from '@/components/builder/layout/builder-header/BuilderHeader'
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
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useDispatch, useSelector } from 'react-redux'
import GPTElementRenderer from './renderer/WebsiteRenderer'
import { AppStore } from '@/redux/store'
import { setRendererState } from '@/redux/features/renderer/renderer.slice'
import { defaultRootElement } from '@/components/builder/renderer/element-render/static-element-data/default-body'
import BuilderKeyMapper from '@/components/builder/BuilderKeyMapper'
import { DesignerProvider } from '@/app/dashboard/workspace/[workspace_id]/project/[project_id]/designer/[page_slug]/DesignerProvider'

export default function WebsiteBuilder() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  if (!show) {
    return null
  }

  return (
    <>
      <DesignerProvider>
        <BuilderKeyMapper />
        <div
          className={
            'bg-background min-h-[100vh] max-h-[100vh] flex flex-col overflow-hidden'
          }
        >
          <BuilderHeader />
          <div className={'flex-1 flex overflow-hidden'}>
            <BuilderLeftMenu />
            <LeftNavOptions />
            <div
              className={cn(
                `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] overflow-y-auto w-full light border-l border-r`,
              )}
            >
              <GPTElementRenderer />
            </div>
            <PropertiesPanel />
          </div>
        </div>
      </DesignerProvider>
    </>
  )
}
