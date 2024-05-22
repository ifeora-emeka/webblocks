import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LayoutProperty from '@/components/builder/element-properties/layout-properties/LayoutProperty'

export default function PropertiesPanel() {
  return (
    <>
      <Tabs
        defaultValue="styling"
        className={`min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-${BUILDER_NAV_SIZE})] bg-card min-w-[300px] max-w-[300px] overflow-x-hidden overflow-y-hidden text-foreground select-none flex flex-col`}
      >
        <div
          defaultValue="styling"
          className={`flex-1 flex flex-col max-h-[calc(100vh-${BUILDER_NAV_SIZE})]`}
        >
          <div className={'min-h-[35px] max-h-[35px] w-[95%]'}>
            <TabsList
              className={`bg-background mx-default_spacing min-h-full w-full flex justify-start py-0`}
            >
              <TabsTrigger value="styling" className={'text-xs'}>
                Styling
              </TabsTrigger>
              <TabsTrigger value="attributes" className={'text-xs'}>
                Attributes
              </TabsTrigger>
              <TabsTrigger value="animations" className={'text-xs'}>
                Animation
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="styling"
            className={`flex-1 flex-col flex h-full overflow-y-auto max-h-[calc(100vh-${BUILDER_NAV_SIZE}-80px)] min-h-[calc(100vh-${BUILDER_NAV_SIZE}-35px)] pb-[35px] text-white/70`}
          >
            <Accordion type="multiple" className="w-full">
              <LayoutProperty />
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={'px-default_spacing py-default_spacing'}
                >
                  Is it accessible?
                </AccordionTrigger>
                <AccordionContent>
                  {new Array(22).fill(null).map((_) => {
                    return (
                      <h1 key={crypto.randomUUID()}>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </h1>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger
                  className={'px-default_spacing py-default_spacing'}
                >
                  Is it styled?
                </AccordionTrigger>
                <AccordionContent>
                  {new Array(42).fill(null).map((_) => {
                    return (
                      <h1 key={crypto.randomUUID()}>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </h1>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger
                  className={'px-default_spacing py-default_spacing'}
                >
                  Is it animated?
                </AccordionTrigger>
                <AccordionContent>
                  {new Array(22).fill(null).map((_) => {
                    return (
                      <h1 key={crypto.randomUUID()}>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </h1>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </div>
      </Tabs>
    </>
  )

  return (
    <div
      className={`min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-${BUILDER_NAV_SIZE})] bg-card min-w-[350px] max-w-[350px] overflow-x-hidden text-foreground select-none`}
    >
      <Tabs defaultValue="styling" className={`max-h-[${BUILDER_NAV_SIZE}]`}>
        <TabsList
          className={`bg-background mx-default_spacing min-h-[${BUILDER_NAV_SIZE}] max-h-[${BUILDER_NAV_SIZE}]`}
        >
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="animations">Animation</TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>
        <TabsContent
          value="styling"
          className={`max-h-[calc(100vh-${BUILDER_NAV_SIZE}-${BUILDER_NAV_SIZE})] overflow-y-auto`}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={'px-default_spacing text-muted-foreground'}
              >
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                {new Array(22).fill(null).map((_) => {
                  return (
                    <h1 key={crypto.randomUUID()}>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </h1>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger
                className={'px-default_spacing text-muted-foreground'}
              >
                Is it styled?
              </AccordionTrigger>
              <AccordionContent>
                {new Array(42).fill(null).map((_) => {
                  return (
                    <h1 key={crypto.randomUUID()}>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </h1>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger
                className={'px-default_spacing text-muted-foreground'}
              >
                Is it animated?
              </AccordionTrigger>
              <AccordionContent>
                {new Array(22).fill(null).map((_) => {
                  return (
                    <h1 key={crypto.randomUUID()}>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </h1>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="animations"></TabsContent>
        <TabsContent value="others">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
