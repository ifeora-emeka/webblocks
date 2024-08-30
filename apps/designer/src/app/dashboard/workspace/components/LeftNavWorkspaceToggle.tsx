'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TbCaretDown, TbChevronRight, TbPlus } from 'react-icons/tb'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



type Props = {}

export default function LeftNavWorkspaceToggle({ }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex gap-default_spacing justify-between px-default_spacing items-center group cursor-pointer w-full'>
                    <div className='flex items-center gap-default_spacing truncate'>
                        <Avatar className='h-7 w-7'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='group-hover:text-foreground text-muted-foreground truncate'>{`Emeka Workspace`}</p>
                    </div>
                    <button className='text-muted-foreground'>
                        <TbCaretDown />
                    </button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-[280px] max-w-[280px]'>
                <DropdownMenuItem>
                    <EachWorkspace label="Emeka stanley workspace" />
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <EachWorkspace label="iDegin Tech" isActive />
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <EachWorkspace label="Hawksworth Advisors" isActive />
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-muted' />
                <DropdownMenuItem className='flex items-center gap-default_spacing text-muted-foreground hover:text-foreground w-full truncate'>
                    <TbPlus /> <p>Create new workspace</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}

const EachWorkspace = ({ label, isActive }: { label: string; isActive?: boolean; }) => {
    return <>
        <div className='flex items-center gap-default_spacing_lg w-full'>
            <div className='flex items-center gap-default_spacing flex-1  truncate'>
                <Avatar className='h-7 w-7'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex-1 w-full truncate text-muted-foreground hover:text-foreground'>
                    <p className='truncate'>{label}</p>
                </div>
            </div>
            {isActive && <div className='min-w-3'>
                {<div className='min-h-2 min-w-2 max-w-2 bg-primary rounded-full' />}
            </div>}
        </div>
    </>
}
