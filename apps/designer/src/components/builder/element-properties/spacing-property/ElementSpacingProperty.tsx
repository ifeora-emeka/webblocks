import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ElementMarginProperty from './ElementMarginProperty'
import ElementPaddingProperty from './ElementPaddingProperty'
import LayoutGapProperty from './LayoutGapProperty'

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
            <ElementMarginProperty />
            <ElementPaddingProperty />
            <LayoutGapProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
