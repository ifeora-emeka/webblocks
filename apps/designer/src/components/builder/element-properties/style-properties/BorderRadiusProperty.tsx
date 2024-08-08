import { Input } from '@/components/ui/input'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { VariableValueType } from '@repo/designer/types/variables.types'
import UOMInput from '@/components/builder/inputs/UOMInput'
import React from 'react'
import { debounce } from '@/components/builder/builder.utils'
import { DEBOUNCE_TIME } from '@/components/builder/builder.constants'

export default function BorderRadiusProperty() {
  const { propertyValue, updatePropertyValue, removePropertyValue, isCorners, varReferenceValue } =
    useElementProperty('borderRadius');

  const debouncedUpdatePaddingValue = debounce((value: string) => {
    updatePropertyValue(value)
  }, DEBOUNCE_TIME.short)

  return (
    <>
      <EachPropertyLayout
        label={'Radius'}
        isCorners={isCorners}
        layout={isCorners ? 'column' : 'row'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('6px')}
        onRemoveValue={removePropertyValue}
        onAddCorners={() =>
          updatePropertyValue(
            isCorners ? propertyValue.split(' ')[0] : `${propertyValue} ${propertyValue} ${propertyValue} ${propertyValue}`,
          )
        }
      >
        <div className={'flex items-center gap-default_spacing justify-end'}>
          <UOMInput
            isCorners={isCorners}
            onChange={debouncedUpdatePaddingValue}
            value={propertyValue}
            allowed_values={[VariableValueType.UOM]}
            ref_value={varReferenceValue}
          />
        </div>
      </EachPropertyLayout>
    </>
  )
}
