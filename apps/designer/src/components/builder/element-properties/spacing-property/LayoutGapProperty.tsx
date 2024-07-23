import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { Input } from '@/components/ui/input'
import { debounce } from '@/components/builder/builder.utils'

export default function LayoutGapProperty() {
  const { propertyValue, updatePropertyValue } =
    useElementProperty('gap')

  const debouncedUpdatePropertyValue = debounce((value: number) => {
    updatePropertyValue(parseInt(String(value)) + 'px')
  }, 30)

  const debouncedSetGap = debounce((value: number) => {
    debouncedUpdatePropertyValue(parseInt(String(value)) + 'px')
  }, 30)

  return (
    <EachPropertyLayout
      label={'Gap'}
      isEmpty={!propertyValue}
      onAddValue={() => {}}
    >
      <div className={'flex items-center gap-default_spacing'}>
        <Input
          className={'w-[50%] border-accent bg-background'}
          type="number"
          placeholder="Gap"
          value={parseInt(propertyValue)}
          onChange={(e) => debouncedSetGap(Number(e.target.value))}
        />
      </div>
    </EachPropertyLayout>
  )
}
