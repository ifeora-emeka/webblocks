import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import DefaultElementSizeProperty from '@/components/builder/element-properties/size-properties/ElementSizeProperty'

export default function SizeProperty() {
  return (
    <>
      <AccordionItem value="size">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Size
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <DefaultElementSizeProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
