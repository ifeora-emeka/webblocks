import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { RendererState } from '@/redux/features/renderer/renderer.slice'
import { useBuilderUtils } from '../hooks/builder-utils.hooks'

export type WithRendererProps = {
  builderHook: ReturnType<typeof useBuilderUtils>
  rendererState: RendererState
}

const withRenderer = <P extends WithRendererProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: any) => {
    const builderHook = useBuilderUtils()
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
