import DefaultBtnTab from '@/components/DefaultBtnTab'
import { TbArrowDown, TbArrowRight } from 'react-icons/tb'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { PiAlignCenterHorizontalSimpleFill, PiAlignRightSimpleFill, PiAlignTopSimpleFill } from 'react-icons/pi'
import withRenderer, { WithRendererProps } from '../../HOCs/WithRenderer'
import { useEffect, useState } from 'react'
import { ResponsiveValue } from '@chakra-ui/react'
import { ElementBreakpoint } from '../../types/element-style.types'
import {  } from '@chakra-ui/next-js'

type Props = {

} & WithRendererProps;


type DirectionValue = 'row' | 'column';

function FlexDisplayProperties({ builderHook, rendererState }:Props) {
  const { updateElementChakraStyleData } = builderHook;
  const { active_element, activeBreakpoint } = rendererState;
  const activeElement = active_element[0];
  const { chakraProps } = active_element[0]?.element_data;

  const [direction, setDirection] = useState<ElementBreakpoint>(chakraProps.flexFlow as ElementBreakpoint);

  console.log('DIRECTION::', direction)

  useEffect(() => {
    updateElementChakraStyleData({
      element_id: activeElement.element_data.element_id,
      newChakraStyle: {
        //@ts-ignore
        direction: direction,
      }
    })
  }, [direction])

  useEffect(() => {

  },[rendererState])

  return (
    <>
      <EachPropertyLayout label={'Direction'}>
        <DefaultBtnTab
          value={direction[activeBreakpoint]}
          data={[
            {
              value: 'row',
              label: <TbArrowRight size={16} />,
              tooltip: <p>Row: This will stack element horizontally</p>,
            },
            {
              value: 'column',
              label: <TbArrowDown size={16} />,
              tooltip: <p>Colum: This will stack element vertically</p>,
            },
          ]}
          onChange={(e) => {console.log(e)}}
        />
      </EachPropertyLayout>
      <EachPropertyLayout label={'Distribution'}>
        <Select defaultValue={'center'}>
          <SelectTrigger className={'bg-background'}>
            <SelectValue placeholder="Select one:" />
          </SelectTrigger>
          <SelectContent className={'dark'} >
            <SelectItem value="start">Start</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="end">End</SelectItem>
            <SelectItem value="space-between">Space between</SelectItem>
            <SelectItem value="space-evenly">Space evenly</SelectItem>
          </SelectContent>
        </Select>
      </EachPropertyLayout>
      <EachPropertyLayout label={'Gap'}>
        <div className={'flex items-center gap-default_spacing'}>
          <Input type={'number'} className={'bg-background text-card-foreground w-14'} />
          <Slider defaultValue={[33]} max={100} step={1} className={'w-full'} />
        </div>
      </EachPropertyLayout>
      <EachPropertyLayout label={'Align'}>
        <DefaultBtnTab
          value={'center'}
          data={[
            {
              value: 'start',
              label: <PiAlignTopSimpleFill size={16} />,
              tooltip: <p>Row: This will stack element horizontally</p>,
            },
            {
              value: 'center',
              label: <PiAlignCenterHorizontalSimpleFill size={16} />,
              tooltip: <p>Colum: This will stack element vertically</p>,
            },
            {
              value: 'end',
              label: <PiAlignRightSimpleFill size={16} />,
              tooltip: <p>Colum: This will stack element vertically</p>,
            },
          ]}
          onChange={(e) => {}}
        />
      </EachPropertyLayout>
      <EachPropertyLayout label={'wrap'}>
        <DefaultBtnTab
          className={'flex-1'}
          value={'no'}
          data={[
            {
              value: 'yes',
              label: "Yes",
              tooltip: <p>Row: This will stack element horizontally</p>,
            },
            {
              value: 'no',
              label: "No",
              tooltip: <p>Colum: This will stack element vertically</p>,
            },
          ]}
          onChange={(e) => {}}
          />
      </EachPropertyLayout>

    </>
)
}

export default withRenderer(FlexDisplayProperties);
