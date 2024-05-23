import WebsiteBuilder from '@/components/builder/WebsiteBuilder'
// import WebsiteBuilderLoading from '@/components/builder/WebsiteBuilderLoading'

export default function Page() {
  // return <WebsiteBuilderLoading />
  return (
    <>
      <WebsiteBuilder page={{} as any} elements={[]} />
    </>
  )
}
