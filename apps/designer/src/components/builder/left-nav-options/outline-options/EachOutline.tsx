import { cn } from '@/lib/utils'
import React from 'react'
import { PiRowsFill } from 'react-icons/pi'

type Props = {
  isActive?: boolean;
  element_children: any[];
}



export default function EachOutline({ isActive, element_children }: Props) {
  return (
    <>
      <div
        className={cn(
          'p-default_spacing text-xs rounded-lg hover:bg-accent hover:text-white/80 cursor-pointer flex gap-default_spacing items-center',
          {
            'bg-primary text-white hover:bg-priamry hover:text-white': isActive,
          },
        )}
      >
        <PiRowsFill />
        <span>EachOutline</span>
      </div>
    </>
  )
}
