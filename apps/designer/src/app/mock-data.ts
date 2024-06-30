import {
  DesignerElementDataDTO,
  DndElementData,
} from '@repo/designer/types/designer.types'
import { generateRandomId } from '@/lib/utils'

const defaultElementData: DesignerElementDataDTO = {
  index: 0,
  element_id: '',
  parent_element_id: null,
  slug: 'jumbo',
  name: 'Jumbotron',
  description: '',
  attributes: {},
  html_tag: 'div',
  style: {},
  jss_style: {}
}

export const HeroSection = (): DndElementData[] => {
  const sectionId = generateRandomId(15)
  const leftColumnId = generateRandomId(15)
  const rightColumnId = generateRandomId(15)
  const headingId = generateRandomId(15)
  const subheadingId = generateRandomId(15)
  const buttonId = generateRandomId(15)
  const imageId = generateRandomId(15)

  return [

  ]
}
