import { DesignerElementData } from '@repo/designer/types/designer.types'

export const HomePage: DesignerElementData = {
  _id: 'root',
  element_id: 'root',
  name: 'Section Element',
  slug: 'section-element',
  html_tag: 'section',
  tailwindStyle: {},
  attributes: {
    class: 'bg-white dark:bg-gray-900',
  },
  children: [
    {
      _id: 'child1',
      element_id: 'child1',
      name: 'Grid Container',
      slug: 'grid-container',
      html_tag: 'div',
      tailwindStyle: {},
      attributes: {
        class:
          'grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28',
      },
      children: [
        {
          _id: 'child2',
          element_id: 'child2',
          name: 'Content Container',
          slug: 'content-container',
          html_tag: 'div',
          tailwindStyle: {},
          attributes: {
            class: 'mr-auto place-self-center lg:col-span-7',
          },
          children: [
            {
              _id: 'child3',
              element_id: 'child3',
              name: 'Heading',
              slug: 'heading',
              html_tag: 'h1',
              tailwindStyle: {},
              attributes: {
                class:
                  'max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white',
              },
              children: [
                'Building digital ',
                {
                  _id: 'child4',
                  element_id: 'child4',
                  name: 'Line Break',
                  slug: 'line-break',
                  html_tag: 'div',
                  tailwindStyle: {},
                  attributes: {},
                  children: [],
                },
                'products & brands.',
              ],
            },
            {
              _id: 'child5',
              element_id: 'child5',
              name: 'Paragraph',
              slug: 'paragraph',
              html_tag: 'p',
              tailwindStyle: {},
              attributes: {
                class:
                  'max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400',
              },
              children: [
                'This free and open-source landing page template was built using the utility classes from ',
                {
                  _id: 'child6',
                  element_id: 'child6',
                  name: 'Link',
                  slug: 'link',
                  html_tag: 'a',
                  tailwindStyle: {},
                  attributes: {
                    href: 'https://tailwindcss.com',
                    class: 'hover:underline',
                  },
                  children: ['Tailwind CSS'],
                },
                ' and based on the components from the ',
                {
                  _id: 'child7',
                  element_id: 'child7',
                  name: 'Link',
                  slug: 'link',
                  html_tag: 'a',
                  tailwindStyle: {},
                  attributes: {
                    href: 'https://flowbite.com/docs/getting-started/introduction/',
                    class: 'hover:underline',
                  },
                  children: ['Flowbite Library'],
                },
                ' and the ',
                {
                  _id: 'child8',
                  element_id: 'child8',
                  name: 'Link',
                  slug: 'link',
                  html_tag: 'a',
                  tailwindStyle: {},
                  attributes: {
                    href: 'https://flowbite.com/blocks/',
                    class: 'hover:underline',
                  },
                  children: ['Blocks System'],
                },
                '.',
              ],
            },
          ],
        },
        {
          _id: 'child9',
          element_id: 'child9',
          name: 'Image Container',
          slug: 'image-container',
          html_tag: 'div',
          tailwindStyle: {},
          attributes: {
            class: 'hidden lg:mt-0 lg:col-span-5 lg:flex',
          },
          children: [
            {
              _id: 'child10',
              element_id: 'child10',
              name: 'Background Image',
              slug: 'background-image',
              html_tag: 'div',
              tailwindStyle: {},
              style: {
                backgroundImage:
                  'url(https://demo.themesberg.com/landwind/images/hero.png)',
              },
              attributes: {
                class:
                  'min-h-[200px] min-w-[200px] bg-no-repeat bg-center bg-cover',
              },
              children: [],
            },
          ],
        },
      ],
    },
  ],
}

export default HomePage
