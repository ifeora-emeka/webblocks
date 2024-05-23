import React from 'react'
import { DesignerPageData } from '@repo/designer/types/designer.types'
import ElementRenderer from '@/components/builder/renderer/element-render/ElementRenderer'
import { HomePage } from '@/app/mock-data'

// Define a component to render individual elements

// Define a component to render the entire page
const HomePageRenderer: React.FC<{ pageData: DesignerPageData }> = ({ pageData }) => {
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
