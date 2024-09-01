import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ElementPositionProperty from '@/components/builder/element-properties/positiion-property/ElementPositionProperty'
import ElementZIndexProperty from '@/components/builder/element-properties/positiion-property/ElementZIndexProperty'
import AddElementProperty from '@/components/builder/element-properties/AddElementProperty'
import TopPlacementProperty from '@/components/builder/element-properties/positiion-property/TopPlacementProperty'
import RightPlacementProperty from '@/components/builder/element-properties/positiion-property/RightPlacementProperty'
import BottomPlacementProperty from '@/components/builder/element-properties/positiion-property/BottomPlacementProperty'
import LeftPlacementProperty from '@/components/builder/element-properties/positiion-property/LeftPlacementProperty'

export default function PositionProperty() {
  return (
    <>
      <AccordionItem value="position">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Position
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <ElementZIndexProperty />
            <ElementPositionProperty />

            {/* PLACEMENT */}
            <TopPlacementProperty />
            <RightPlacementProperty />
            <BottomPlacementProperty />
            <LeftPlacementProperty />
            <AddElementProperty
              label={'Add placement'}
              options={[
                {
                  label: 'Top',
                  property: 'top',
                  defaultValue: '0px',
                },
                {
                  label: 'Right',
                  property: 'right',
                  defaultValue: '0px',
                },
                {
                  label: 'Bottom',
                  property: 'bottom',
                  defaultValue: '0px',
                },
                {
                  label: 'Left',
                  property: 'left',
                  defaultValue: '0px',
                },
              ]}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
