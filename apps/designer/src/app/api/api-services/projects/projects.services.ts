import { cleanupSubdomain, generateRandomId } from '@/lib/utils'
import { createPage } from '../pages/page.services'
import Projects from './projects.schema'

export const createProject = async (data: any, user_id: string) => {
  try {
    const newProject = await Projects.create({
      name: data.name,
      owner: user_id,
      subdomain: cleanupSubdomain(data.name) + '-' + generateRandomId(),
    })

    await createPage({
      project_id: newProject?._id as string,
      route: '/',
      name: 'Home',
    })
    return newProject
  } catch (error) {
    return Promise.reject(error)
  }
}
