import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import useElementProperty from '../../hooks/element-property.hooks'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function HeightProperty() {
    const {
        propertyValue: heightValue,
        updatePropertyValue: updateHeightValue,
        removePropertyValue: removeHeightValue,
    } = useElementProperty('height')


    return (
        <>
            <EachPropertyLayout
                label={'Height'}
                isEmpty={!heightValue}
                onAddValue={() => updateHeightValue('20px')}
                onRemoveValue={removeHeightValue}
            >
                <Input
                    className="w-[60px]"
                    type={'number'}
                    value={parseInt(heightValue || '0')}
                    onChange={(e) =>
                        updateHeightValue(String(parseInt(e.target.value)) + 'px')
                    }
                />
                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder={heightValue.includes("%") ? "Fill" : "Fixed"} />
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
