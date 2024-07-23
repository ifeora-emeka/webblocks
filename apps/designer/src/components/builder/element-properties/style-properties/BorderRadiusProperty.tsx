import { Input } from '@/components/ui/input'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'

export default function BorderRadiusProperty() {
  const { propertyValue, updatePropertyValue, removePropertyValue } =
    useElementProperty('borderRadius')

  return (
    <>
      <EachPropertyLayout
        label={'Radius'}
        isEmpty={!propertyValue}
        onAddValue={() => updatePropertyValue('6px')}
        onRemoveValue={removePropertyValue}
      >
        <div className={'flex items-center gap-default_spacing'}>
          <Input
            className={
              'w-[50%] border-accent hover:bg-background active:bg-background'
            }
            type="number"
            placeholder="Radius"
            value={parseInt(propertyValue.trim() || '0')}
            onChange={(e) =>
              updatePropertyValue(
                e.target.value ? e.target.value + 'px' : '0px',
              )
            }
          />
        </div>
      </EachPropertyLayout>
    </>
  )
}
