import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import EachProject from '@/app/projects/components/EachProject'
import { connectToDataBase } from '@/lib/db.utils'
import { ProjectsDocument } from '@/app/api/api-services/projects/projects.schema'
import axios from 'axios'
import { CLIENT_URL } from '@/lib/constants'

export default async function Page() {
  await connectToDataBase()

  let projects = await axios(CLIENT_URL + '/api/projects')

  return (
    <DashboardLayout>
      <div className={'px-default_spacing'}>
        <div className="flex justify-between items-center border-b py-default_spacing">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            All sites
          </h3>
          <Button size={'sm'}>Create Site</Button>
        </div>
      </div>
      <div className={'grid grid-cols-3 gap-4 p-default_spacing'}>
        {projects &&
          projects.data.map((project: ProjectsDocument) => {
            return <EachProject key={project._id as string} project={project} />
          })}
      </div>
    </DashboardLayout>
  )
}
