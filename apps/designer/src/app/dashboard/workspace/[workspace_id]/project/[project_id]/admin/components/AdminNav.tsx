import EachDashboardNavLink from '@/components/layout/EachDashboardNavLink'
import Link from 'next/link'
import React from 'react'
import { TbChartPie, TbMoneybag, TbSettings2 } from 'react-icons/tb'

type Props = {}

export default function AdminNav({}: Props) {
  return (
    <>
      <div className="p-default_spacing flex flex-col gap-default_spacing">
        <Link href="">
          <EachDashboardNavLink Icon={TbChartPie} label="Overview" isActive />
        </Link>
        <Link href="">
          <EachDashboardNavLink Icon={TbMoneybag} label="Billing" />
        </Link>
        <Link href="">
          <EachDashboardNavLink Icon={TbSettings2} label="Settings" />
        </Link>
      </div>
    </>
  )
}
