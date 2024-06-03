import { ElementBreakpoint } from '@/components/builder/types/element-style.types'

export const generateStaticBreakpoints = (
  value: string,
): ElementBreakpoint => ({
  '2xl': value,
  base: value,
  lg: value,
  md: value,
  sm: value,
  xl: value,
})
