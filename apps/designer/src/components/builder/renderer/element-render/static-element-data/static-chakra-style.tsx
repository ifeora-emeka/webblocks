import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { ChakraProps } from '@chakra-ui/react'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'

export const staticFrameChakraStyle: ResponsiveChakraProps = {
  position: generateStaticBreakpoints('relative'),

  //layout
  display: generateStaticBreakpoints('flex'),
  justifyContent: generateStaticBreakpoints('flex-start'),

  //flex
  flexFlow: generateStaticBreakpoints('column'),
  placeContent: generateStaticBreakpoints('center'),
  alignItems: generateStaticBreakpoints('center'),
  flexWrap: generateStaticBreakpoints('nowrap'),

  //border
  borderRadius: generateStaticBreakpoints('0px'),
}
