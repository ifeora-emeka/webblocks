import { connectToDataBase } from '@/lib/db.utils'
import { validateAuthToken } from '../api-services/auth/auth.utils'
import { headers } from 'next/headers'
import { StatusCodes } from 'http-status-codes'
import { createElement } from '../api-services/elements/elements.services'
import { z } from 'zod'

const createElementSchema = z.object({
  data: z.string().nonempty('Data is required'),
  page_id: z.string().nonempty('Page ID is required'),
  project_id: z.string().nonempty('Project ID is required'),
})
export const POST = async (req: any) => {
  try {
    await connectToDataBase()
    const data = await req.json()

    const parsedData = createElementSchema.safeParse(data)

    if (!parsedData.success) {
      return Response.json(
        { message: 'bad request' },
        { status: StatusCodes.BAD_REQUEST },
      )
    }

    let auth = validateAuthToken(headers().get('authorization') as string)
    if (!auth) {
      return Response.json(
        { message: 'unauthorized' },
        { status: StatusCodes.UNAUTHORIZED },
      )
    }

    let result = await createElement({
      data: data.data,
      page_id: data.page_id,
      project_id: data.project_id,
    })

    return Response.json(result)
  } catch (error) {
    console.log('CREATE ELEMENT ERROR::', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
