import React from 'react'
import DefaultFillInput from '@/components/DefaultFillInput'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { debounce } from '@/components/builder/builder.utils'

const FillProperty = () => {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('background')

  // const updateUnitOfMeasurement = (value: string) => {
  //   updatePropertyValue(value)
  // }

  const updateUnitOfMeasurement = debounce((value: number) => {
    updatePropertyValue(String(value))
  }, 30)

  return (
    <EachPropertyLayout
      label={'Fill'}
      isEmpty={!propertyValue}
      onAddValue={() => updateUnitOfMeasurement('#ffffff')}
      // onRemoveValue={removePropertyValue}
      onRemoveValue={removePropertyValue}
    >
      <DefaultFillInput
        value={propertyValue || ''}
        onChange={(e) => updateUnitOfMeasurement(e)}
      />
    </EachPropertyLayout>
  )
}

export default FillProperty
