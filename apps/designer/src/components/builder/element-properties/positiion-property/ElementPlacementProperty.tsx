import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { VariableValueType } from '@repo/designer/types/variables.types'
import UOMInput from '@/components/builder/inputs/UOMInput'
import React, { useEffect } from 'react'

export default function ElementPlacementProperty() {
  const { propertyValue: position } = useElementProperty('position')
  const { propertyValue, updatePropertyValue, isCorners, varReferenceValue } =
    useElementProperty('inset')

  useEffect(() => {
    if (position !== 'relative' && !propertyValue) {
      updatePropertyValue('0px 0px 0px 0px')
    }
  }, [position, propertyValue])

  if (position === 'relative') {
    return null
  }

  return (
    <>
      <EachPropertyLayout
        label={''}
        layout={'column'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('0px 0px 0px 0px')}
        onAddCorners={() =>
          updatePropertyValue(
            isCorners
              ? propertyValue.split(' ')[0]
              : `${propertyValue} ${propertyValue} ${propertyValue} ${propertyValue}`,
          )
        }
        // onRemoveValue={removePropertyValue}
      >
        <UOMInput
          leftContent={['T', 'R', 'B', 'L']}
          isCorners={isCorners}
          onChange={(e) => updatePropertyValue(`${e}`)}
          value={propertyValue}
          allowed_values={[VariableValueType.UOM]}
          ref_value={varReferenceValue}
        />
      </EachPropertyLayout>
    </>
  )
}
