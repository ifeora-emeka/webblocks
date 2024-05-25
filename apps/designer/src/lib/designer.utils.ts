import { BoxProps } from '@chakra-ui/react'

export const createContainerStyling = (): BoxProps => {
  return {
    maxW: {
      base: '100%',
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      '2xl': '1320px',
    },
    mx: 'auto',
    px: { base: '0.75rem', md: '1rem' },
    h: '300px',
  }
}

export const createContainerFluidStyling = (): BoxProps => {
  return {
    ...createContainerStyling(),
    maxW: {
      base: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%',
      xl: '100%',
      '2xl': '100%',
    },
  }
}
