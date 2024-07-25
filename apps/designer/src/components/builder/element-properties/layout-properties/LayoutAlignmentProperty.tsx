import React from 'react'
import useElementProperty from '../../hooks/element-property.hooks'
import EachPropertyLayout from '../EachPropertyLayout'
import EachPropertyButton from '../EachPropertyButton'
import { TbAlignBoxBottomCenter, TbAlignBoxCenterMiddle, TbAlignBoxLeftMiddle, TbAlignBoxTopCenter } from 'react-icons/tb'

export default function LayoutAlignmentProperty() {
    const {
        propertyValue,
        updatePropertyValue,
    } = useElementProperty('alignItems')

    return (
        <>
            <EachPropertyLayout
                label={'Alignment'}
                isEmpty={!propertyValue}
                onAddValue={() => updatePropertyValue('center')}
            >
                <div
                    className={
                        'flex gap-default_spacing bg-background p-1 rounded-lg w-full'
                    }
                >
                    <EachPropertyButton
                        toolTip='Start'
                        isActive={propertyValue === 'flex-start'}
                        onClick={() => updatePropertyValue('flex-start')}
                    >
                        <TbAlignBoxTopCenter size={18} />
                    </EachPropertyButton>
                    <EachPropertyButton
                        toolTip='Center'
                        isActive={propertyValue === 'center'}
                        onClick={() => updatePropertyValue('center')}
                    >
                        <TbAlignBoxCenterMiddle size={18} />
                    </EachPropertyButton>
                    <EachPropertyButton
                        toolTip='End'
                        isActive={propertyValue === 'flex-end'}
                        onClick={() => updatePropertyValue('flex-end')}
                    >
                        <TbAlignBoxBottomCenter size={18} />
                    </EachPropertyButton>
                </div>
            </EachPropertyLayout>
        </>
    )
}
