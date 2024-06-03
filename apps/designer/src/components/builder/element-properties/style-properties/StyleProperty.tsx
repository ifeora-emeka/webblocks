import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import DefaultSliderInput from '@/components/DefaultSliderInput'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { useEffect, useState } from 'react'
import withRenderer, { WithRendererProps } from '@/components/builder/HOCs/WithRenderer'
import { debounce } from '@/components/builder/builder.utils'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'
import { generateStaticBreakpoints } from '@/lib/designer.utils'


type Props = {} & WithRendererProps

function StyleProperty({builderHook, rendererState}:Props) {
  const { updateElementChakraStyleData } = builderHook;
  const { active_element, activeBreakpoint } = rendererState;
  const { chakraProps } = active_element[0]?.element_data

  const [styleUpdate, setStyleUpdate] = useState(chakraProps)
  const { borderRadius } = chakraProps;
  const [radius, setRadius] = useState(0);

  const updateStyle = (newStyle: ResponsiveChakraProps) => {
    setStyleUpdate((prev) => ({
      ...prev,
      ...newStyle,
    }))
  }

  const debounceSetRadius = debounce((val: number) => {
    setRadius(val)
  }, 300)

  useEffect(() => {
    setRadius(parseInt(borderRadius[activeBreakpoint]))
  }, [])

  useEffect(() => {
    updateElementChakraStyleData({
      element_id: active_element[0].element_data.element_id,
      newChakraStyle: {
        borderRadius: generateStaticBreakpoints(new Array(4).fill(`${radius}px`).join(' '))
      },
    })
  },[radius])

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
              <DefaultSliderInput
                value={radius}
                onChange={(e) =>
                  debounceSetRadius(e)
                }
                max={100}
                step={1}
              />
            </EachPropertyLayout>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
)
}

export default withRenderer(StyleProperty)
