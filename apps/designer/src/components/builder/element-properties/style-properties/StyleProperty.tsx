import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'
import DefaultEdgeInput from '@/components/DefaultEdgeInput'
import DefaultFillInput from '@/components/DefaultFillInput'
import FillProperty from '@/components/builder/element-properties/style-properties/FillProperty'

type Props = {} & WithRendererProps

function StyleProperty({ builderHook, rendererState }: Props) {
  const { updateElementChakraStyleData } = builderHook
  const { active_element, activeBreakpoint } = rendererState;
  const { chakraProps } = active_element[0]?.element_data;


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
            <EachPropertyLayout label={'Radius'}>
              <DefaultEdgeInput value={3} onChange={e=> {}} />
            </EachPropertyLayout>
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

export default withRenderer(StyleProperty)
