'use client'
import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { cn } from '@/lib/utils'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { compileAllDndElements } from '@/components/builder/builder.utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'

type Props = {
  elements: DndElementData[]
} & WithRendererProps

const GPTElementRenderer = ({
  elements,
  rendererState,
  builderHook,
}: Props) => {
  const { activeBreakpoint } = rendererState
  const { getViewportWidth } = builderHook

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
              'min-h-[calc(100vh-50px-1rem)]': elements.length == 0,
            },
          )}
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

export default withRenderer(GPTElementRenderer)
