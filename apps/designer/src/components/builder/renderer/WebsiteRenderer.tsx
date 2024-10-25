'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { compileAllDndElements } from '@/components/builder/builder.utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import { useRenderer } from '@/components/builder/context/renderer.context'
import { useBuilderUtils } from '@/components/builder/hooks/builder-utils.hooks'

type Props = {}

const GPTElementRenderer = ({}: Props) => {
  const {
    state: { allElements, activeBreakpoint },
  } = useRenderer()
  const { getViewportWidth } = useBuilderUtils()

  return (
    <>
      <div className={'flex justify-center'}>
        <div
          style={{
            minWidth: getViewportWidth(activeBreakpoint),
            maxWidth: getViewportWidth(activeBreakpoint),
          }}
          className={cn(
            `bg-white select-none overflow-hidden min-w-[700px] max-w-[700px] max-h-[calc(100vh-${BUILDER_NAV_SIZE})] min-h-[calc(100vh-${BUILDER_NAV_SIZE})] overflow-y-auto`,
            {
              'min-h-[calc(100vh-50px-1rem)]': allElements.length == 0,
            },
          )}
        >
          {allElements.length > 0 ? (
            <>
              <ElementRenderer element={compileAllDndElements(allElements)} />
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default GPTElementRenderer
