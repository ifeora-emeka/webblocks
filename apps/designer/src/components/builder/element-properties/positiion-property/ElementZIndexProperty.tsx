import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import React from 'react'
import { Input } from '@/components/ui/input'

export default function ElementZIndexProperty() {
  const { propertyValue, updatePropertyValue } = useElementProperty('zIndex')

  return (
    <>
      <EachPropertyLayout
        label={'Z Index'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('0')}
        // onRemoveValue={removePropertyValue}
      >
        <div className={'flex items-center gap-default_spacing justify-end'}>
          <Input type={'number'} onChange={(val) => updatePropertyValue(String(parseInt(`${val.target.value}`)))} value={parseInt(propertyValue)} />
        </div>
      </EachPropertyLayout>
    </>
  )
}
