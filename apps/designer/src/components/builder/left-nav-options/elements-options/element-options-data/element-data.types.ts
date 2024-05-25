import { DndElementData } from '@repo/designer/types/designer.types'

export type EachElementData = {
  slug: string
  label: string
  preview: any
  data: DndElementData
}

export type EachBlockElement = {
  _id: string
  name: string
}
