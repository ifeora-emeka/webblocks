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
    chakraProps: {},
    // childrenTailwindStyle: {},
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
          chakraProps: {
            fontSize: '25px',
            fontWeight: 'bold'
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
          chakraProps: {
            display: "flex",
            flexDirection: "row",
            height: '200px',
            width: '100%',
            background: 'orange.300'
          },
        }),
      };
    case "column":
      return {
        ...defaultElementData("div", [], {
          chakraProps: {
            display: "flex",
            flexDirection: "column",
            height: '400px',
            width: '100%',
            background: 'green.100',
            color: 'green.700',
            fontSize: '70px'
          },
          children: ["This is a column", "Ït's just cool"]
        }),
      };
    default:
      return {
        ...defaultElementData("div", [], {}),
      };
  }
};
