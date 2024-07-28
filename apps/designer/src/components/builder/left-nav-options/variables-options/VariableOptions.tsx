import React from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import { TbChevronRight, TbPlus } from 'react-icons/tb'
import { cn } from '@/lib/utils'
import VariableSetDetails from './VariableSetDetails'

type Props = {}

export default function VariableOptions({ }: Props) {
    return (
        <>
            <BuilderLeftPanelContainer
                onSearch={() => { }}
                heading="Variables"
                actions={
                    <div>
                        <DefaultTooltip content={'Create set'} side={'top'}>
                            <Button variant="ghost" size="icon" className={'hover:bg-card'}>
                                <TbPlus className="h-4 w-4" />
                            </Button>
                        </DefaultTooltip>
                    </div>
                }
            >
                <EachVariableSet label='The label' />
                <EachVariableSet label='The label' />
                <EachVariableSet label='The label' isActive />
                <EachVariableSet label='The label' />
            </BuilderLeftPanelContainer>
            <VariableSetDetails />
        </>
    )
}

const EachVariableSet = ({ label, isActive }: { isActive?: boolean; label: string; }) => {
    return <>
        <div className={cn('flex gap-default_spacing items-center cursor-pointer border-b p-default_spacing hover:bg-accent group hover:text-card-foreground', {
            "bg-accent text-card-foreground": isActive
        })}>
            <div className='flex-1'>
                <small>{label}</small>
            </div>
            <div className={cn('', {
                "": isActive,
                "opacity-0 group-hover:opacity-100": !isActive
            })}>
                <TbChevronRight />
            </div>
        </div>
    </>
}
