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

export default function WebsiteBuilder() {
  const [show, setShow] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [elements, setElements] = useState([])

  useEffect(() => {
    setShow(true)
  }, [])

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    setActiveId(null)
    if (event.over) {
      // console.log('THE ACTIVE::', event.active, Object.keys(event))
      //@ts-ignore
      setElements((prevElements: any) => [...prevElements, event.active.id])
    }
  }

  if (!show) {
    return null
  }

  return (
    <>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
              <WebsiteRenderer pageData={HomePage} />
            </div>
            <PropertiesPanel />
          </div>
        </div>
        <DragOverlay>
          {activeId ? (
            <div
              className="flex justify-center items-center p-2 min-h-[80px] max-h-[80px] bg-background/30 text-muted-foreground rounded-md shadow-xl flex-col gap-default_spacing bg-card dark"
              style={{ zIndex: 1000 }}
            >
              <TbApps size={40} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}
