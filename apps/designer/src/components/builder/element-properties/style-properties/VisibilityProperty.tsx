import EachPropertyButton from '@/components/builder/element-properties/EachPropertyButton'
import { TbAlignLeft } from 'react-icons/tb'
import React from 'react'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'

export default function VisibilityProperty() {
  const { propertyValue: flexFlowValue, updatePropertyValue } =
    useElementProperty('visibility')

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
        </div>
      </EachPropertyLayout>
    </>
  )
}
