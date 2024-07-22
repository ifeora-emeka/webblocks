import { Input } from '@/components/ui/input'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ElementMarginPaddingProperty from '@/components/builder/element-properties/size-properties/ElementMarginPaddingProperty'

export default function ElementSpacingProperty() {
  return (
    <>
      <AccordionItem value="spacing">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Spacing
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <ElementMarginPaddingProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
