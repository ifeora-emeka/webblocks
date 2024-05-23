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
import { getDraggableElement } from '../../../../../../../../packages/designer/elements/getDragableElement'

let size = 30
export const structureElements: EachElementData[] = [
  {
    slug: 'container-structure',
    data: getDraggableElement('container'),
    preview: <TbContainer size={size} />,
    label: 'Container',
  },
  {
    slug: 'section-structure',
    data: getDraggableElement('section'),
    preview: <TbSection size={size} />,
    label: 'Section',
  },
  {
    slug: 'row-structure',
    data: getDraggableElement('section'),
    preview: <TbArrowAutofitRight size={size} />,
    label: 'Row',
  },
  {
    slug: 'column-structure',
    data: getDraggableElement('column'),
    preview: <TbArrowAutofitDown size={size} />,
    label: 'Column',
  },
  {
    slug: 'grid-structure',
    data: getDraggableElement('grid'),
    preview: <TbLayoutGrid size={size} />,
    label: 'Grid',
  },
]

export const typographyElements: EachElementData[] = [
  {
    slug: 'heading-structure',
    data: getDraggableElement('h1'),
    preview: <TbHeading size={size} />,
    label: 'Heading',
  },
]

export const mediaElements: EachElementData[] = [
  {
    slug: 'image-structure',
    data: getDraggableElement('img'),
    preview: <TbPhoto size={size} />,
    label: 'Image',
  },
  {
    slug: 'video-structure',
    data: getDraggableElement('video'),
    preview: <TbVideo size={size} />,
    label: 'Video',
  },
]
