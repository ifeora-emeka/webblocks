import { connectToDataBase } from '@/lib/db.utils'
import { StatusCodes } from 'http-status-codes'
import { createProject } from '../api-services/projects/projects.services'
import { z } from 'zod'
import Projects from '@/app/api/api-services/projects/projects.schema'

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})
export const POST = async (req: any) => {
  try {
    await connectToDataBase()
    const data = await req.json()

    const validatedData = projectSchema.safeParse(data)
    if (!validatedData.success) {
      return Response.json(
        { message: 'Invalid data' },
        { status: StatusCodes.BAD_REQUEST },
      )
    }

    let newProject = await createProject(data)

    return Response.json(newProject)
  } catch (error) {
    console.log('PROJECTS ERROR::', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export const GET = async (req: any) => {
  try {
    await connectToDataBase()

    let projects = await Projects.find({})
    return Response.json(projects)
  } catch (error) {
    console.log('GET PROJECTS ERROR::', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
