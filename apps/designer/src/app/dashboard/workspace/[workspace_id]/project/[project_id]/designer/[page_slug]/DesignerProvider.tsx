// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { BuilderVariablesProvider } from '@/components/builder/context/builder-variables.context'
import { RendererProvider } from '@/components/builder/context/renderer.context'
// import { ProjectData } from '@/types/projects.types'
// import { useDispatch } from 'react-redux'
// import { setBuilderState } from '@/redux/features/builder/builder.slice'
// import { PageMetadata, PagesData } from '@/types/pages.type'

export function DesignerProvider({
  children,
  // project,
  // metadata,
  // pages
}: {
  children: React.ReactNode
  // project: ProjectData
  // pages: PagesData[]
  // metadata: PageMetadata
}) {
  // const dispatch = useDispatch()

  // console.log('INCOMING PROJECT:::', project)
  // dispatch(
  //   setBuilderState({
  //     project,
  //     metadata,
  //     pages
  //   }),
  // )
  return (
    <ChakraProvider disableGlobalStyle>
      <RendererProvider>
        <BuilderVariablesProvider>
          {children}
        </BuilderVariablesProvider>
      </RendererProvider>
    </ChakraProvider>
  )
}
