import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ElementPositionProperty from '@/components/builder/element-properties/positiion-property/ElementPositionProperty'
import ElementZIndexProperty from '@/components/builder/element-properties/positiion-property/ElementZIndexProperty'

export default function PositionProperty(){
  return <>
    <AccordionItem value="size">
      <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
        Position
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={'p-default_spacing flex flex-col gap-default_spacing'}
        >
          <ElementPositionProperty />
          <ElementZIndexProperty />
        </div>
      </AccordionContent>
    </AccordionItem>
  </>
}
