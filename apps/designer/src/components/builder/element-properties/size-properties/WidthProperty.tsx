import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout'
import UOMInput from '@/components/builder/inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'

export default function WidthProperty() {
  const {
    propertyValue: widthValue,
    updatePropertyValue: updateWidthValue,
    removePropertyValue: removeWidthValue,
    isCorners,
    varReferenceValue,
  } = useElementProperty('width')

  const updateUnitOfMeasurement = (value: string) => {
    updateWidthValue(value)
  }

  return (
    <>
      <EachPropertyLayout
        label={'Width'}
        isEmpty={!widthValue}
        onAddValue={() => updateWidthValue('100%')}
        onRemoveValue={removeWidthValue}
      >
        <div className={'flex items-center gap-default_spacing justify-end'}>
          <UOMInput
            isCorners={isCorners}
            onChange={(val) => updateUnitOfMeasurement(`${val}`)}
            value={widthValue}
            allowed_values={[VariableValueType.UOM]}
            ref_value={varReferenceValue}
          />
        </div>
      </EachPropertyLayout>
    </>
  )
}
