import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import DefaultBtnTab from '@/components/DefaultBtnTab'
import FlexDisplayProperties from '@/components/builder/element-properties/layout-properties/FlexDisplayProperties'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import GridDisplayProperties from '@/components/builder/element-properties/layout-properties/GridDisplayProperties'
import { Input } from '@/components/ui/input'
import { TbArrowsMaximize, TbLink } from 'react-icons/tb'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'
import { useEffect, useState } from 'react'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'
import { generateStaticBreakpoints } from '@/lib/designer.utils'
import DefaultEdgeInput from '@/components/DefaultEdgeInput'

type Props = {} & WithRendererProps

function LayoutProperty({ builderHook, rendererState }: Props) {
  //todo: remove all the state from here to prevent re-rendering
  const { updateElementChakraStyleData } = builderHook
  const { active_element, activeBreakpoint } = rendererState
  const { chakraProps } = active_element[0]?.element_data || {}
  const [styleUpdate, setStyleUpdate] = useState(chakraProps)

  const [padding, setPadding] = useState(chakraProps?.paddingTop?.lg)

  const [unit, setUnit] = useState('px')

  const updateStyle = (newStyle: ResponsiveChakraProps) => {
    setStyleUpdate((prev) => ({
      ...prev,
      ...newStyle,
    }))
  }

  useEffect(() => {
    if (padding) {
      updateElementChakraStyleData({
        element_id: active_element[0].element_data.element_id,
        newChakraStyle: {
          paddingTop: generateStaticBreakpoints(padding),
          paddingBottom: generateStaticBreakpoints(padding),
          paddingLeft: generateStaticBreakpoints(padding),
          paddingRight: generateStaticBreakpoints(padding),
        } as any,
      })
    }
  }, [padding])

  if (
    !activeBreakpoint ||
    active_element.length === 0 ||
    active_element.length > 1
  ) {
    return null
  }

  const { paddingLeft, paddingRight, paddingBottom, paddingTop } = chakraProps
  const display = chakraProps.display

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
            <EachPropertyLayout label={'Display'}>
              <DefaultBtnTab
                value={display[activeBreakpoint]}
                data={[
                  {
                    value: 'flex',
                    label: 'Stack',
                    tooltip: (
                      <p>
                        Display block: This stacks <br /> element on top each
                        other.
                      </p>
                    ),
                  },
                  {
                    value: 'grid',
                    label: 'Grid',
                    tooltip: '',
                  },
                ]}
                onChange={(e) => {}}
              />
            </EachPropertyLayout>
            <FlexDisplayProperties />
            <EachPropertyLayout label={'Padding'}>
              <DefaultEdgeInput
                value={parseInt(padding)}
                onChange={(e) => setPadding(e + unit)}
              />
            </EachPropertyLayout>
            <GridDisplayProperties />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default withRenderer(LayoutProperty)
