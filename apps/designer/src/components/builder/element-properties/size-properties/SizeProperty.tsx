import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import WidthProperty from './WidthProperty'
import HeightProperty from './HeightProperty'

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
            <WidthProperty />
            <HeightProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
