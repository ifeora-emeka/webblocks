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
import { TbSquare } from 'react-icons/tb'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'

type Props = {} & WithRendererProps

function LayoutProperty({ builderHook, rendererState }: Props) {
  //todo: remove all the state from here to prevent re-rendering
  const { updateElementChakraStyleData } = builderHook
  const { active_element, activeBreakpoint } = rendererState
  const { chakraProps } = active_element[0]?.element_data
  const display = chakraProps.display

  if (!activeBreakpoint || active_element.length === 0) {
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
              <div className={'flex items-center gap-1 justify-between'}>
                <Input
                  type={'number'}
                  className={'bg-background text-card-foreground w-12'}
                />
                <DefaultBtnTab
                  className={'flex-1'}
                  value={'single'}
                  data={[
                    {
                      value: 'single',
                      label: <TbSquare size={16} />,
                      tooltip: <p>Row: This will stack element horizontally</p>,
                    },
                    {
                      value: 'multiple',
                      label: <TbSquare size={16} />,
                      tooltip: <p>Colum: This will stack element vertically</p>,
                    },
                  ]}
                  onChange={(e) => {}}
                />
              </div>
            </EachPropertyLayout>
            <GridDisplayProperties />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default withRenderer(LayoutProperty)
