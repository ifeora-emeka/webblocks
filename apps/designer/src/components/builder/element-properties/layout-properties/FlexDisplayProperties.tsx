import DefaultBtnTab from '@/components/DefaultBtnTab'
import { TbArrowDown, TbArrowRight } from 'react-icons/tb'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import {
  PiAlignCenterHorizontalSimpleFill,
  PiAlignRightSimpleFill,
  PiAlignTopSimpleFill,
} from 'react-icons/pi'
import withRenderer, { WithRendererProps } from '../../HOCs/WithRenderer'
import { useEffect, useState } from 'react'
import { ResponsiveValue } from '@chakra-ui/react'
import { ElementBreakpoint } from '../../types/element-style.types'
import {} from '@chakra-ui/next-js'
import { debounce } from '@/components/builder/builder.utils'
import { ResponsiveChakraProps } from '@repo/designer/types/designer.types'

type Props = {} & WithRendererProps

function FlexDisplayProperties({ builderHook, rendererState }: Props) {
  const { updateElementChakraStyleData } = builderHook
  const { active_element, activeBreakpoint } = rendererState
  const activeElement = active_element[0]
  const { chakraProps } = active_element[0]?.element_data

  const [styleUpdate, setStyleUpdate] = useState(chakraProps)
  const { gap, placeContent, flexFlow, alignItems, flexWrap } = styleUpdate

  const updateStyle = (newStyle: ResponsiveChakraProps) => {
    setStyleUpdate((prev) => ({
      ...prev,
      ...newStyle,
    }))
  }

  const debouncedSetGap = debounce((newGap: ElementBreakpoint) => {
    updateStyle({
      gap: newGap,
    })
  }, 300)

  useEffect(() => {
    updateElementChakraStyleData({
      element_id: activeElement.element_data.element_id,
      newChakraStyle: styleUpdate,
    })
  }, [styleUpdate])

  useEffect(() => {
    setStyleUpdate(chakraProps)
  }, [chakraProps])

  return (
    <>
      <EachPropertyLayout label={'Direction'}>
        <DefaultBtnTab
          value={flexFlow[activeBreakpoint]}
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
          onChange={(e) => {
            updateStyle({
              flexFlow: {
                ...flexFlow,
                [activeBreakpoint]: e,
              },
            })
          }}
        />
      </EachPropertyLayout>
      <EachPropertyLayout label={'Justify'}>
        <Select
          defaultValue={placeContent[activeBreakpoint]}
          onValueChange={(e) =>
            updateStyle({
              placeContent: {
                ...placeContent,
                [activeBreakpoint]: e,
              },
            })
          }
        >
          <SelectTrigger className={'bg-background'}>
            <SelectValue placeholder="Select one:" />
          </SelectTrigger>
          <SelectContent className={'dark'}>
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
          <Input
            type={'number'}
            className={'bg-background text-card-foreground w-14'}
            value={parseInt(gap[activeBreakpoint])}
            onChange={(e) =>
              debouncedSetGap({
                ...gap,
                [activeBreakpoint]: e.target.value + 'px',
              })
            }
          />
          <Slider
            defaultValue={[parseInt(gap[activeBreakpoint])]}
            max={100}
            step={1}
            className={'w-full'}
            onValueChange={(e) => {
              debouncedSetGap({
                ...gap,
                [activeBreakpoint]: `${e[0]}px`,
              })
            }}
          />
        </div>
      </EachPropertyLayout>
      <EachPropertyLayout label={'Align'}>
        <DefaultBtnTab
          value={alignItems[activeBreakpoint]}
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
          onChange={(e) =>
            updateStyle({
              alignItems: {
                ...alignItems,
                [activeBreakpoint]: e,
              },
            })
          }
        />
      </EachPropertyLayout>
      <EachPropertyLayout label={'wrap'}>
        <DefaultBtnTab
          className={'flex-1'}
          value={flexWrap[activeBreakpoint]}
          data={[
            {
              value: 'wrap',
              label: 'Yes',
              tooltip: <p>Row: This will stack element horizontally</p>,
            },
            {
              value: 'nowrap',
              label: 'No',
              tooltip: <p>Colum: This will stack element vertically</p>,
            },
          ]}
          onChange={(e) =>
            updateStyle({
              flexWrap: {
                ...flexFlow,
                [activeBreakpoint]: e,
              },
            })
          }
        />
      </EachPropertyLayout>
    </>
  )
}

export default withRenderer(FlexDisplayProperties)
