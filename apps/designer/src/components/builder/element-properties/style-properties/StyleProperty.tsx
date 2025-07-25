import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import FillProperty from '@/components/builder/element-properties/style-properties/FillProperty'
import BorderRadiusProperty from './BorderRadiusProperty'
import OverflowProperty from '@/components/builder/element-properties/style-properties/OverflowProperty'

function StyleProperty() {
  return (
    <>
      <AccordionItem value="style">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Style
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <BorderRadiusProperty />
            <FillProperty />
            <OverflowProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default StyleProperty
