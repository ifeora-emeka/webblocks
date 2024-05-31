'use client'
import React, { useState } from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import EachOutline from './EachOutline'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { compileAllDndElements } from '../../builder.utils'
import { DndElementData } from '@repo/designer/types/designer.types'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'

type Props = {} & WithRendererProps

function BuilderOutlineOptions({ rendererState }: Props) {
  const { allElements } = rendererState
  const compiledElement = compileAllDndElements(allElements)
  const [keyword, setKeyword] = useState('')

  const filterElements = (
    element: DndElementData,
    keyword: string,
  ): boolean => {
    if (
      element.element_data.name.toLowerCase().includes(keyword.toLowerCase()) ||
      element.element_data.slug.toLowerCase().includes(keyword.toLowerCase()) ||
      (element.element_data.description &&
        element.element_data.description
          .toLowerCase()
          .includes(keyword.toLowerCase()))
    ) {
      return true
    }

    if (element.children_dnd_element_data) {
      return element.children_dnd_element_data.some((child) =>
        filterElements(child, keyword),
      )
    }

    return false
  }

  const renderOutline = (element: DndElementData) => {
    if (!element.children_dnd_element_data) return null

    return (
      <EachOutline key={element.dnd_id} element={element}>
        {
          element.children_dnd_element_data.length > 0 ?
        <>
          {element.children_dnd_element_data.map((child) =>
            renderOutline(child),
          )}
        </>: null
        }
      </EachOutline>
    )
  }

  const renderFilteredOutline = (element: DndElementData) => {
    if (!filterElements(element, keyword)) return null

    return (
      <EachOutline key={element.dnd_id} element={element}>
        <>
          {/*@ts-ignore*/}
          {element.children_dnd_element_data
            .filter((child) => filterElements(child, keyword))
            .map((child) => renderFilteredOutline(child))}
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
