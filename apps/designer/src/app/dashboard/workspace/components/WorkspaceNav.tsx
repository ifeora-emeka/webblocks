import EachDashboardNavLink from '@/components/layout/EachDashboardNavLink'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'
import { TbFileCode, TbMoneybag, TbSettings, TbUserPlus, TbVideo } from 'react-icons/tb'

export default function WorkspaceNav() {
    return (
        <div className='p-default_spacing flex flex-col gap-default_spacing'>
            <Link href=''>
                <EachDashboardNavLink Icon={TbFileCode} label='Projects' isActive />
            </Link>
            <Link href=''>
                <EachDashboardNavLink Icon={TbUserPlus} label='Team' />
            </Link>
            <Separator />
            <Link href=''>
                <EachDashboardNavLink Icon={TbVideo} label='Tutorials' />
            </Link>
            <Link href=''>
                <EachDashboardNavLink Icon={TbMoneybag} label='Billing' />
            </Link>
            <Link href=''>
                <EachDashboardNavLink Icon={TbSettings} label='Settings' />
            </Link>
        </div>
    )
}
