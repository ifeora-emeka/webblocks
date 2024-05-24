import {
  DesignerElementData,
  DesignerElementDataDTO,
  DraggableElement,
} from "../types/designer.types";
import { generateRandomId, getRandomNumber } from "designer-app/src/lib/utils";
import React from "react";

export let defaultElementData = (
  html_tag: React.ElementType,
  children: DesignerElementDataDTO[] | [string],
  config: Partial<DesignerElementDataDTO>,
): DesignerElementDataDTO => {
  return {
    element_id: generateRandomId(getRandomNumber(8, 13)),
    html_tag,
    name: `${html_tag}`.toUpperCase(),
    slug: html_tag.toString(),
    attributes: {},
    children: children as (string | DesignerElementData)[] | undefined,
    style: {},
    tailwindStyle: {
    },
    childrenTailwindStyle: {},
    description: `A ${html_tag} element`,
    ...config,
  };
};

export const getDraggableElement = (
  type: DraggableElement,
): DesignerElementDataDTO => {
  switch (type) {
    case "h1":
      return {
        ...defaultElementData("h1", [`${type} text element`], {
          tailwindStyle: {
            fontSize: 'text-3xl'
          }
        }),
      };
    case "img":
      return {
        ...defaultElementData("img", [], {
          attributes: {
            src: '/designer/img/img-placeholder.jpg'
          }
        }),
      };
    case "row":
      return {
        ...defaultElementData("div", [], {
          tailwindStyle: {
            display: "flex",
            flexDirection: "flex-row" as any,
            height: 'h-28',
            width: 'w-full',
            backgroundColor: 'bg-orange-400'
          },
        }),
      };
    case "column":
      return {
        ...defaultElementData("div", [], {
          tailwindStyle: {
            display: "flex",
            flexDirection: "flex-col" as any,
            height: 'h-28',
            width: 'w-full',
            backgroundColor: 'bg-purple-300 text-5xl'
          },
          children: ["This is a column"]
        }),
      };
    default:
      return {
        ...defaultElementData("div", [], {}),
      };
  }
};
