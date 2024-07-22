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
  const {
    propertyValue: widthValue,
    updatePropertyValue: updateWidthValue,
    removePropertyValue: removeWidthValue,
  } = useElementProperty('width')
  const {
    propertyValue: heightValue,
    updatePropertyValue: updateHeightValue,
    removePropertyValue: removeHeightValue,
  } = useElementProperty('height')

  return (
    <>
      <EachPropertyLayout
        label={'Width'}
        isEmpty={!widthValue}
        onAddValue={() => {}}
      >
        <Input
          className="w-[50px]"
          type={'number'}
          value={parseInt(widthValue || '0')}
          onChange={(e) =>
            updateWidthValue(String(parseInt(e.target.value)) + 'px')
          }
        />
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
        isEmpty={!heightValue}
        onAddValue={() => updateWidthValue('')}
      >
        <Input
          className="w-[50px]"
          type={'number'}
          value={parseInt(heightValue || '0')}
          onChange={(e) =>
            updateHeightValue(String(parseInt(e.target.value)) + 'px')
          }
        />
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
