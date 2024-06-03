import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { ChakraProps } from '@chakra-ui/react'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'

export const staticFrameChakraStyle: ResponsiveChakraProps = {
  // overflow: 'hidden',
  gap: generateStaticBreakpoints('6px'),
  padding: generateStaticBreakpoints('0px'),
  margin: generateStaticBreakpoints('0px'),
  position: generateStaticBreakpoints('relative'),
  minWidth: generateStaticBreakpoints('auto'),
  maxWidth: generateStaticBreakpoints('auto'),
  minHeight: generateStaticBreakpoints('auto'),
  maxHeight: generateStaticBreakpoints('auto'),
  display: generateStaticBreakpoints('flex'),
  flexFlow: generateStaticBreakpoints('column'),
  placeContent: generateStaticBreakpoints('center'),
  alignItems: generateStaticBreakpoints('center'),
}
