import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import useElementProperty from '../../hooks/element-property.hooks'
import { debounce } from '../../builder.utils'
import UOMInput from '@/components/builder/inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'
import { DEBOUNCE_TIME } from '@/components/builder/builder.constants'

export default function ElementMarginProperty() {
  const {
    propertyValue,
    updatePropertyValue,
    removePropertyValue,
    varReferenceValue,
    isCorners,
  } = useElementProperty('margin')

  const debouncedUpdateMarginValue = debounce((value: string) => {
    updatePropertyValue(value)
  }, DEBOUNCE_TIME.short)

  const handleMarginChange = (e: string | number) => {
    let value = `${e}`
    debouncedUpdateMarginValue(value)
  }

  return (
    <>
      <EachPropertyLayout
        label={'Margin'}
        layout={isCorners ? 'column' : 'row'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('20px')}
        onRemoveValue={removePropertyValue}
        onAddCorners={() =>
          updatePropertyValue(
            isCorners ? propertyValue.split(' ')[0] : `${propertyValue} ${propertyValue} ${propertyValue} ${propertyValue}`,
          )
        }
      >
        <UOMInput
          leftContent={['T', 'R', 'B', 'L']}
          isCorners={isCorners}
          onChange={handleMarginChange}
          value={propertyValue}
          allowed_values={[VariableValueType.UOM]}
          ref_value={varReferenceValue}
        />
      </EachPropertyLayout>
    </>
  )
}
