import { DesignerElementData, DesignerElementDataDTO, DraggableElement } from '../types/designer.types'
import { generateRandomId, getRandomNumber } from 'designer-app/src/lib/utils'
import React from 'react'

export let defaultElementData = (type:React.ElementType, children: DesignerElementDataDTO[] | string, config: Partial<DesignerElementDataDTO>): DesignerElementDataDTO  => {
  return {
    element_id: generateRandomId(getRandomNumber(8, 13)),
    type,
    name: `${type}`.toUpperCase(),
    slug: type.toString(),
    attributes: {},
    children: children as (string | DesignerElementData)[] | undefined,
    style: {},
    tailwindStyle: {},
    childrenTailwindStyle: {},
    description: `A ${type} element`,
    ...config
  }
}


export const getDraggableElement = (type: DraggableElement): DesignerElementDataDTO => {
  switch (type) {
    case 'h1':
      return {
        ...defaultElementData('h1', [], {})
      };
    case 'img':
      return {
        ...defaultElementData('img', [], {})
      };
    default:
      return {
        ...defaultElementData('div', [], {})
      };
  }
};

