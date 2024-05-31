import React from 'react'
import { useSelector } from 'react-redux'
import { useBuilder } from '@/components/builder/hooks/builder.hooks'
import { AppStore } from '@/redux/store'
import { RendererState } from '@/redux/features/renderer/renderer.slice'

export type WithRendererProps = {
  builderHook: ReturnType<typeof useBuilder>
  rendererState: RendererState
}

const withRenderer = <P extends WithRendererProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: any) => {
    const builderHook = useBuilder()
    const rendererState = useSelector((state: AppStore) => state.renderer)

    return (
      <WrappedComponent
        {...props}
        builderHook={builderHook}
        rendererState={rendererState}
      />
    )
  }
}

export default withRenderer
