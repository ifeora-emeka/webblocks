import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import useElementProperty from '../../hooks/element-property.hooks'
import UOMInput from '@/components/builder/inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'

export default function HeightProperty() {
  const {
    propertyValue: heightValue,
    updatePropertyValue: updateHeightValue,
    removePropertyValue: removeHeightValue,
    isCorners,
    varReferenceValue,
  } = useElementProperty('height')

  const updateUnitOfMeasurement = (value: string) => {
    updateHeightValue(value)
  }

  return (
    <>
      <EachPropertyLayout
        label={'Height'}
        isEmpty={!heightValue}
        onAddValue={() => updateHeightValue('20px')}
        onRemoveValue={removeHeightValue}
      >
        <div className={'flex items-center gap-default_spacing justify-end'}>
          <UOMInput
            isCorners={isCorners}
            onChange={(val) => updateUnitOfMeasurement(`${val}`)}
            value={heightValue}
            allowed_values={[VariableValueType.UOM]}
            ref_value={varReferenceValue}
          />
        </div>
      </EachPropertyLayout>
    </>
  )
}
