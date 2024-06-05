import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { useEffect, useState } from 'react'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'
import DefaultEdgeInput from '@/components/DefaultEdgeInput'
import DefaultFillInput from '@/components/DefaultFillInput'
import { ChakraProps } from '@chakra-ui/react';

type Props = {} & WithRendererProps

function StyleProperty({ builderHook, rendererState }: Props) {
  const { updateElementChakraStyleData } = builderHook
  const { active_element, activeBreakpoint } = rendererState
  const { chakraProps } = active_element[0]?.element_data

  const [styleUpdate, setStyleUpdate] = useState<any>({
    borderRadius: chakraProps?.borderRadius[activeBreakpoint] || '0',
    backgroundColor: chakraProps?.backgroundColor as any,
    ...chakraProps
  });
  const { borderRadius } = styleUpdate;

  const updateStyle = (newStyle: ResponsiveChakraProps) => {
    setStyleUpdate((prev: ChakraProps) => ({
      ...prev,
      ...newStyle,
    }))
  };

  useEffect(() => {
    if(styleUpdate) {
      updateElementChakraStyleData({
        element_id: active_element[0]?.element_data?.element_id,
        newChakraStyle: styleUpdate
      })
    }
  },[styleUpdate])

  useEffect(() => {
    setStyleUpdate(chakraProps as any);
  },[active_element])

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
              <DefaultEdgeInput value={parseInt(borderRadius[activeBreakpoint])} onChange={e => {updateStyle({
                borderRadius: {
                  ...styleUpdate.borderRadius,
                  [activeBreakpoint]: e + "px"
                }
              })}} />
            </EachPropertyLayout>
            <EachPropertyLayout label={'Fill'}>
              <DefaultFillInput value={styleUpdate.backgroundColor[activeBreakpoint] || ''} onChange={e => updateStyle({
                backgroundColor: {
                  ...styleUpdate.backgroundColor,
                  [activeBreakpoint]: e
                }
              })} />
            </EachPropertyLayout>
            <EachPropertyLayout label={'Border'}>
              <DefaultFillInput value={''} onChange={e => {}} />
            </EachPropertyLayout>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default withRenderer(StyleProperty)
