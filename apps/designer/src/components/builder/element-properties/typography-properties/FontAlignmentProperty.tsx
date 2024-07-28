import React from 'react'
import EachPropertyButton from '../EachPropertyButton'
import useElementProperty from '../../hooks/element-property.hooks'
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
} from 'react-icons/tb'
import EachPropertyLayout from '../EachPropertyLayout'

export default function FontAlignmentProperty() {
  const { propertyValue: flexFlowValue, updatePropertyValue: updateFlexFlow } =
    useElementProperty('textAlign')

  return (
    <>
      <EachPropertyLayout
        label={'Align'}
        isEmpty={!flexFlowValue}
        onAddValue={() => {}}
      >
        <div
          className={
            'flex gap-default_spacing bg-background p-1 rounded-lg w-full'
          }
        >
          <EachPropertyButton
            toolTip="Left"
            isActive={flexFlowValue === 'start'}
            onClick={() => updateFlexFlow('start')}
          >
            <TbAlignLeft size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip="Center"
            isActive={flexFlowValue === 'center'}
            onClick={() => updateFlexFlow('center')}
          >
            <TbAlignCenter size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip="Right"
            isActive={flexFlowValue === 'end'}
            onClick={() => updateFlexFlow('end')}
          >
            <TbAlignRight size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip="Justify"
            isActive={flexFlowValue === 'justify'}
            onClick={() => updateFlexFlow('justify')}
          >
            <TbAlignJustified size={18} />
          </EachPropertyButton>
        </div>
      </EachPropertyLayout>
    </>
  )
}
