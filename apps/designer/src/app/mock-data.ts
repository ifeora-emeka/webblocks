import {
  DesignerElementDataDTO,
  DndElementData,
} from '@repo/designer/types/designer.types'
import { generateRandomId } from '@/lib/utils'

const defaultElementData: DesignerElementDataDTO = {
  index: 0,
  element_id: '',
  parent_element_id: null,
  slug: 'jumbo',
  name: 'Jumbotron',
  description: '',
  attributes: {},
  html_tag: 'div',
  chakraProps: {},
  style: {},
}

export const HeroSection = (): DndElementData[] => {
  const sectionId = generateRandomId(15)
  const leftColumnId = generateRandomId(15)
  const rightColumnId = generateRandomId(15)
  const headingId = generateRandomId(15)
  const subheadingId = generateRandomId(15)
  const buttonId = generateRandomId(15)
  const imageId = generateRandomId(15)

  return [
    {
      dnd_id: sectionId,
      index: 0,
      element_data: {
        ...defaultElementData,
        element_id: sectionId,
        parent_element_id: null,
        index: 0,
        chakraProps: {
          minH: '400px',
          // bg: '#210143',
          bgGradient: "linear(to-b, #210143, #16012d)",
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: {
            lg: '9rem',
            base: 4
          },
          py: '150px',
          px: {
            base: '30px',
            lg: '140px'
          },
        },
        html_tag: 'section',
      },
      children_dnd_element_data: [],
      parent_dnd_id: null,
    },
    {
      dnd_id: leftColumnId,
      index: 0,
      element_data: {
        element_id: leftColumnId,
        parent_element_id: sectionId,
        index: 0,
        slug: 'left-column',
        name: 'Left Column',
        description: '',
        attributes: {},
        html_tag: 'div',
        chakraProps: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: sectionId,
    },
    {
      dnd_id: rightColumnId,
      index: 1,
      element_data: {
        element_id: rightColumnId,
        parent_element_id: sectionId,
        index: 1,
        slug: 'right-column',
        name: 'Right Column',
        description: '',
        attributes: {},
        html_tag: 'div',
        chakraProps: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: sectionId,
    },
    {
      dnd_id: headingId,
      index: 0,
      element_data: {
        element_id: headingId,
        parent_element_id: leftColumnId,
        index: 0,
        slug: 'hero-heading',
        name: 'Heading',
        description: 'Hero Section Heading',
        attributes: { innerText: 'Welcome to BlimpNix' },
        html_tag: 'h1',
        chakraProps: {
          as: 'h1',
          fontSize: '4xl',
          fontWeight: 'bold',
          mb: 4,
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: leftColumnId,
    },
    {
      dnd_id: subheadingId,
      index: 1,
      element_data: {
        element_id: subheadingId,
        parent_element_id: leftColumnId,
        index: 1,
        slug: 'hero-subheading',
        name: 'Subheading',
        description: 'Hero Section Subheading',
        attributes: {
          innerText: 'The best platform for building a chat bot tailored to the needs of your customers',
        },
        html_tag: 'h2',
        chakraProps: {
          as: 'h2',
          fontSize: 'lg',
          mb: 4,
          opacity: '0.7'
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: leftColumnId,
    },
    {
      dnd_id: buttonId,
      index: 2,
      element_data: {
        element_id: buttonId,
        parent_element_id: leftColumnId,
        index: 2,
        slug: 'hero-button',
        name: 'Button',
        description: 'Hero Section Button',
        attributes: { innerText: 'Get Started' },
        html_tag: 'button',
        chakraProps: {
          as: 'button',
          bg: 'white',
          color: 'purple.600',
          py: 4,
          px: '40px',
          borderRadius: 'md',
          mt: 4,
          alignSelf: 'start',
          fontWeight: 'bold',
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: leftColumnId,
    },
    {
      dnd_id: imageId,
      index: 0,
      element_data: {
        element_id: imageId,
        parent_element_id: rightColumnId,
        index: 0,
        slug: 'hero-image',
        name: 'Image',
        description: 'Hero Section Image of the product',
        attributes: {
          src: 'https://clockify.me/help/wp-content/uploads/2021/11/pumble-team-chat-screenshot-1.png',
        },
        html_tag: 'img',
        chakraProps: {
          as: 'img',
          maxH: '100%',
          maxW: '100%',
          rounded: 'lg',
          zIndex: 50
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: rightColumnId,
    },
    {
      dnd_id: imageId + Date.now(),
      index: 4,
      element_data: {
        element_id: imageId + Date.now(),
        parent_element_id: sectionId,
        index: 4,
        slug: 'hero-image',
        name: 'Image',
        description: 'Hero Section  blob image behind the product image',
        attributes: {
          src: 'https://png.pngtree.com/png-clipart/20230131/ourmid/pngtree-purple-blob-element-png-image_6579443.png',
        },
        html_tag: 'img',
        chakraProps: {
          as: 'img',
          left: '10px',
          minW: {
            base: "29rem",
            lg: "50rem"
          },
          position: 'absolute'
        },
        style: {},
      },
      children_dnd_element_data: [],
      parent_dnd_id: rightColumnId,
    },

  ]
}
