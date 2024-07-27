import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import LayoutFlexProperties from '@/components/builder/element-properties/layout-properties/LayoutFlexDirectionProperty'
import LayoutDisplayProperty from '@/components/builder/element-properties/layout-properties/LayoutDisplayProperty'
import JustifyContentProperty from './JustifyContentProperty'
import LayoutAlignmentProperty from './LayoutAlignmentProperty'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'

export default function LayoutProperty() {
  const { active_element } = useSelector((state: AppStore) => state.renderer);

  if(active_element[0].element_data.text_content) {
    return null
  }

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
            <JustifyContentProperty />
            <LayoutAlignmentProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
