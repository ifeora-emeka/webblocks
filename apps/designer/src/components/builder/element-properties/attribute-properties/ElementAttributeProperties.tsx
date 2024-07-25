import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import ImageAttributes from './ImageAttributes'

export default function ElementAttributeProperties() {
    return (
        <>
            <AccordionItem value="attributes">
                <AccordionTrigger className={'px-default_spacing py-default_spacing'}>
                    Attributes
                </AccordionTrigger>
                <AccordionContent>
                    <div
                        className={'p-default_spacing flex flex-col gap-default_spacing'}
                    >
                        <ImageAttributes />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </>
    )
}
