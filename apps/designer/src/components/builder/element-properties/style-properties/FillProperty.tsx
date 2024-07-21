import React from 'react'
import DefaultFillInput from '@/components/DefaultFillInput'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'

const FillProperty = () => {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('background')

  return (
    <EachPropertyLayout
      label={'Fill'}
      isEmpty={!propertyValue}
      onAddValue={() => updatePropertyValue('#ffffff')}
      onRemoveValue={removePropertyValue}
    >
      <DefaultFillInput
        value={propertyValue || ''}
        onChange={(e) => updatePropertyValue(e)}
      />
    </EachPropertyLayout>
  )
}

export default FillProperty
