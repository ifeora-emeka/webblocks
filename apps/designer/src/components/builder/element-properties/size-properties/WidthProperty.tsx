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
import { UnitOfMeasurement } from '@repo/designer/types/index.types'

export default function WidthProperty() {
    const {
        propertyValue: widthValue,
        updatePropertyValue: updateWidthValue,
        removePropertyValue: removeWidthValue,
    } = useElementProperty('width');

    let currentUnitOfMeasurement = (): UnitOfMeasurement => {
        if (String(widthValue.trim()).includes('%')) {
            return '%'
        } else if (String(widthValue.trim()).includes('vh')) {
            return 'vh'
        } else {
            return 'px'
        }
    }

    const updateUnitOfMeasurement = (unit: UnitOfMeasurement) => {
        if (unit == '%') {
            updateWidthValue("100" + unit)
        } else {
            updateWidthValue(parseInt(widthValue) + unit)
        }
    }

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
                        updateWidthValue(String(parseInt(e.target.value)) + currentUnitOfMeasurement())
                    }
                />
                <Select onValueChange={e => updateUnitOfMeasurement(e as UnitOfMeasurement)}>
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
