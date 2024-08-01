import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import { Input } from '@/components/ui/input'
import useElementProperty from '../../hooks/element-property.hooks'
import { debounce } from '../../builder.utils'
import UOMInput from '@/components/builder/inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'
import { DEBOUNCE_TIME } from '@/components/builder/builder.constants'
import { useBuilderVariables } from '@/context/builder-variables.context'

export default function ElementPaddingProperty() {
  const { getVariableByID, parseVariableRef } = useBuilderVariables()
  const {
    propertyValue: paddingValue,
    updatePropertyValue: updatePaddingValue,
    removePropertyValue: removePaddingValue,
  } = useElementProperty('padding')

  let variableValue = ''

  const debouncedUpdatePaddingValue = debounce((value: string) => {
    updatePaddingValue(value)
  }, DEBOUNCE_TIME.short)

  const handlePaddingChange = (e: string | number) => {
    let value = `${e}`
    debouncedUpdatePaddingValue(value)
  }

  if (paddingValue.includes('ref')) {
    let val = parseVariableRef(paddingValue)
    console.log('VAL ::', String(getVariableByID(val.ref_id)?.value))
    variableValue = String(getVariableByID(val.ref_id)?.value || '')
  }

  return (
    <>
      <EachPropertyLayout
        label={'Padding'}
        isEmpty={!paddingValue}
        onAddValue={() => updatePaddingValue('20px')}
        onRemoveValue={removePaddingValue}
      >
        <UOMInput
          onChange={handlePaddingChange}
          value={paddingValue}
          allowed_values={[VariableValueType.UOM]}
          ref_value={variableValue}
        />
        {/*<Input*/}
        {/*  className="w-[50px] focus:bg-background active:bg-background hover:bg-background border-0 text-center"*/}
        {/*  value={paddingValue ? parseInt(paddingValue || '0') : ''}*/}
        {/*  onChange={handlePaddingChange}*/}
        {/*/>*/}
      </EachPropertyLayout>
    </>
  )
}
