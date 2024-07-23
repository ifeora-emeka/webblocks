import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function WidthProperty() {
    const {
        propertyValue: widthValue,
        updatePropertyValue: updateWidthValue,
        removePropertyValue: removeWidthValue,
    } = useElementProperty('width');

    return (
        <>
            <EachPropertyLayout
                label={'Width'}
                isEmpty={!widthValue}
                onAddValue={() => updateWidthValue('100%')}
                onRemoveValue={removeWidthValue}
            >
                <Input
                    className="w-[60px] hover:bg-background focus:bg-background active:bg-background border-0"
                    type={'number'}
                    value={parseInt(widthValue || '0')}
                    onChange={(e) =>
                        updateWidthValue(String(parseInt(e.target.value)) + 'px')
                    }
                />
                <Select>
                    <SelectTrigger className="max-w-[40%]">
                        <SelectValue placeholder={widthValue.includes("%") ? "Fill": "Fixed"} />
                    </SelectTrigger>
                    <SelectContent className={'dark'}>
                        <SelectItem value="%">Fill</SelectItem>
                        <SelectItem value="px">Fixed</SelectItem>
                        <SelectItem value="vh">Fixed</SelectItem>
                    </SelectContent>
                </Select>
            </EachPropertyLayout>
        </>
    )
}
