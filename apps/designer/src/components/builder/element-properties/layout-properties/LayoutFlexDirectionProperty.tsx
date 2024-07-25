import { Button } from '@/components/ui/button'
import { TbArrowNarrowDown, TbArrowNarrowRight } from 'react-icons/tb'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import useElementProperty from '@/components/builder/hooks/element-property.hooks'
import { cn } from '@/lib/utils'
import EachPropertyButton from '@/components/builder/element-properties/EachPropertyButton'

export default function LayoutFlexDirectionProperty() {
  const { propertyValue: flexFlowValue, updatePropertyValue: updateFlexFlow } =
    useElementProperty('flexFlow')

  return (
    <>
      <EachPropertyLayout
        label={'Direction'}
        isEmpty={!flexFlowValue}
        onAddValue={() => {}}
      >
        <div
          className={
            'flex gap-default_spacing bg-background p-1 rounded-lg w-full'
          }
        >
          <EachPropertyButton
            toolTip='Row'
            isActive={flexFlowValue === 'row'}
            onClick={() => updateFlexFlow('row')}
          >
            <TbArrowNarrowRight size={18} />
          </EachPropertyButton>
          <EachPropertyButton
            toolTip='Column'
            isActive={flexFlowValue === 'column'}
            onClick={() => updateFlexFlow('column')}
          >
            <TbArrowNarrowDown size={18} />
          </EachPropertyButton>
        </div>
      </EachPropertyLayout>
    </>
  )
}
