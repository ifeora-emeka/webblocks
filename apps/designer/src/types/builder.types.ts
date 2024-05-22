import React, { CSSProperties } from 'react'

export interface PageMetaTags {
  title: string
  description: string
}

export interface PageData {
  element_id: string
  name: string
  slug: string
  description?: string
  meta_tags: PageMetaTags
  elements: PageElementData[]
  body: Partial<PageElementData>
}

export interface PageElementData {
  element_id: string
  // index: number;
  name: string
  slug: string
  description?: string
  type: React.ElementType

  style?: CSSProperties
  tailwindStyle: CSSProperties
  childrenTailwindStyle?: CSSProperties

  attributes: AttributeData
  children?: Array<PageElementData | string>
}

export interface AttributeData {
  [key: string]: string | number | boolean | undefined
}

export type BuilderLeftPanel =
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
