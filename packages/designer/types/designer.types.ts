import React, { CSSProperties } from 'react'

export interface DesignerPageMetadata {
  title: string
  description: string
}

export interface DesignerPageData {
  element_id: string
  name: string
  slug: string
  description?: string
  meta_tags: DesignerPageMetadata
  // elements: DesignerElementData[]
  body: Partial<DesignerElementData>
}

export interface DesignerElementDataDTO  {
  element_id: string;
  // index: number;
  name: string
  slug: string
  description?: string
  type: React.ElementType;
  style?: CSSProperties;
  tailwindStyle: CSSProperties
  childrenTailwindStyle?: CSSProperties;
  attributes: AttributeData;
  children?: Array<DesignerElementData | string>
}

export interface DesignerElementData extends DesignerElementDataDTO {
  _id: string;
}

export interface AttributeData {
  [key: string]: string | number | boolean | undefined
}

export type DesignerLeftPanel =
  | null
  | 'elements'
  | 'blocks'
  | 'pages'
  | 'outline'
  | 'variables'
  | 'theme'
  | 'assets'
  | 'content'
  | 'settings'

export type RendererProps = {
  page: DesignerPageData;
  elements: DesignerElementData[];
}

export type DraggableElement =
  | 'div'
  | 'img'
  | 'h1'
  | 'iframe'
  | 'video'
  | 'section'
  | 'container'
  | 'grid'
  | 'row'
  | 'column'
