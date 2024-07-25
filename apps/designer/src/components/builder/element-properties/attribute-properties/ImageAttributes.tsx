import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import useElementAttribute from '../../hooks/element-attribute.hooks'
import { Input } from '@/components/ui/input'
import { debounce } from '../../builder.utils'

export default function ImageAttributes() {
    const {
        propertyValue: marginValue,
        updatePropertyValue: updateMarginValue,
        removePropertyValue: removeMarginValue,
    } = useElementAttribute('src')

    const debouncedUpdateMarginValue = debounce((value: string) => {
        updateMarginValue(value)
    }, 30)

    const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        debouncedUpdateMarginValue(value)
    }

    return (
        <EachPropertyLayout
            label={'Source'}
            isEmpty={!marginValue}
            onAddValue={() => updateMarginValue('20px')}
            onRemoveValue={removeMarginValue}
        >
            <Input
                className=" focus:bg-background active:bg-background hover:bg-background border-0 text-center"
                value={marginValue}
                onChange={handleMarginChange}
            />
        </EachPropertyLayout>
    )
}
