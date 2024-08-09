import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function ElementPositionProperty(){
  const {
    propertyValue,
    updatePropertyValue,
  } = useElementProperty('position')

  return <>
    <EachPropertyLayout
      label={'Position'}
      isEmpty={!propertyValue}
      onAddValue={() => updatePropertyValue('relative')}
      // onRemoveValue={removePropertyValue}
    >
      <div className={'flex items-center gap-default_spacing justify-end'}>
        <Select onValueChange={e => updatePropertyValue(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Relative" />
          </SelectTrigger>
          <SelectContent className={'dark'}>
            <SelectItem value="relative">Relative</SelectItem>
            <SelectItem value="absolute">Absolute</SelectItem>
            <SelectItem value="sticky">Sticky</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
            <SelectItem value="static">Static</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </EachPropertyLayout>
  </>
}
