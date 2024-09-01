import { API_URL } from '@/lib/constants'
import ProjectsPage from './ProjectsPage'
import { fetchAPI } from '@/lib/api'

export default async function Page() {
  let projects = await fetchAPI('/projects/?limit=20&page=1', {})

  return (
    <>
      <ProjectsPage projects={projects?.data?.results || []} />
    </>
  )
}
