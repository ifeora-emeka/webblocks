import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { Input } from '@/components/ui/input'
import ElementUnitSelector from '@/components/builder/element-properties/ElementUnitSelector'

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
            <EachPropertyLayout label={'Width'}>
              <div className={'flex items-center gap-1 justify-between'}>
                <Input
                  type={'number'}
                  className={
                    'bg-background text-card-foreground w-12 flex-grow'
                  }
                />
                <ElementUnitSelector />
              </div>
            </EachPropertyLayout>
            <EachPropertyLayout label={'Height'}>
              <div className={'flex items-center gap-1 justify-between'}>
                <Input
                  type={'number'}
                  className={
                    'bg-background text-card-foreground w-12 flex-grow'
                  }
                />
                <ElementUnitSelector />
              </div>
            </EachPropertyLayout>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
