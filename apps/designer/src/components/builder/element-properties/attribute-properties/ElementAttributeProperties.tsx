import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'
import ImageAttributes from './ImageAttributes'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import TextElementAttribute from './TextElementAttribute'

export default function ElementAttributeProperties() {2
  const { active_element } = useSelector((state: AppStore) => state.renderer)
  const tagType = active_element[0]?.element_data?.html_tag

  return (
    <>
      <AccordionItem value="attributes">
        <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
          Settings
        </AccordionTrigger>
        <AccordionContent>
          <div
            className={'p-default_spacing flex flex-col gap-default_spacing'}
          >
            <ImageAttributes />
            <TextElementAttribute />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
