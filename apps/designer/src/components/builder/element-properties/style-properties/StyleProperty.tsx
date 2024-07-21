import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import FillProperty from '@/components/builder/element-properties/style-properties/FillProperty'

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
            <FillProperty />
            {/*<EachPropertyLayout label={'Border'}>*/}
            {/*  <DefaultFillInput value={''} onChange={e => {}} />*/}
            {/*</EachPropertyLayout>*/}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default StyleProperty
