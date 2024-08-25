import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout'
import UOMInput from '@/components/builder/inputs/UOMInput'
import { VariableValueType } from '@repo/designer/types/variables.types'

export default function MaxWidthProperty() {
    const {
        propertyValue,
        updatePropertyValue,
        removePropertyValue,
        isCorners,
        varReferenceValue
    } = useElementProperty('maxWidth')

    if(!propertyValue) {
        return null;
    }

    const updateUnitOfMeasurement = (value: string) => {
        updatePropertyValue(value);
    }

    return (
        <>
            <EachPropertyLayout
                label={'Max Width'}
                isEmpty={!propertyValue}
                onAddValue={() => updatePropertyValue('100%')}
                onRemoveValue={removePropertyValue}
            >
                <div className={'flex items-center gap-default_spacing justify-end'}>
                    <UOMInput
                        isCorners={isCorners}
                        onChange={val => updateUnitOfMeasurement(`${val}`)}
                        value={propertyValue}
                        allowed_values={[VariableValueType.UOM]}
                        ref_value={varReferenceValue}
                    />
                </div>
            </EachPropertyLayout>
        </>
    )
}
