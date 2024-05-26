import React, { CSSProperties } from "react";
import { BoxProps } from '@chakra-ui/react'

export interface DesignerPageMetadata {
  title: string;
  description: string;
}

export interface DesignerPageData {
  element_id: string;
  name: string;
  slug: string;
  description?: string;
  meta_tags: DesignerPageMetadata;
  // elements: DesignerElementData[]
  body: Partial<DesignerElementData>;
}

export interface DndElementData {
  index: number;
  element_data: DesignerElementDataDTO;
  children_dnd_element_data?: DndElementData[];

  dnd_id: string;
  parent_dnd_id: string | null;
  is_draggable?: boolean;
  is_active?: boolean;
  isInDesigner?:boolean;
  isFromElementPanel?:boolean;
};

export interface DesignerElementDataDTO {
  element_id: string;
  parent_element_id: string | null;
  index: number;
  name: string;
  slug: string;
  description?: string;
  html_tag: React.ElementType;
  style?: CSSProperties;
  attributes: AttributeData;
  // children?: Array<DesignerElementData | string>;
  chakraProps: BoxProps;
  can_delete?: boolean;
}

export interface DesignerElementData extends DesignerElementDataDTO {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttributeData {
  [key: string]: string | number | boolean | undefined;
}

export type DesignerLeftPanel =
  | null
  | "elements"
  | "components"
  | "blocks"
  | "pages"
  | "outline"
  | "variables"
  | "theme"
  | "assets"
  | "content"
  | "settings";

export type RendererProps = {
  page: DesignerPageData;
  elements: DndElementData[];
};

export type DraggableElement =
  | 'hero'
  | "div"
  | "img"
  | "h1"
  | "iframe"
  | "video"
  | "section"
  | "container"
  | "grid"
  | "row"
  | "column";
