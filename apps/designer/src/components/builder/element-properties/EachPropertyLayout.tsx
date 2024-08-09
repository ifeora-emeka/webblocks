import React from 'react'
import { TbBorderSides, TbPlus } from 'react-icons/tb'
import DefaultTooltip from '@/components/DefaultTooltip'
import { IoRemoveOutline } from 'react-icons/io5'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  children: React.ReactNode
  isEmpty?: boolean
  onAddValue: () => void
  onRemoveValue?: () => void
  onAddCorners?: () => void
  layout?: 'column' | 'row'
  isCorners?: boolean;
}

export default function EachPropertyLayout({
  children,
  label,
  isEmpty,
  onAddValue,
  onRemoveValue,
  onAddCorners,
  layout,
  isCorners
}: Props) {
  return (
    <>
      <div
        className={cn(
          'dark flex items-center justify-between min-h-10 max-h-10-',
          {
            'flex-col gap-default_spacing_lg': layout === 'column',
          },
        )}
      >
        {label && <div
          className={cn('min-w-[30%] max-w-[30%] flex', {
            'min-w-[100%] max-w-[100%]': layout === 'column',
          })}
        >
          <label className="text-xs text-muted-foreground">{label}</label>
        </div>}
        <div
          className={cn(
            'min-w-[65%] max-w-[65%] flex gap-default_spacing justify-end',
            {
              'min-w-[100%]': layout === 'column',
            },
          )}
        >
          {isEmpty ? (
            <>
              <div className={'w-full flex justify-end'}>
                <button
                  onClick={onAddValue}
                  className={
                    'flex px-3 py-1 rounded-md items-center gap-default_spacing text-xs text-muted-foreground hover:text-card-foreground hover:bg-accent'
                  }
                >
                  Add <TbPlus />
                </button>
              </div>
            </>
          ) : (
            children
          )}
          <div className={cn('flex gap-2', {
            "flex-col gap-default_spacing_lg justify-between h-full": layout === 'column',
            "flex-row": layout === 'row'
          })}>
            {onAddCorners && !isEmpty && (
              <button onClick={onAddCorners}>
                <TbBorderSides />
              </button>
            )}
            {onRemoveValue && !isEmpty && (
              <DefaultTooltip content={'Remove'}>
                <button
                  onClick={onRemoveValue}
                  className={'text-card-foreground hover:text-card-foreground'}
                >
                  <IoRemoveOutline />
                </button>
              </DefaultTooltip>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
