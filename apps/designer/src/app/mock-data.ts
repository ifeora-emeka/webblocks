import { DesignerPageData } from '@repo/designer/types/designer.types'

let defaultChildrenValues = () => ({
  element_id: Date.now().toString(),
  index: 3,
  name: 'Nav bar',
  slug: 'nav-bar',
  style: {},
  attributes: {},
  tailwindStyle: {},
  type: 'div',
})

export const HomePage: DesignerPageData = {
  element_id: Date.now().toString(),
  name: 'Home',
  slug: 'home-page',
  meta_tags: {
    description: 'Welcome to our website',
    title: "Emmy's consulting",
  },
  body: {
    // attributes: {
    //   className: 'bg-white p-3'
    // }
  },
  elements: [
    {
      ...defaultChildrenValues(),
      type: 'div',
      slug: 'hero',
      attributes: {
        className:
          'min-h-[50vh] bg-gradient-to-r from-purple-500 to-purple-900 text-white flex justify-center items-center',
      },
      children: [
        {
          ...defaultChildrenValues(),
          type: 'div',
          attributes: {
            className: 'flex flex-col gap-10',
          },
          children: [
            {
              ...defaultChildrenValues(),
              type: 'h1',
              attributes: {
                className: 'text-5xl font-bold text-white',
              },
              children: ['Beat website builder in the world'],
            },
            {
              ...defaultChildrenValues(),
              type: 'div',
              attributes: { className: 'text-center h-auto' },
              children: [
                {
                  ...defaultChildrenValues(),
                  type: 'a',
                  attributes: {
                    href: '/projects/1234',
                    className:
                      'px-10 py-3 rounded-md bg-blue-400 text-white hover:bg-blue-600',
                  },
                  children: ['Get Started'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
