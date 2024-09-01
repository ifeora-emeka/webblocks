import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function FontWeightProperty() {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('fontWeight')

  return (
    <>
      <EachPropertyLayout
        label={'Weight'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('400')}
      >
        <Select
          value={propertyValue}
          onValueChange={(value) => updatePropertyValue(value)}
        >
          <SelectTrigger className={'border-border'}>
            <SelectValue placeholder={propertyValue} />
          </SelectTrigger>
          <SelectContent className={'dark'} defaultValue={propertyValue}>
            <SelectItem value="100">Thin (100)</SelectItem>
            <SelectItem value="200">Extra Light (200)</SelectItem>
            <SelectItem value="300">Light (300)</SelectItem>
            <SelectItem value="400">Normal (400)</SelectItem>
            <SelectItem value="500">Medium (500)</SelectItem>
            <SelectItem value="600">Semi Bold (600)</SelectItem>
            <SelectItem value="700">Bold (700)</SelectItem>
            <SelectItem value="800">Extra Bold (800)</SelectItem>
            <SelectItem value="900">Black (900)</SelectItem>
          </SelectContent>
        </Select>
      </EachPropertyLayout>
    </>
  )
}
