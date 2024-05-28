import React from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import EachOutline from './EachOutline'

type Props = {}

export default function BuuilderOutlineOptions({}: Props) {
  return (
    <>
      <BuilderLeftPanelContainer heading="Outline" actions={null}>
        <div className='flex flex-col gap-default_spacing p-default_spacing'>
          <EachOutline element_children={[]} />
          <EachOutline element_children={[]} />
          <EachOutline element_children={[]} isActive />
          <div className='flex flex-col gap-default_spacing pl-[1rem]'>
            <EachOutline element_children={[]} />
            <EachOutline element_children={[]} />
            <EachOutline element_children={[]} />
          </div>
          <EachOutline element_children={[]} />
        </div>
      </BuilderLeftPanelContainer>
    </>
  )
}