import { Input } from '@/components/ui/input'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { debounce } from '@/components/builder/builder.utils'

export default function ElementMarginPaddingProperty() {
  const {
    propertyValue: marginValue,
    updatePropertyValue: updateMarginValue,
    removePropertyValue: removeMarginValue,
  } = useElementProperty('margin')

  const {
    propertyValue: paddingValue,
    updatePropertyValue: updatePaddingValue,
    removePropertyValue: removePaddingValue,
  } = useElementProperty('padding')

  const debouncedUpdateMarginValue = debounce((value: string) => {
    updateMarginValue(value)
  }, 30)

  const debouncedUpdatePaddingValue = debounce((value: string) => {
    updatePaddingValue(value)
  }, 30)

  const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    debouncedUpdatePaddingValue(value + 'px')
  }

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    debouncedUpdateMarginValue(value + 'px')
  }

  return (
    <>
      <EachPropertyLayout
        label={'Padding'}
        isEmpty={!paddingValue}
        onAddValue={() => updatePaddingValue('20px')}
        onRemoveValue={removePaddingValue}
      >
        <Input
          className="w-[50px]"
          value={paddingValue ? parseInt(paddingValue) : ''}
          onChange={handlePaddingChange}
        />
      </EachPropertyLayout>
      <EachPropertyLayout
        label={'Margin'}
        isEmpty={!marginValue}
        onAddValue={() => updateMarginValue('20px')}
        onRemoveValue={removeMarginValue}
      >
        <Input
          className="w-[50px]"
          value={marginValue ? parseInt(marginValue) : ''}
          onChange={handleMarginChange}
        />
      </EachPropertyLayout>
    </>
  )
}
