import { API_URL } from "@/lib/constants"
import ProjectsPage from "../ProjectsPage"
import { fetchAPI } from "@/lib/api"

export default async function Page() {

  let projectRes = await fetchAPI(API_URL + '/projects/?limit=20&page=1', {});
  let projects = await projectRes.json();

  return (
    <>
      <ProjectsPage projects={projects?.data?.results || []} />
    </>
  )
}
