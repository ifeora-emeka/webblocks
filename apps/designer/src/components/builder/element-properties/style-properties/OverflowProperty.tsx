import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function OverflowProperty() {
  const { propertyValue, updatePropertyValue } = useElementProperty('overflow')

  return (
    <>
      <EachPropertyLayout
        label={'Overflow'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('hidden')}
      >
        <Select
          onValueChange={(value) => updatePropertyValue(value)}
          value={propertyValue}
        >
          <SelectTrigger className="hover:bg-background focus:bg-background">
            <SelectValue defaultValue={propertyValue} />
          </SelectTrigger>
          <SelectContent className="dark hover:bg-background">
            <SelectItem value="hidden">Hidden</SelectItem>
            <SelectItem value="visible">Visible</SelectItem>
            <SelectItem value="scroll">Scroll</SelectItem>
          </SelectContent>
        </Select>
      </EachPropertyLayout>
    </>
  )
}
