'use client'
import React, { useState } from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import EachOutline from './EachOutline'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { compileAllDndElements } from '../../builder.utils'
import { ElementData } from '@repo/designer/types/designer.types'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'
import { useRenderer } from '@/components/builder/context/renderer.context'


function BuilderOutlineOptions() {
  const { state: {allElements}} = useRenderer();
  const compiledElement = compileAllDndElements(allElements)
  const [keyword, setKeyword] = useState('')

  const filterElements = (element: ElementData, keyword: string): boolean => {
    if (
      element.name.toLowerCase().includes(keyword.toLowerCase()) ||
      element.slug.toLowerCase().includes(keyword.toLowerCase()) ||
      (element.description &&
        element.description.toLowerCase().includes(keyword.toLowerCase()))
    ) {
      return true
    }

    if (element.children_elements) {
      return element.children_elements.some((child: ElementData) =>
        filterElements(child, keyword),
      )
    }

    return false
  }

  const renderOutline = (element: ElementData) => {
    if (!element.children_elements) return null

    return (
      <EachOutline key={element.id} element={element}>
        {element.children_elements.length > 0 ? (
          <>
            {element.children_elements.map((child: ElementData) =>
              renderOutline(child),
            )}
          </>
        ) : null}
      </EachOutline>
    )
  }

  const renderFilteredOutline = (element: ElementData) => {
    if (!filterElements(element, keyword)) return null

    return (
      <EachOutline key={element.id} element={element}>
        <>
          {/*@ts-ignore*/}
          {element.children_dnd_element_data
            .filter((child: ElementData) => filterElements(child, keyword))
            .map((child: ElementData) => renderFilteredOutline(child))}
        </>
      </EachOutline>
    )
  }

  return (
    <>
      <BuilderLeftPanelContainer
        heading="Outline"
        actions={null}
        onSearch={setKeyword}
      >
        <div className="flex flex-col gap-default_spacing p-default_spacing">
          {keyword
            ? renderFilteredOutline(compiledElement)
            : renderOutline(compiledElement)}
        </div>
      </BuilderLeftPanelContainer>
    </>
  )
}

export default withRenderer(BuilderOutlineOptions)
