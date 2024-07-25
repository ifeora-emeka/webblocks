import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function JustifyContentProperty() {
    const {
        propertyValue,
        updatePropertyValue,
    } = useElementProperty('placeContent')

    return (
        <>
            <EachPropertyLayout
                label={'Distribution'}
                isEmpty={!propertyValue}
                onAddValue={() => { }}
            >
                <div
                    className={
                        'flex gap-default_spacing bg-background p-1 rounded-lg w-full'
                    }
                >
                    <Select onValueChange={value => updatePropertyValue(value)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className='dark'>
                            <SelectItem value="flex-start">Start</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="flex-end">End</SelectItem>
                            <SelectItem value="space-around">Space around</SelectItem>
                            <SelectItem value="space-between">Space between</SelectItem>
                            <SelectItem value="space-evenly">Space evenly</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </EachPropertyLayout>
        </>
    )
}
