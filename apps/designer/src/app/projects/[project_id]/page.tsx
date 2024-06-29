import WebsiteBuilder from '@/components/builder/WebsiteBuilder'
// import WebsiteBuilderLoading from '@/components/builder/WebsiteBuilderLoading'

/**
 * - Make a request here to get the page, elements and components for the active table
 * @constructor
 */
export default function Page() {
  // return <WebsiteBuilderLoading />
  return (
    <>
      <WebsiteBuilder page={{} as any} elements={[]} />
    </>
  )
}
