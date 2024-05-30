'use client'
import React from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import EachOutline from './EachOutline'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { compileAllDndElements } from '../../builder.utils'
import { DndElementData } from '@repo/designer/types/designer.types'

type Props = {}

export default function BuilderOutlineOptions({}: Props) {
  const { allElements } = useSelector((state: AppStore) => state.renderer)
  const compiledElement = compileAllDndElements(allElements)

  const renderOutline = (element: DndElementData) => {
    if (!element.children_dnd_element_data) return null

    return (
      <EachOutline key={element.dnd_id} element={element}>
        <>
          {element.children_dnd_element_data.map((child) =>
            renderOutline(child),
          )}
        </>
      </EachOutline>
    )
  }

  return (
    <>
      <BuilderLeftPanelContainer heading="Outline" actions={null}>
        <div className="flex flex-col gap-default_spacing p-default_spacing">
          {renderOutline(compiledElement)}
        </div>
      </BuilderLeftPanelContainer>
    </>
  )
}
