'use client'
import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { cn } from '@/lib/utils'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { compileAllDndElements } from '@/components/builder/builder.utils'

interface ElementRendererProps {
  elements: DndElementData[]
}

const GPTElementRenderer: React.FC<ElementRendererProps> = ({ elements }) => {
  return (
    <>
      <div className={'p-default_spacing'}>
        <div
          className={cn('bg-white  overflow-hidden', {
            'min-h-[calc(100vh-50px-1rem)]': elements.length == 0,
          })}
        >
          {elements.length > 0 ? (
            <>
              <ElementRenderer element={compileAllDndElements(elements)} />
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default GPTElementRenderer
