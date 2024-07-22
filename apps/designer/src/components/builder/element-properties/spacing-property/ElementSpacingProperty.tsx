import { Input } from '@/components/ui/input'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
            <EachPropertyLayout
              label={'Width'}
              isEmpty={false}
              onAddValue={() => {}}
            >
              <Input className="w-[50px]" />
            </EachPropertyLayout>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
