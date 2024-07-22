import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export default function ElementSizeProperty() {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('background')

  return (
    <>
      <EachPropertyLayout label={'Width'} isEmpty={false} onAddValue={() => {}}>
        <Input className="w-[50px]" />
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className={'dark'}>
            <SelectItem value="light">Fill</SelectItem>
            <SelectItem value="dark">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </EachPropertyLayout>
      <EachPropertyLayout
        label={'Height'}
        isEmpty={false}
        onAddValue={() => {}}
      >
        <Input className="w-[50px]" />
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className={'dark'}>
            <SelectItem value="light">Fill</SelectItem>
            <SelectItem value="dark">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </EachPropertyLayout>
    </>
  )
}
