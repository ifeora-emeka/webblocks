import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'
import FontSizeProperty from './FontSizeProperty'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import FontColorProperty from './FontColorProperty'
import FontAlignmentProperty from './FontAlignmentProperty'

export default function TypographyProperties() {
  const { active_element } = useSelector((state: AppStore) => state.renderer)

  if (!active_element[0].element_data.text_content) {
    return null
  }

  return (
    <>
      <AccordionItem value="size">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Typography
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <FontSizeProperty />
            <FontColorProperty />
            <FontAlignmentProperty />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
