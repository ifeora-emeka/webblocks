//todo:
// A render context was created.
// So clean this up. it should only focus on builder related things
// and not element related things.

import { useDispatch } from 'react-redux'
import {
  BuilderBreakpoints,
  ElementData,
  ResponsiveChakraProps,
} from '@repo/designer/types/designer.types'
import {
  RendererState,
  setRendererState,
} from '@/redux/features/renderer/renderer.slice'
import { ChakraProps } from '@chakra-ui/react'

export const useBuilderUtils = () => {
  const dispatch = useDispatch()

  const updateRenderer = (newState: Partial<RendererState>) => {
    dispatch(setRendererState(newState))
  }

  const selectOneElementData = ({ element }: { element: ElementData }) => {
    dispatch(
      setRendererState({
        active_element: [element],
      }),
    )
  }

  const getViewportWidth = (breakpoint: BuilderBreakpoints): string => {
    switch (breakpoint) {
      case 'base':
        return '400px'
      case 'md':
        return '700px'
      case 'lg':
        return '100%'
      default:
        return '100%'
    }
  }

  return {
    updateRenderer,
    selectOneElementData,
    getViewportWidth,
  }
}
