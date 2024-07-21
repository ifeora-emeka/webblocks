import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import FillProperty from '@/components/builder/element-properties/style-properties/FillProperty'
import StyleGapProperty from '@/components/builder/element-properties/style-properties/StyleGapProperty'

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
            <StyleGapProperty />
            <FillProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default StyleProperty
