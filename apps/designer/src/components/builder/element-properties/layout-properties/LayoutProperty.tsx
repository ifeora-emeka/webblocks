import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import DefaultBtnTab from '@/components/DefaultBtnTab'
import FlexDisplayProperties from '@/components/builder/element-properties/layout-properties/FlexDisplayProperties'

export default function LayoutProperty() {
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
            <div className={'flex flex-col gap-default_spacing'}>
              <small>Display</small>
              <DefaultBtnTab
                value={'flex'}
                data={[
                  {
                    value: 'block',
                    label: 'Block',
                    tooltip: (
                      <p>
                        Display block: This stacks <br /> element on top each
                        other.
                      </p>
                    ),
                  },
                  {
                    value: 'flex',
                    label: 'Flex',
                    tooltip: '',
                  },
                  {
                    value: 'grid',
                    label: 'Grid',
                    tooltip: '',
                  },
                  {
                    value: 'none',
                    label: 'None',
                    tooltip: '',
                  },
                ]}
                onChange={(e) => {}}
              />
            </div>
            <FlexDisplayProperties />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
