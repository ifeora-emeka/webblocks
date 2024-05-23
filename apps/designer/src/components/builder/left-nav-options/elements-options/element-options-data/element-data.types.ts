import { DesignerElementDataDTO } from '@repo/designer/types/designer.types'

export type EachElementData = {
  slug: string
  label: string
  preview: any
  data: DesignerElementDataDTO
}

export type EachBlockElement = {
  _id: string;
  name: string;
}
