'use client'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import { Accordion } from '@/components/ui/accordion'
import StyleProperty from '@/components/builder/element-properties/style-properties/StyleProperty'
import LayoutProperty from '@/components/builder/element-properties/layout-properties/LayoutProperty'
import SizeProperty from '@/components/builder/element-properties/size-properties/SizeProperty'
import SpacingProperty from '@/components/builder/element-properties/spacing-property/ElementSpacingProperty'
import TypographyProperties from './element-properties/typography-properties/TypographyProperties'
import ElementAttributeProperties from './element-properties/attribute-properties/ElementAttributeProperties'
import PositionProperty from '@/components/builder/element-properties/positiion-property/PositionProperty'
import { Button } from '../ui/button'
import { TbBrush, TbChevronLeftPipe, TbChevronRightPipe, TbPointer } from 'react-icons/tb'
import DefaultIconBtn from '../DefaultIconBtn'
import { useState } from 'react'

export default function PropertiesPanel() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <div className='bg-card dark flex'>
        {
          showPanel && <div
            className={`min-h-[calc(100vh-100px-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-${BUILDER_NAV_SIZE})] bg-card min-w-[245px] max-w-[245px] overflow-x-hidden border-r overflow-y-auto text-foreground select-none flex flex-col z-50 pb-default_spacing_lg`}
          >
            <div
              defaultValue="styling"
              className={`flex-1 flex flex-col max-h-[calc(100vh-${BUILDER_NAV_SIZE})]`}
            >
              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={[
                  'attributes',
                  'layout',
                  'size',
                  'style',
                  'spacing',
                  'position',
                ]}
              >
                <ElementAttributeProperties />
                <SizeProperty />
                <SpacingProperty />
                <LayoutProperty />
                <PositionProperty />
                <TypographyProperties />
                <StyleProperty />
              </Accordion>
            </div>
          </div>
        }
        <div className={`min-w-[50px] max-w-[50px] flex flex-col items-center py-default_spacing gap-default_spacing justify-between z-[100]`}>
          <div className='flex items-center flex-col w-full gap-default_spacing'>
            <DefaultIconBtn
              Icon={TbBrush}
              tooltip={'Styling'}
              onClick={() => { }}
              side={'left'}
              isActive={false}
            />
            <DefaultIconBtn
              Icon={TbPointer}
              tooltip={'Interaction'}
              onClick={() => { }}
              side={'left'}
              isActive={false}
            />
          </div>
          <div>
            <DefaultIconBtn
              Icon={showPanel ? TbChevronRightPipe : TbChevronLeftPipe}
              tooltip={showPanel ? 'Show panel' : 'Hide panel'}
              onClick={() => setShowPanel(!showPanel)}
              side={'left'}
              isActive={false}
            />
          </div>
        </div>

      </div>
    </>
  )
}
