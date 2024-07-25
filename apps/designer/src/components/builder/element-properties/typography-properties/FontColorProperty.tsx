import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import DefaultFillInput from '@/components/DefaultFillInput'
import useElementProperty from '../../hooks/element-property.hooks'

export default function FontColorProperty() {
  const { propertyValue, updatePropertyValue } = useElementProperty('color')

  return (
    <>
      <EachPropertyLayout
        label={'Color'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('#0000')}
      >
        <DefaultFillInput
          value={propertyValue || ''}
          onChange={(e) => updatePropertyValue(e)}
        />
      </EachPropertyLayout>
    </>
  )
}
