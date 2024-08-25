import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import WidthProperty from './WidthProperty'
import HeightProperty from './HeightProperty'
import MinWidthProperty from './MinWidthProperty'
import MinHeightProperty from './MinHeightProperty'
import MaxWidthProperty from './MaxWidthProperty'
import MaxHeightProperty from './MaxHeightProperty'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { TbCaretUpDown } from 'react-icons/tb'


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

            <Collapsible>
              <CollapsibleTrigger className='text-muted-foreground w-full text-start flex items-center justify-between pb-default_spacing'>Min - Max <TbCaretUpDown className="h-4 w-4" /></CollapsibleTrigger>
              <CollapsibleContent>
                {/* Min */}
                <MinWidthProperty />
                <MinHeightProperty />

                {/* Max */}
                <MaxHeightProperty />
                <MaxWidthProperty />
              </CollapsibleContent>
            </Collapsible>


           
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
