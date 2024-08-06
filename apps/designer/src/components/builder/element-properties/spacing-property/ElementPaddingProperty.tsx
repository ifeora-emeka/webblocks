import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import useElementProperty from '../../hooks/element-property.hooks'
import { debounce } from '../../builder.utils'
import UOMInput from '@/components/builder/inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'
import { DEBOUNCE_TIME } from '@/components/builder/builder.constants'


export default function ElementPaddingProperty() {
  const {
    propertyValue: paddingValue,
    updatePropertyValue: updatePaddingValue,
    removePropertyValue: removePaddingValue,
    varReferenceValue,
    isCorners
  } = useElementProperty('padding');

  const debouncedUpdatePaddingValue = debounce((value: string) => {
    updatePaddingValue(value)
  }, DEBOUNCE_TIME.short)

  const handlePaddingChange = (e: string | number) => {
    let value = `${e}`
    debouncedUpdatePaddingValue(value)
  }

  return (
    <>
      <EachPropertyLayout
        label={'Padding'}
        isEmpty={!paddingValue}
        onAddValue={() => updatePaddingValue('20px')}
        onRemoveValue={removePaddingValue}
        onAddCorners={() => updatePaddingValue(`${paddingValue} ${paddingValue} ${paddingValue} ${paddingValue}`)}
      >
        <UOMInput
          isCorners={isCorners}
          onChange={handlePaddingChange}
          value={paddingValue}
          allowed_values={[VariableValueType.UOM]}
          ref_value={varReferenceValue}
        />
      </EachPropertyLayout>
    </>
  )
}
