import React, { CSSProperties } from "react";
import { ChakraProps } from "@chakra-ui/react";
import { ElementBreakpoint } from "../../../apps/designer/src/components/builder/types/element-style.types";
import { PageMetadata } from "../../../apps/designer/src/types/pages.type";

export type ResponsiveChakraProps = {
  [key: string]: ElementBreakpoint;
};

export interface DesignerPageData {
  element_id: string;
  name: string;
  slug: string;
  description?: string;
  meta_tags: PageMetadata;
  // elements: DesignerElementData[]
  body: Partial<DesignerElementData>;
}

export interface DndElementData {
  index: number;
  element_data: DesignerElementDataDTO;
  children_dnd_element_data?: DndElementData[];

  dnd_id: string;
  parent_dnd_id: string | null;
}

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
  chakraProps: ResponsiveChakraProps;
  can_delete?: boolean;
  text_content?: string;
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
  | "components"
  | "blocks"
  | "pages"
  | "outline"
  | "variables"
  | "theme"
  | "assets"
  | "content"
  | "settings";

export type DraggableElement =
  | "hero"
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

export type BuilderBreakpoints = "base" | "md" | "lg" | "xl";

export type BuilderReferenceType = "collections" | "variables" | "styles";

export type BuilderReferenceValue = {
  type: BuilderReferenceType;
  ref_id: string;
};
