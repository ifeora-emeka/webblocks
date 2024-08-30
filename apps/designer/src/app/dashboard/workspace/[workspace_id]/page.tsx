import DashboardBodyContainer from "@/components/layout/DashboardBodyContainer"
import EachProject from "../components/EachProject"

export default async function Page() {

  let projects = { data: [] }

  return (
    <>
      <DashboardBodyContainer heading="Projects">
        <div className="grid grid-cols-1 gap-default_spacing sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            new Array(12).fill(null).map((_, i) => {
              return <EachProject key={`project-${i}`} />
            })
          }
        </div>
      </DashboardBodyContainer>
    </>
  )
}
