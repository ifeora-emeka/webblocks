import { ElementBreakpoint } from '@/components/builder/types/element-style.types'

export const generateStaticBreakpoints = (
  value: string,
): ElementBreakpoint => ({
  base: value,
  lg: value,
  md: value,
})
