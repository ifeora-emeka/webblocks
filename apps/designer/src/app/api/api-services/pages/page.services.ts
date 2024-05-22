import Pages from './page.schema'

export const createPage = async ({
  project_id,
  route,
  name,
}: {
  route: string
  project_id: string
  name: string
}) => {
  try {
    let result = await Pages.create({
      project: project_id,
      route: route,
      name,
    })

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}
