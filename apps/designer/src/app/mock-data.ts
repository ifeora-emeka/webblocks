import { DesignerElementDataDTO, DndElementData } from '@repo/designer/types/designer.types';
import { generateRandomId } from '@/lib/utils';

const defaultElementData: DesignerElementDataDTO = {
  element_id: '',
  parent_element_id: null,
  slug: 'jumbo',
  name: "Jumbotron",
  description: '',
  attributes: {},
  html_tag: 'div',
  chakraProps: {},
  style: {},
};

export const HeroSection = (): DndElementData => {
  const sectionId = generateRandomId(15);
  const leftColumnId = generateRandomId(15);
  const rightColumnId = generateRandomId(15);
  const headingId = generateRandomId(15);
  const subheadingId = generateRandomId(15);
  const buttonId = generateRandomId(15);
  const imageId = generateRandomId(15);

  return {
    dnd_id: sectionId,
    element_data: {
      ...defaultElementData,
      element_id: sectionId,
      parent_element_id: null,
      chakraProps: {
        minH: '400px',
        bg: '#210143',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 4,
        py: '150px',
        px: '100px'
      },
      html_tag: 'section',
    },
    children_dnd_element_data: [
      {
        dnd_id: leftColumnId,
        element_data: {
          ...defaultElementData,
          element_id: leftColumnId,
          parent_element_id: sectionId,
          chakraProps: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
          },
          html_tag: 'div',
          name: 'Left Column',
          slug: 'left-column',
        },
        children_dnd_element_data: [
          {
            dnd_id: headingId,
            element_data: {
              ...defaultElementData,
              element_id: headingId,
              parent_element_id: leftColumnId,
              chakraProps: {
                as: 'h1',
                fontSize: '4xl',
                fontWeight: 'bold',
                mb: 4,
              },
              html_tag: 'h1',
              name: 'Heading',
              slug: 'hero-heading',
              description: 'Hero Section Heading',
              attributes: { innerText: 'Welcome to Our Website' },
            },
            children_dnd_element_data: [],
            parent_dnd_id: leftColumnId,
          },
          {
            dnd_id: subheadingId,
            element_data: {
              ...defaultElementData,
              element_id: subheadingId,
              parent_element_id: leftColumnId,
              chakraProps: {
                as: 'h2',
                fontSize: '2xl',
                mb: 4,
              },
              html_tag: 'h2',
              name: 'Subheading',
              slug: 'hero-subheading',
              description: 'Hero Section Subheading',
              attributes: { innerText: 'We provide the best solutions for your business' },
            },
            children_dnd_element_data: [],
            parent_dnd_id: leftColumnId,
          },
          {
            dnd_id: buttonId,
            element_data: {
              ...defaultElementData,
              element_id: buttonId,
              parent_element_id: leftColumnId,
              chakraProps: {
                as: 'button',
                bg: 'white',
                color: 'purple.600',
                py: 4,
                px: "40px",
                borderRadius: 'md',
                mt: 4,
                alignSelf: 'start',
                fontWeight: 'bold'
              },
              html_tag: 'button',
              name: 'Button',
              slug: 'hero-button',
              description: 'Hero Section Button',
              attributes: { innerText: 'Learn More' },
            },
            children_dnd_element_data: [],
            parent_dnd_id: leftColumnId,
          },
        ],
        parent_dnd_id: sectionId,
      },
      {
        dnd_id: rightColumnId,
        element_data: {
          ...defaultElementData,
          element_id: rightColumnId,
          parent_element_id: sectionId,
          chakraProps: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          html_tag: 'div',
          name: 'Right Column',
          slug: 'right-column',
        },
        children_dnd_element_data: [
          {
            dnd_id: imageId,
            element_data: {
              ...defaultElementData,
              element_id: imageId,
              parent_element_id: rightColumnId,
              chakraProps: {
                as: 'img',
                maxH: '100%',
                maxW: '100%',
                rounded: 'lg'
              },
              html_tag: 'img',
              name: 'Image',
              slug: 'hero-image',
              description: 'Hero Section Image',
              attributes: { src: 'https://img.freepik.com/free-photo/front-view-woman-studio-with-smartphone_23-2148410773.jpg' },
            },
            children_dnd_element_data: [],
            parent_dnd_id: rightColumnId,
          },
        ],
        parent_dnd_id: sectionId,
      },
    ],
    parent_dnd_id: null,
  };
};
