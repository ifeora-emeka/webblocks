import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { debounce } from '@/components/builder/builder.utils'

export default function LayoutGapProperty() {
  const [gap, setGapState] = useState<number>(0)
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('gap')

  const debouncedUpdatePropertyValue = debounce((value: number) => {
    updatePropertyValue(value.toString() + 'px')
  }, 600)

  const debouncedSetGap = debounce((value: number) => {
    setGapState(value)
  }, 10)

  // useEffect(() => {
  //   if (propertyValue) {
  //     setGapState(parseInt(propertyValue));
  //   }
  // }, [propertyValue]);

  const handleGapChange = (value: number) => {
    debouncedSetGap(value)
    debouncedUpdatePropertyValue(value)
  }

  return (
    <EachPropertyLayout
      label={'Gap'}
      isEmpty={!propertyValue}
      onAddValue={() => updatePropertyValue(gap.toString())}
    >
      <div className={'flex items-center gap-default_spacing'}>
        <Input
          className={'w-[50%] border-accent bg-background'}
          type="number"
          placeholder="Gap"
          value={gap}
          onChange={(e) => handleGapChange(Number(e.target.value))}
        />
      </div>
    </EachPropertyLayout>
  )
}
