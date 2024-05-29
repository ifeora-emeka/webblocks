import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { PiRowsFill } from 'react-icons/pi'
import {
  TbCaretDownFilled,
  TbDots,
  TbTrash,
  TbEyeClosed,
  TbBracketsContain,
  TbLock,
  TbCaretRightFilled,
} from 'react-icons/tb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  isActive?: boolean
  element_children: any[]
  children?: any
}

//https://dribbble.com/shots/18864162-Updated-Nav-Icons
export default function EachOutline({ isActive, children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showChildren, setShowChildren] = useState(false)

  return (
    <>
      <div
        className={cn(
          'max-h-[31px] p-default_spacing text-xs rounded-lg hover:bg-accent hover:text-white/80 cursor-pointer flex gap-default_spacing items-center dark',
          {
            'bg-primary text-white hover:bg-priamry hover:text-white': isActive,
            group: !menuOpen,
            'bg-accent text-white/80': menuOpen && !isActive,
          },
        )}
      >
        {children && (
          <button
            onClick={() => setShowChildren(!showChildren)}
            className={cn('opacity-0', {
              'group-hover:opacity-100': !isActive,
              'opacity-100': isActive || menuOpen,
              'hidden group-hover:block': children,
            })}
          >
            {showChildren ? <TbCaretDownFilled /> : <TbCaretRightFilled />}
          </button>
        )}
        <div
          className={cn('', {
            'group-hover:hidden block': children,
          })}
        >
          <PiRowsFill />
        </div>
        <span className="truncate flex-grow">
          This is one very very long name
        </span>

        <DropdownMenu onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger className={'py-0'}>
            <span
              className={cn('opacity-0 hidden group-hover:block', {
                'group-hover:opacity-100': !isActive,
                'opacity-100 block': isActive || menuOpen,
              })}
            >
              <TbDots size={18} />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark bg-card">
            <DropdownMenuItem className="gap-default_spacing">
              <TbEyeClosed /> Hide
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-default_spacing">
              <TbBracketsContain /> Group
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-default_spacing">
              <TbLock /> Lock
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem className="gap-default_spacing">
              <TbTrash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showChildren && (
        <div className="border-l rounded-lg flex flex-col gap-default_spacing pl-[1rem]">
          {children}
        </div>
      )}
    </>
  )
}
