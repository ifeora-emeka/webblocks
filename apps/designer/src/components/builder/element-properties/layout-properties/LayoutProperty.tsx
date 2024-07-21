import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import LayoutFlexProperties from '@/components/builder/element-properties/layout-properties/LayoutFlexDirectionProperty'
import LayoutDisplayProperty from '@/components/builder/element-properties/layout-properties/LayoutDisplayProperty'
import LayoutGapProperty from '@/components/builder/element-properties/layout-properties/LayoutGapProperty'

export default function LayoutProperty() {
  return (
    <>
      <AccordionItem value="layout">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Layout
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <LayoutDisplayProperty />
            <LayoutFlexProperties />
            <LayoutGapProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
