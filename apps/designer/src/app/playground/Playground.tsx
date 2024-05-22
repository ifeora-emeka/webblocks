import React from 'react'
import { PageData } from '@/types/builder.types'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { HomePage } from '@/app/mock-data'

// Define a component to render individual elements

// Define a component to render the entire page
const HomePageRenderer: React.FC<{ pageData: PageData }> = ({ pageData }) => {
  const { elements } = pageData

  return (
    <>
      {elements.map((element) => (
        <ElementRenderer key={element.element_id} element={element} />
      ))}
    </>
  )
}

const App: React.FC = () => {
  return <HomePageRenderer pageData={HomePage} />
}

export default App
