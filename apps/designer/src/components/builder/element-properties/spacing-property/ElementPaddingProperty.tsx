import React from 'react'
import EachPropertyLayout from '../EachPropertyLayout'
import { Input } from '@/components/ui/input'
import useElementProperty from '../../hooks/element-property.hooks'
import { debounce } from '../../builder.utils'

export default function ElementPaddingProperty() {
    const {
        propertyValue: paddingValue,
        updatePropertyValue: updatePaddingValue,
        removePropertyValue: removePaddingValue,
    } = useElementProperty('padding')

    const debouncedUpdatePaddingValue = debounce((value: string) => {
        updatePaddingValue(value)
    }, 30)

    const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        debouncedUpdatePaddingValue(value + 'px')
    }

    return (
        <>
            <EachPropertyLayout
                label={'Padding'}
                isEmpty={!paddingValue}
                onAddValue={() => updatePaddingValue('20px')}
                onRemoveValue={removePaddingValue}
            >
                <Input
                    className="w-[50px]"
                    value={paddingValue ? parseInt(paddingValue || '0') : ''}
                    onChange={handlePaddingChange}
                />
            </EachPropertyLayout>
        </>
    )
}
