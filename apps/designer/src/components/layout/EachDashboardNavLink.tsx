import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  Icon: any
  label: string
  isActive?: boolean
}

export default function EachDashboardNavLink({ Icon, label, isActive }: Props) {
  return (
    <div
      className={cn(
        'hover:bg-accent p-default_spacing rounded-md hover:text-accent-foreground flex items-center gap-default_spacing',
        {
          'bg-primary_lighter/10 text-primary': isActive,
          'text-muted-foreground': !isActive,
        },
      )}
    >
      <Icon size={20} /> <span>{label}</span>
    </div>
  )
}
