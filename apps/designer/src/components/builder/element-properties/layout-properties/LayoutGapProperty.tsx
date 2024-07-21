import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { debounce } from '@/components/builder/builder.utils'

export default function LayoutGapProperty() {
  const [gap, setGap] = useState<number>(0)
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('gap')

  const debouncedUpdatePropertyValue = debounce((value: number) => {
    updatePropertyValue(value.toString() + 'px')
  }, 400)

  useEffect(() => {
    if (propertyValue) {
      setGap(parseInt(propertyValue))
    }
  }, [propertyValue])

  const handleGapChange = (value: number) => {
    setGap(value)
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
          className={'w-[40%]'}
          type="number"
          placeholder="Gap"
          value={gap}
          onChange={(e) => handleGapChange(Number(e.target.value))}
        />
        <Slider
          defaultValue={[gap]}
          max={100}
          step={1}
          onValueChange={(values) => handleGapChange(values[0])}
        />
      </div>
    </EachPropertyLayout>
  )
}
