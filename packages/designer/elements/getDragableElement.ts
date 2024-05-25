import {
  DesignerElementData,
  DesignerElementDataDTO, DndElementData,
  DraggableElement,
} from '../types/designer.types'
import { generateRandomId, getRandomNumber } from "designer-app/src/lib/utils";
import React from "react";
import { createContainerStyling } from 'designer-app/src/lib/designer.utils'


export let defaultElementData = (
  html_tag: React.ElementType,
  children: DndElementData[] | [string],
  config: Partial<DesignerElementDataDTO>,
  theID: string
): DesignerElementDataDTO => {
  return {
      element_id: theID,
      html_tag,
      name: `${html_tag}`.toUpperCase(),
      slug: html_tag.toString(),
      attributes: {},
      style: {},
      chakraProps: {},
      // childrenTailwindStyle: {},
      description: `A ${html_tag} element`,
      parent_element_id: null,
      ...config,
  };
};

export let defaultDndElement = (html_tag: React.ElementType, children: DndElementData[] | [string], config: Partial<DesignerElementDataDTO>): DndElementData => {
let theID = generateRandomId(getRandomNumber(8, 13))
  return {
    dnd_id: theID,
    parent_dnd_id: null,
    children_dnd_element_data: children,
    element_data: defaultElementData(html_tag, children, config, theID)
  }
}

export const getDraggableElement = (
  type: DraggableElement,
): DndElementData => {
  switch (type) {
    case "h1":
      return {
        ...defaultDndElement('h1', ["I am a simple heading text"], {
          chakraProps: {
            fontSize: 'xl',
            fontWeight: 'bold'
          }
        }),
      };
    case "img":
      return {
        ...defaultDndElement('img', [], {}),
      };
    case "row":
      return {
        ...defaultDndElement('div', [], {
          chakraProps: {
            display: 'flex',
            flexDir: 'row',
            bg: 'blue.50',
            color: 'blue.600'
          },
        }),
      };
    case "column":
      return {
        ...defaultDndElement('div', [], {
          chakraProps: {
            display: 'flex',
            flexDir: 'column',
            bg: 'blue.50',
            color: 'blue.600'
          },
        }),

      };
    case 'container':
      return {
        ...defaultDndElement('section', ['I am a container'], {
          chakraProps: {
            ...createContainerStyling(),
            bg: 'blue.50',
            color: 'blue.600'
          },
        }),
      }
    default:
      return {
        ...defaultDndElement('div', [], {}),
        // ...defaultElementData("div", [], {}),
      };
  }
};
