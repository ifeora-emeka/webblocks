import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { VariableValueType } from '@repo/designer/types/variables.types'
import UOMInput from '@/components/builder/inputs/UOMInput'
import React from 'react'

export default function ElementZIndexProperty(){
  const {
    propertyValue,
    updatePropertyValue,
  } = useElementProperty('zIndex');

  return <>
    <EachPropertyLayout
      label={'Z Index'}
      isEmpty={!propertyValue}
      onAddValue={() => updatePropertyValue('relative')}
      // onRemoveValue={removePropertyValue}
    >
      <div className={'flex items-center gap-default_spacing justify-end'}>
        <UOMInput
          onChange={val => updatePropertyValue(String(parseInt(`${val}`)))}
          value={propertyValue}
          allowed_values={[VariableValueType.UOM]}
          ref_value={''}
        />
      </div>
    </EachPropertyLayout>
  </>
}
