import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { ChakraProps } from '@chakra-ui/react'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'

export const staticFrameChakraStyle: ResponsiveChakraProps = {
  // overflow: 'hidden',

  //padding
  paddingTop: generateStaticBreakpoints('0px'),
  paddingBottom: generateStaticBreakpoints('0px'),
  paddingLeft: generateStaticBreakpoints('0px'),
  paddingRight: generateStaticBreakpoints('0px'),

  //margin
  marginTop: generateStaticBreakpoints('0px'),
  marginBottom: generateStaticBreakpoints('0px'),
  marginLeft: generateStaticBreakpoints('0px'),
  marginRight: generateStaticBreakpoints('0px'),

  //size
  height: generateStaticBreakpoints('auto'),
  width: generateStaticBreakpoints('auto'),
  //min-max size
  minWidth: generateStaticBreakpoints('auto'),
  maxWidth: generateStaticBreakpoints('auto'),
  minHeight: generateStaticBreakpoints('auto'),
  maxHeight: generateStaticBreakpoints('auto'),

  position: generateStaticBreakpoints('relative'),

  //layout
  gap: generateStaticBreakpoints('6px'),
  display: generateStaticBreakpoints('flex'),

  //flex
  flexFlow: generateStaticBreakpoints('column'),
  placeContent: generateStaticBreakpoints('center'),
  alignItems: generateStaticBreakpoints('center'),
  flexWrap: generateStaticBreakpoints('nowrap'),

  //border
  borderRadius: generateStaticBreakpoints('0px 0px 0px 0px'),
}
