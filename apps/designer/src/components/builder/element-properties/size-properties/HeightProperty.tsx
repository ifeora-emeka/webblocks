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
import { UnitOfMeasurement } from '@repo/designer/types/index.types'

export default function HeightProperty() {
    const {
        propertyValue: heightValue,
        updatePropertyValue: updateHeightValue,
        removePropertyValue: removeHeightValue,
    } = useElementProperty('height');

    const updateUnitOfMeasurement = (unit: UnitOfMeasurement) => {
        if (unit == '%') {
            updateHeightValue("100" + unit)
        } else {
            updateHeightValue(parseInt(heightValue) + unit)
        }
    }

    let currentUnitOfMeasurement = (): UnitOfMeasurement => {
        if (String(heightValue.trim()).includes('%')) {
            return '%'
        } else if (String(heightValue.trim()).includes('vh')) {
            return 'vh'
        }else {
            return 'px'
        }
    }

    return (
        <>
            <EachPropertyLayout
                label={'Height'}
                isEmpty={!heightValue}
                onAddValue={() => updateHeightValue('20px')}
                onRemoveValue={removeHeightValue}
            >
                <Input
                    className="w-[60px] hover:bg-background focus:bg-background active:bg-background border-0"
                    type={'number'}
                    value={parseInt(heightValue || '0')}
                    onChange={(e) =>
                        updateHeightValue(String(parseInt(e.target.value)) + currentUnitOfMeasurement())
                    }
                />
                <Select onValueChange={e => updateUnitOfMeasurement(e as UnitOfMeasurement)}>
                    <SelectTrigger className="">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={'dark'}>
                        <SelectItem value="%">Fill</SelectItem>
                        <SelectItem value="px">Fixed</SelectItem>
                        <SelectItem value="vh">View</SelectItem>
                    </SelectContent>
                </Select>
            </EachPropertyLayout>
        </>
    )
}
