import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout'
import { Input } from '@/components/ui/input'

export default function FontSizeProperty() {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('fontSize')

  return (
    <>
      <EachPropertyLayout
        label={'Font size'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('20px')}
      >
        <Input
          className="w-[55px] hover:bg-background focus:bg-background active:bg-background border-0"
          type={'number'}
          value={parseInt(propertyValue || '0')}
          onChange={(e) =>
            updatePropertyValue(String(parseInt(e.target.value)) + 'px')
          }
        />
      </EachPropertyLayout>
    </>
  )
}
