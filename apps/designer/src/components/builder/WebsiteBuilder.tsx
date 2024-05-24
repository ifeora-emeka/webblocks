'use client'
import { cn } from '@/lib/utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import PropertiesPanel from '@/components/builder/PropertiesPanel'
import BuilderLeftMenu from '@/components/builder/layout/BuilderLeftMenu'
import React, { useEffect, useState } from 'react'
import BuilderHeader from '@/components/builder/layout/BuilderHeader'
import LeftNavOptions from './left-nav-options/LeftNavOptions'
import WebsiteRenderer from './renderer/WebsiteRenderer'
import { HomePage } from '@/app/mock-data'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { TbApps } from 'react-icons/tb'
import {
  DesignerElementData,
  RendererProps,
} from '@repo/designer/types/designer.types'
import DragOverlayElement from '@/components/builder/DragOverlayElement'

/**
 * - Create a designer elements redux store
 * - Renderer should use elements from the redux store
 * - Redux should use local storage
 * - Elements should be added to redux when dropped
 * -
 * -
 */

export default function WebsiteBuilder({
  page,
  elements,
}: RendererProps) {
  const [show, setShow] = useState(false)
  const [activeId, setActiveId] = useState(null)



  useEffect(() => {
    setShow(true)
  }, [])


  if (!show) {
    return null
  }

  return (
    <>
      <DndContext>
        <div
          className={
            'bg-background min-h-[100vh] max-h-[100vh] flex dark flex-col '
          }
        >
          <BuilderHeader />
          <div className={'flex-1 flex'}>
            <BuilderLeftMenu />
            <LeftNavOptions />
            <div
              className={cn(
                `flex-grow flex justify-center min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] overflow-y-auto `,
              )}
            >
              <WebsiteRenderer pageData={{} as any} elements={elements} />
            </div>
            <PropertiesPanel />
          </div>
        </div>
        <DragOverlayElement />
      </DndContext>
    </>
  )
}
