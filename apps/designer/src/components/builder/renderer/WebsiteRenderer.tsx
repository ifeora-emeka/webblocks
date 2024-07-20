'use client'
import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { cn } from '@/lib/utils'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { compileAllDndElements } from '@/components/builder/builder.utils'
import { useBuilderViewPort } from '../context/useBuilderViewport'

interface ElementRendererProps {
  elements: DndElementData[]
}

const GPTElementRenderer: React.FC<ElementRendererProps> = ({ elements }) => {
  const { viewportState, getViewportWidth } = useBuilderViewPort();
  return (
    <>
      <div className={'p-default_spacing flex justify-center'}>
        <div
          style={{ minWidth: getViewportWidth }}
          className={cn('bg-white select-none overflow-hidden min-w-[700px] max-w-[700px]', {
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
