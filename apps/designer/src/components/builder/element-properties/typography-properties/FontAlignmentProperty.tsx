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
  const { propertyValue: flexFlowValue, updatePropertyValue } =
    useElementProperty('textAlign')

  return (
    <>
      <EachPropertyLayout
        label={'Align'}
        isEmpty={!flexFlowValue}
        onAddValue={() => updatePropertyValue('start')}
      >
        <div
          className={
            'flex gap-default_spacing bg-background p-1 rounded-lg w-full'
          }
        >
          <EachPropertyButton
            toolTip="Left"
            isActive={flexFlowValue === 'start'}
            onClick={() => updatePropertyValue('start')}
          >
            <TbAlignLeft size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip="Center"
            isActive={flexFlowValue === 'center'}
            onClick={() => updatePropertyValue('center')}
          >
            <TbAlignCenter size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip="Right"
            isActive={flexFlowValue === 'end'}
            onClick={() => updatePropertyValue('end')}
          >
            <TbAlignRight size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip="Justify"
            isActive={flexFlowValue === 'justify'}
            onClick={() => updatePropertyValue('justify')}
          >
            <TbAlignJustified size={18} />
          </EachPropertyButton>
        </div>
      </EachPropertyLayout>
    </>
  )
}
