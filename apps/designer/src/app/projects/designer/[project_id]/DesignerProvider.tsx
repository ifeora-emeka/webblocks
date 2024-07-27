// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function DesignerProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider disableGlobalStyle>{children}</ChakraProvider>
}
