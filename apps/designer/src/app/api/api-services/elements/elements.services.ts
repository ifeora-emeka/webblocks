import Elements, { ElementsDocument } from './elements.schema'

export const createElement = async ({
  data,
  page_id,
  project_id,
}: {
  project_id: string
  page_id: string
  data: Partial<ElementsDocument>
}) => {
  try {
    await Elements.create({
      ...data,
      project: project_id,
      page: page_id,
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
