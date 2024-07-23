import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import { debounce } from '../../builder.utils'
import EachPropertyLayout from '../EachPropertyLayout'
import { Input } from '@/components/ui/input'

export default function ElementMarginProperty() {
  const {
    propertyValue: marginValue,
    updatePropertyValue: updateMarginValue,
    removePropertyValue: removeMarginValue,
  } = useElementProperty('margin')

  const debouncedUpdateMarginValue = debounce((value: string) => {
    updateMarginValue(value)
  }, 30)

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    debouncedUpdateMarginValue(value + 'px')
  }

  return (
    <>
      <EachPropertyLayout
        label={'Margin'}
        isEmpty={!marginValue}
        onAddValue={() => updateMarginValue('20px')}
        onRemoveValue={removeMarginValue}
      >
        <Input
          className="w-[50px] focus:bg-background active:bg-background hover:bg-background border-0 text-center"
          value={marginValue ? parseInt(marginValue || '0') : ''}
          onChange={handleMarginChange}
        />
      </EachPropertyLayout>
    </>
  )
}
