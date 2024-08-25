import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ElementPositionProperty from '@/components/builder/element-properties/positiion-property/ElementPositionProperty'
import ElementZIndexProperty from '@/components/builder/element-properties/positiion-property/ElementZIndexProperty'
import ElementPlacementProperty
  from '@/components/builder/element-properties/positiion-property/ElementPlacementProperty'

export default function PositionProperty(){
  return <>
    <AccordionItem value="position">
      <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
        Position
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={'p-default_spacing flex flex-col gap-default_spacing'}
        >
          <ElementPositionProperty />
          <ElementPlacementProperty />
          <ElementZIndexProperty />
        </div>
      </AccordionContent>
    </AccordionItem>
  </>
}
