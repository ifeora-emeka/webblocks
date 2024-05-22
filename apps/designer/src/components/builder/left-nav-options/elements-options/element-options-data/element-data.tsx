import {
  TbArrowAutofitDown,
  TbArrowAutofitRight,
  TbContainer,
  TbHeading,
  TbLayoutGrid,
  TbPhoto,
  TbSection,
  TbVideo,
} from 'react-icons/tb'
import { EachElementData } from './element-data.types'

let size = 30
export const structureElements: EachElementData[] = [
  {
    slug: 'container-structure',
    data: {},
    preview: <TbContainer size={size} />,
    label: 'Container',
  },
  {
    slug: 'section-structure',
    data: {},
    preview: <TbSection size={size} />,
    label: 'Section',
  },
  {
    slug: 'row-structure',
    data: {},
    preview: <TbArrowAutofitRight size={size} />,
    label: 'Row',
  },
  {
    slug: 'column-structure',
    data: {},
    preview: <TbArrowAutofitDown size={size} />,
    label: 'Column',
  },
  {
    slug: 'grid-structure',
    data: {},
    preview: <TbLayoutGrid size={size} />,
    label: 'Grid',
  },
]

export const typographyElements: EachElementData[] = [
  {
    slug: 'heading-structure',
    data: {},
    preview: <TbHeading size={size} />,
    label: 'Heading',
  },
]

export const mediaElements: EachElementData[] = [
  {
    slug: 'image-structure',
    data: {},
    preview: <TbPhoto size={size} />,
    label: 'Image',
  },
  {
    slug: 'video-structure',
    data: {},
    preview: <TbVideo size={size} />,
    label: 'Video',
  },
]
