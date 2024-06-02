import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import SizeProperty from '@/components/builder/element-properties/size-properties/SizeProperty'

export default function DefaultPropertyPanel() {
  return <>
    <SizeProperty />
    <AccordionItem value="position">
      <AccordionTrigger
        className={'px-default_spacing py-default_spacing'}
      >
        Position
      </AccordionTrigger>
      <AccordionContent>
        <h1 key={crypto.randomUUID()}>
          for Position
        </h1>
      </AccordionContent>
    </AccordionItem>
  </>
}
