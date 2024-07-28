import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import EachPropertyButton from '@/components/builder/element-properties/EachPropertyButton'

export default function LayoutDisplayProperty() {
  const {
    propertyValue: displayValue,
    updatePropertyValue: updateDisplayValue,
  } = useElementProperty('display')

  return (
    <>
      <EachPropertyLayout
        label={'Display'}
        isEmpty={!displayValue}
        onAddValue={() => {}}
      >
        <div
          className={
            'flex gap-default_spacing bg-background p-1 rounded-lg w-full'
          }
        >
          <EachPropertyButton
            isActive={displayValue === 'flex'}
            onClick={() => updateDisplayValue('flex')}
            toolTip="Flex box"
          >
            Default
          </EachPropertyButton>
          <EachPropertyButton
            isActive={displayValue === 'grid'}
            onClick={() => updateDisplayValue('grid')}
            toolTip="Grid"
          >
            Grid
          </EachPropertyButton>
        </div>
      </EachPropertyLayout>
    </>
  )
}
