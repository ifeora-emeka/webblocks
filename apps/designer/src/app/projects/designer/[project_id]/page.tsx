import WebsiteBuilder from '@/components/builder/WebsiteBuilder'
import BuilderLoading from '@/components/builder/BuilderLoading'
import React from 'react'

export default function Page() {
  // return <WebsiteBuilderLoading />
  return (
    <>
      <BuilderLoading />
      <WebsiteBuilder page={{} as any} elements={[]} />
    </>
  )
}
