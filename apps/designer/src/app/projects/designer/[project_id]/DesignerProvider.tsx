// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { BuilderVariablesProvider } from '@/components/builder/context/builder-variables.context'

export function DesignerProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider disableGlobalStyle>
      <BuilderVariablesProvider>{children}</BuilderVariablesProvider>
    </ChakraProvider>
  )
}
