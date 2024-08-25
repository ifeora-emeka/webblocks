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
import AddElementProperty from '@/components/builder/element-properties/AddElementProperty'


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

            {/*Min*/}
            <MinWidthProperty />
            <MinHeightProperty />

            {/* Max */}
            <MaxWidthProperty />
            <MaxHeightProperty />


            <AddElementProperty
              options={[
                {
                  label: "Min width",
                  property: "minWidth",
                  defaultValue: "0px"
                },
                {
                  label: "Min height",
                  property: "minHeight",
                  defaultValue: "0px"
                },
                {
                  label: "Max width",
                  property: "maxWidth",
                  defaultValue: "0px"
                },
                {
                  label: "Max height",
                  property: "maxHeight",
                  defaultValue: "0px"
                }
              ]}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
