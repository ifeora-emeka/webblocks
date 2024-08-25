import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { Input } from '@/components/ui/input'
import { debounce } from '@/components/builder/builder.utils'
import UOMInput from '../../inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'

export default function LayoutGapProperty() {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
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
      onAddValue={() => updatePropertyValue('20px')}
      onRemoveValue={removePropertyValue}
    >
      <div className={'flex items-center gap-default_spacing justify-end'}>
        <UOMInput
          isCorners={false}
          onChange={val => updatePropertyValue(`${val}`)}
          value={propertyValue}
          allowed_values={[VariableValueType.UOM]}
          ref_value={''}
        />
      </div>
    </EachPropertyLayout>
  )
}
